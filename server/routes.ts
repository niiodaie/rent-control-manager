import type { Express } from "express";
import express from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertLandlordSchema, 
  insertResidentSchema, 
  insertApplicationSchema, 
  insertDocumentSchema, 
  insertPropertySchema,
  insertMarketplaceListingSchema,
  insertTransactionSchema,
  insertMaintenanceRequestSchema
} from "@shared/schema";
import multer from "multer";
import path from "path";
import fs from "fs";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Setup multer for file uploads
const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage_multer = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage_multer,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only PDF, JPG, and PNG files are allowed'));
    }
  }
});

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-key';

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Authentication routes
  app.post("/api/auth/signup", async (req, res) => {
    try {
      const { name, email, password, role, plan } = req.body;
      
      if (role === 'landlord') {
        const existingLandlord = await storage.getLandlordByEmail(email);
        if (existingLandlord) {
          return res.status(400).json({ message: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const landlord = await storage.createLandlord({
          name,
          email,
          passwordHash: hashedPassword,
          plan: plan || 'free'
        });
        
        const token = jwt.sign({ id: landlord.id, role: 'landlord' }, JWT_SECRET, { expiresIn: '7d' });
        res.json({ 
          token, 
          role: 'landlord', 
          user: { id: landlord.id, name: landlord.name, email: landlord.email } 
        });
      } else if (role === 'resident') {
        const existingResident = await storage.getResidentByEmail(email);
        if (existingResident) {
          return res.status(400).json({ message: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const resident = await storage.createResident({
          name,
          email,
          passwordHash: hashedPassword,
          propertyId: 1, // Default property for demo
          phone: '',
          unit: 'TBD',
          rent: 0,
          leaseExpiry: new Date().toISOString()
        });
        
        const token = jwt.sign({ id: resident.id, role: 'resident' }, JWT_SECRET, { expiresIn: '7d' });
        res.json({ 
          token, 
          role: 'resident', 
          user: { id: resident.id, name: resident.name, email: resident.email } 
        });
      } else {
        res.status(400).json({ message: "Invalid role" });
      }
    } catch (error) {
      console.error('Signup error:', error);
      res.status(400).json({ message: "Signup failed" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password, role } = req.body;
      
      if (role === 'landlord') {
        const landlord = await storage.getLandlordByEmail(email);
        if (!landlord || !await bcrypt.compare(password, landlord.passwordHash)) {
          return res.status(401).json({ message: "Invalid credentials" });
        }
        
        const token = jwt.sign({ id: landlord.id, role: 'landlord' }, JWT_SECRET, { expiresIn: '7d' });
        res.json({ 
          token, 
          role: 'landlord', 
          user: { id: landlord.id, name: landlord.name, email: landlord.email } 
        });
      } else if (role === 'resident') {
        const resident = await storage.getResidentByEmail(email);
        if (!resident || !await bcrypt.compare(password, resident.passwordHash || '')) {
          return res.status(401).json({ message: "Invalid credentials" });
        }
        
        const token = jwt.sign({ id: resident.id, role: 'resident' }, JWT_SECRET, { expiresIn: '7d' });
        res.json({ 
          token, 
          role: 'resident', 
          user: { id: resident.id, name: resident.name, email: resident.email } 
        });
      } else {
        res.status(400).json({ message: "Invalid role" });
      }
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: "Login failed" });
    }
  });

  // Properties routes
  app.get("/api/properties", async (req, res) => {
    try {
      const landlordId = req.query.landlordId ? parseInt(req.query.landlordId as string) : undefined;
      const properties = await storage.getProperties(landlordId);
      res.json(properties);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch properties" });
    }
  });

  app.post("/api/properties", async (req, res) => {
    try {
      const propertyData = insertPropertySchema.parse(req.body);
      const landlordId = req.body.landlordId || 1; // Default to demo landlord for now
      
      const property = await storage.createProperty({
        ...propertyData,
        landlordId
      });
      res.json(property);
    } catch (error) {
      res.status(400).json({ message: "Invalid property data" });
    }
  });

  app.get("/api/properties/invite/:code", async (req, res) => {
    try {
      const property = await storage.getPropertyByInviteCode(req.params.code);
      if (!property) {
        return res.status(404).json({ message: "Invalid invite code" });
      }
      res.json(property);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch property" });
    }
  });

  // Residents routes
  app.get("/api/residents", async (req, res) => {
    try {
      const propertyId = req.query.propertyId ? parseInt(req.query.propertyId as string) : undefined;
      const residents = await storage.getResidents(propertyId);
      res.json(residents);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch residents" });
    }
  });

  app.post("/api/residents", async (req, res) => {
    try {
      const residentData = insertResidentSchema.parse(req.body);
      const resident = await storage.createResident(residentData);
      res.json(resident);
    } catch (error) {
      res.status(400).json({ message: "Invalid resident data" });
    }
  });

  app.post("/api/residents/invite", async (req, res) => {
    try {
      const { email, propertyId, unit, rent } = req.body;
      const resident = await storage.createResident({
        propertyId,
        email,
        unit,
        rent,
        name: "Pending",
        phone: "Pending",
        leaseExpiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        invitedAt: new Date().toISOString()
      });
      res.json(resident);
    } catch (error) {
      res.status(400).json({ message: "Failed to send invite" });
    }
  });

  app.post("/api/residents/signup", async (req, res) => {
    try {
      const { inviteCode, ...residentData } = req.body;
      const property = await storage.getPropertyByInviteCode(inviteCode);
      
      if (!property) {
        return res.status(404).json({ message: "Invalid invite code" });
      }

      const resident = await storage.createResident({
        ...residentData,
        propertyId: property.id,
        joinedAt: new Date().toISOString()
      });
      
      res.json(resident);
    } catch (error) {
      res.status(400).json({ message: "Failed to create resident account" });
    }
  });

  app.put("/api/residents/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const resident = await storage.updateResident(id, updates);
      
      if (!resident) {
        return res.status(404).json({ message: "Resident not found" });
      }
      
      res.json(resident);
    } catch (error) {
      res.status(400).json({ message: "Failed to update resident" });
    }
  });

  app.delete("/api/residents/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteResident(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Resident not found" });
      }
      
      res.json({ message: "Resident deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete resident" });
    }
  });

  // Applications routes
  app.get("/api/applications", async (req, res) => {
    try {
      const propertyId = req.query.propertyId ? parseInt(req.query.propertyId as string) : undefined;
      const applications = await storage.getApplications(propertyId);
      res.json(applications);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch applications" });
    }
  });

  app.post("/api/applications", async (req, res) => {
    try {
      const applicationData = insertApplicationSchema.parse(req.body);
      const application = await storage.createApplication(applicationData);
      res.json(application);
    } catch (error) {
      res.status(400).json({ message: "Invalid application data" });
    }
  });

  app.patch("/api/applications/:id/status", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      
      const application = await storage.updateApplicationStatus(id, status);
      if (!application) {
        return res.status(404).json({ message: "Application not found" });
      }
      
      res.json(application);
    } catch (error) {
      res.status(400).json({ message: "Failed to update application status" });
    }
  });

  // Documents routes
  app.get("/api/documents", async (req, res) => {
    try {
      const propertyId = req.query.propertyId ? parseInt(req.query.propertyId as string) : undefined;
      const documents = await storage.getDocuments(propertyId);
      res.json(documents);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch documents" });
    }
  });

  app.post("/api/documents", upload.single('file'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const documentData = {
        propertyId: parseInt(req.body.propertyId) || 1, // Default to first property
        fileName: req.file.originalname,
        fileType: req.file.mimetype,
        fileSize: req.file.size,
        filePath: req.file.path,
        uploadedBy: req.body.uploadedBy,
        category: req.body.category,
        relatedId: req.body.relatedId ? parseInt(req.body.relatedId) : null
      };

      const document = await storage.createDocument(documentData);
      res.json(document);
    } catch (error) {
      res.status(400).json({ message: "Failed to upload document" });
    }
  });

  app.delete("/api/documents/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const document = await storage.getDocument(id);
      
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }

      // Delete file from filesystem
      if (fs.existsSync(document.filePath)) {
        fs.unlinkSync(document.filePath);
      }

      const deleted = await storage.deleteDocument(id);
      res.json({ message: "Document deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete document" });
    }
  });

  // Marketplace routes
  app.get("/api/marketplace/:propertyId", async (req, res) => {
    try {
      const propertyId = parseInt(req.params.propertyId);
      const listings = await storage.getMarketplaceListings(propertyId);
      res.json(listings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch marketplace listings" });
    }
  });

  app.post("/api/marketplace", async (req, res) => {
    try {
      const listingData = insertMarketplaceListingSchema.parse(req.body);
      const listing = await storage.createMarketplaceListing(listingData);
      res.json(listing);
    } catch (error) {
      res.status(400).json({ message: "Invalid listing data" });
    }
  });

  app.put("/api/marketplace/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const listing = await storage.updateMarketplaceListing(id, updates);
      
      if (!listing) {
        return res.status(404).json({ message: "Listing not found" });
      }
      
      res.json(listing);
    } catch (error) {
      res.status(400).json({ message: "Failed to update listing" });
    }
  });

  app.delete("/api/marketplace/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteMarketplaceListing(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Listing not found" });
      }
      
      res.json({ message: "Listing deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete listing" });
    }
  });

  // Transaction routes
  app.get("/api/transactions", async (req, res) => {
    try {
      const propertyId = req.query.propertyId ? parseInt(req.query.propertyId as string) : undefined;
      const payerId = req.query.payerId ? parseInt(req.query.payerId as string) : undefined;
      const transactions = await storage.getTransactions(propertyId, payerId);
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch transactions" });
    }
  });

  app.post("/api/transactions", async (req, res) => {
    try {
      const transactionData = insertTransactionSchema.parse(req.body);
      // Calculate 2% platform fee
      const amount = parseFloat(transactionData.amount);
      const fee = amount * 0.02;
      
      const transaction = await storage.createTransaction({
        ...transactionData,
        fee: fee.toFixed(2)
      });
      
      res.json(transaction);
    } catch (error) {
      res.status(400).json({ message: "Invalid transaction data" });
    }
  });

  app.post("/api/rent/pay", async (req, res) => {
    try {
      const { residentId, propertyId, amount } = req.body;
      const fee = parseFloat(amount) * 0.02;
      
      const transaction = await storage.createTransaction({
        propertyId,
        payerId: residentId,
        recipientId: null, // Landlord payment
        type: "rent",
        amount: amount.toString(),
        fee: fee.toFixed(2),
        description: `Rent payment from resident ${residentId}`,
        status: "completed"
      });
      
      // Update resident's last payment date
      await storage.updateResident(residentId, {
        lastPayment: new Date().toISOString().split('T')[0],
        status: "active"
      });
      
      res.json(transaction);
    } catch (error) {
      res.status(400).json({ message: "Payment failed" });
    }
  });

  // Maintenance request routes
  app.get("/api/maintenance", async (req, res) => {
    try {
      const propertyId = req.query.propertyId ? parseInt(req.query.propertyId as string) : undefined;
      const residentId = req.query.residentId ? parseInt(req.query.residentId as string) : undefined;
      const requests = await storage.getMaintenanceRequests(propertyId, residentId);
      res.json(requests);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch maintenance requests" });
    }
  });

  app.post("/api/maintenance", async (req, res) => {
    try {
      const requestData = insertMaintenanceRequestSchema.parse(req.body);
      const request = await storage.createMaintenanceRequest(requestData);
      res.json(request);
    } catch (error) {
      res.status(400).json({ message: "Invalid maintenance request data" });
    }
  });

  app.put("/api/maintenance/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const request = await storage.updateMaintenanceRequest(id, updates);
      
      if (!request) {
        return res.status(404).json({ message: "Maintenance request not found" });
      }
      
      res.json(request);
    } catch (error) {
      res.status(400).json({ message: "Failed to update maintenance request" });
    }
  });

  // Branding routes
  app.put("/api/landlords/:id/branding", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const brandingData = req.body;
      
      const landlord = await storage.updateLandlord(id, brandingData);
      
      if (!landlord) {
        return res.status(404).json({ message: "Landlord not found" });
      }
      
      res.json(landlord);
    } catch (error) {
      res.status(400).json({ message: "Failed to update branding settings" });
    }
  });

  app.post("/api/landlords/upload-logo", upload.single('logo'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const landlordId = parseInt(req.body.landlordId);
      const logoUrl = `/uploads/${req.file.filename}`;
      
      const landlord = await storage.updateLandlord(landlordId, { brandLogo: logoUrl });
      
      if (!landlord) {
        return res.status(404).json({ message: "Landlord not found" });
      }
      
      res.json({ logoUrl });
    } catch (error) {
      res.status(500).json({ message: "Failed to upload logo" });
    }
  });

  // Stats endpoint for dashboard
  app.get("/api/stats", async (req, res) => {
    try {
      const propertyId = req.query.propertyId ? parseInt(req.query.propertyId as string) : undefined;
      
      const residents = await storage.getResidents(propertyId);
      const applications = await storage.getApplications(propertyId);
      const transactions = await storage.getTransactions(propertyId);
      
      const totalResidents = residents.length;
      const activeLeases = residents.filter(r => r.status === "active").length;
      const latePayments = residents.filter(r => r.status === "late").length;
      const pendingApplications = applications.filter(a => a.status === "pending").length;
      
      const currentMonth = new Date().getMonth();
      const monthlyRevenue = transactions
        .filter(t => t.type === "rent" && t.status === "completed")
        .filter(t => new Date(t.createdAt).getMonth() === currentMonth)
        .reduce((sum, t) => sum + parseFloat(t.amount), 0);

      res.json({
        totalResidents,
        activeLeases,
        latePayments,
        monthlyRevenue,
        pendingApplications
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch stats" });
    }
  });

  // Serve uploaded files
  app.use('/uploads', express.static(uploadsDir));

  const httpServer = createServer(app);
  return httpServer;
}