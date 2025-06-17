import { 
  landlords, residents, applications, documents, properties, marketplaceListings, transactions, maintenanceRequests,
  type Landlord, type InsertLandlord,
  type Resident, type InsertResident,
  type Application, type InsertApplication,
  type Document, type InsertDocument,
  type Property, type InsertProperty,
  type MarketplaceListing, type InsertMarketplaceListing,
  type Transaction, type InsertTransaction,
  type MaintenanceRequest, type InsertMaintenanceRequest
} from "@shared/schema";

export interface IStorage {
  // Landlords
  getLandlords(): Promise<Landlord[]>;
  getLandlord(id: number): Promise<Landlord | undefined>;
  getLandlordByEmail(email: string): Promise<Landlord | undefined>;
  createLandlord(landlord: InsertLandlord): Promise<Landlord>;
  updateLandlord(id: number, landlord: Partial<InsertLandlord>): Promise<Landlord | undefined>;

  // Properties
  getProperties(landlordId?: number): Promise<Property[]>;
  getProperty(id: number): Promise<Property | undefined>;
  getPropertyByInviteCode(inviteCode: string): Promise<Property | undefined>;
  createProperty(property: InsertProperty & { landlordId: number }): Promise<Property>;
  updateProperty(id: number, property: Partial<InsertProperty>): Promise<Property | undefined>;
  deleteProperty(id: number): Promise<boolean>;

  // Residents
  getResidents(propertyId?: number): Promise<Resident[]>;
  getResident(id: number): Promise<Resident | undefined>;
  getResidentByEmail(email: string): Promise<Resident | undefined>;
  createResident(resident: InsertResident): Promise<Resident>;
  updateResident(id: number, resident: Partial<InsertResident>): Promise<Resident | undefined>;
  deleteResident(id: number): Promise<boolean>;

  // Applications
  getApplications(propertyId?: number): Promise<Application[]>;
  getApplication(id: number): Promise<Application | undefined>;
  createApplication(application: InsertApplication): Promise<Application>;
  updateApplicationStatus(id: number, status: string): Promise<Application | undefined>;

  // Documents
  getDocuments(propertyId?: number): Promise<Document[]>;
  getDocument(id: number): Promise<Document | undefined>;
  createDocument(document: InsertDocument): Promise<Document>;
  deleteDocument(id: number): Promise<boolean>;

  // Marketplace
  getMarketplaceListings(propertyId: number): Promise<MarketplaceListing[]>;
  getMarketplaceListing(id: number): Promise<MarketplaceListing | undefined>;
  createMarketplaceListing(listing: InsertMarketplaceListing): Promise<MarketplaceListing>;
  updateMarketplaceListing(id: number, listing: Partial<InsertMarketplaceListing>): Promise<MarketplaceListing | undefined>;
  deleteMarketplaceListing(id: number): Promise<boolean>;

  // Transactions
  getTransactions(propertyId?: number, payerId?: number): Promise<Transaction[]>;
  getTransaction(id: number): Promise<Transaction | undefined>;
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
  updateTransaction(id: number, transaction: Partial<InsertTransaction>): Promise<Transaction | undefined>;

  // Maintenance Requests
  getMaintenanceRequests(propertyId?: number, residentId?: number): Promise<MaintenanceRequest[]>;
  getMaintenanceRequest(id: number): Promise<MaintenanceRequest | undefined>;
  createMaintenanceRequest(request: InsertMaintenanceRequest): Promise<MaintenanceRequest>;
  updateMaintenanceRequest(id: number, request: Partial<InsertMaintenanceRequest>): Promise<MaintenanceRequest | undefined>;
}

export class MemStorage implements IStorage {
  private landlords: Map<number, Landlord>;
  private residents: Map<number, Resident>;
  private applications: Map<number, Application>;
  private documents: Map<number, Document>;
  private properties: Map<number, Property>;
  private marketplaceListings: Map<number, MarketplaceListing>;
  private transactions: Map<number, Transaction>;
  private maintenanceRequests: Map<number, MaintenanceRequest>;
  
  private currentLandlordId: number;
  private currentResidentId: number;
  private currentApplicationId: number;
  private currentDocumentId: number;
  private currentPropertyId: number;
  private currentMarketplaceListingId: number;
  private currentTransactionId: number;
  private currentMaintenanceRequestId: number;

  constructor() {
    this.landlords = new Map();
    this.residents = new Map();
    this.applications = new Map();
    this.documents = new Map();
    this.properties = new Map();
    this.marketplaceListings = new Map();
    this.transactions = new Map();
    this.maintenanceRequests = new Map();
    
    this.currentLandlordId = 1;
    this.currentResidentId = 1;
    this.currentApplicationId = 1;
    this.currentDocumentId = 1;
    this.currentPropertyId = 1;
    this.currentMarketplaceListingId = 1;
    this.currentTransactionId = 1;
    this.currentMaintenanceRequestId = 1;
    
    this.initializeSampleData();
  }

  private generateInviteCode(): string {
    return Math.random().toString(36).substr(2, 8).toUpperCase();
  }

  private initializeSampleData() {
    // Sample landlord
    const sampleLandlord: Landlord = {
      id: 1,
      name: "Demo Landlord",
      email: "demo@rentcontrol.com",
      passwordHash: "demo_hash",
      plan: "premium",
      createdAt: new Date().toISOString(),
      stripeCustomerId: null
    };
    this.landlords.set(1, sampleLandlord);
    this.currentLandlordId = 2;

    // Sample properties
    const sampleProperties: Property[] = [
      { 
        id: 1, 
        landlordId: 1,
        name: "Building A", 
        address: "123 Main St", 
        units: 12, 
        type: "apartment",
        inviteCode: this.generateInviteCode(),
        createdAt: new Date().toISOString()
      },
      { 
        id: 2, 
        landlordId: 1,
        name: "Sunset Villa", 
        address: "456 Oak Ave", 
        units: 8, 
        type: "house",
        inviteCode: this.generateInviteCode(),
        createdAt: new Date().toISOString()
      },
      { 
        id: 3, 
        landlordId: 1,
        name: "Downtown Loft", 
        address: "789 Pine St", 
        units: 20, 
        type: "condo",
        inviteCode: this.generateInviteCode(),
        createdAt: new Date().toISOString()
      }
    ];

    sampleProperties.forEach(property => {
      this.properties.set(property.id, property);
    });
    this.currentPropertyId = 4;

    // Sample residents
    const sampleResidents: Resident[] = [
      {
        id: 1,
        propertyId: 1,
        name: "Jane Doe",
        email: "jane.doe@email.com",
        phone: "(555) 123-4567",
        unit: "2A",
        rent: 1200,
        status: "active",
        leaseExpiry: "2024-12-31",
        lastPayment: "2024-01-15",
        passwordHash: null,
        invitedAt: null,
        joinedAt: new Date().toISOString()
      },
      {
        id: 2,
        propertyId: 1,
        name: "John Smith",
        email: "john.smith@email.com",
        phone: "(555) 987-6543",
        unit: "1B",
        rent: 1100,
        status: "late",
        leaseExpiry: "2024-08-15",
        lastPayment: "2023-12-10",
        passwordHash: null,
        invitedAt: null,
        joinedAt: new Date().toISOString()
      },
      {
        id: 3,
        propertyId: 2,
        name: "Alice Johnson",
        email: "alice.johnson@email.com",
        phone: "(555) 456-7890",
        unit: "3C",
        rent: 1350,
        status: "active",
        leaseExpiry: "2025-03-20",
        lastPayment: "2024-01-10",
        passwordHash: null,
        invitedAt: null,
        joinedAt: new Date().toISOString()
      }
    ];

    sampleResidents.forEach(resident => {
      this.residents.set(resident.id, resident);
    });
    this.currentResidentId = 4;

    // Sample marketplace listings
    const sampleListings: MarketplaceListing[] = [
      {
        id: 1,
        propertyId: 1,
        residentId: 1,
        title: "Vintage Coffee Table",
        description: "Beautiful vintage coffee table in great condition",
        price: "75.00",
        category: "furniture",
        condition: "good",
        status: "active",
        imageUrls: [],
        createdAt: new Date().toISOString(),
        soldAt: null
      },
      {
        id: 2,
        propertyId: 1,
        residentId: 2,
        title: "Mountain Bike",
        description: "Barely used mountain bike, perfect for weekend rides",
        price: "350.00",
        category: "sports",
        condition: "like-new",
        status: "active",
        imageUrls: [],
        createdAt: new Date().toISOString(),
        soldAt: null
      }
    ];

    sampleListings.forEach(listing => {
      this.marketplaceListings.set(listing.id, listing);
    });
    this.currentMarketplaceListingId = 3;
  }

  // Landlord methods
  async getLandlords(): Promise<Landlord[]> {
    return Array.from(this.landlords.values());
  }

  async getLandlord(id: number): Promise<Landlord | undefined> {
    return this.landlords.get(id);
  }

  async getLandlordByEmail(email: string): Promise<Landlord | undefined> {
    return Array.from(this.landlords.values()).find(landlord => landlord.email === email);
  }

  async createLandlord(insertLandlord: InsertLandlord): Promise<Landlord> {
    const id = this.currentLandlordId++;
    const landlord: Landlord = { 
      ...insertLandlord, 
      id,
      createdAt: new Date().toISOString()
    };
    this.landlords.set(id, landlord);
    return landlord;
  }

  async updateLandlord(id: number, updates: Partial<InsertLandlord>): Promise<Landlord | undefined> {
    const landlord = this.landlords.get(id);
    if (!landlord) return undefined;
    
    const updatedLandlord = { ...landlord, ...updates };
    this.landlords.set(id, updatedLandlord);
    return updatedLandlord;
  }

  // Property methods
  async getProperties(landlordId?: number): Promise<Property[]> {
    const allProperties = Array.from(this.properties.values());
    return landlordId ? allProperties.filter(p => p.landlordId === landlordId) : allProperties;
  }

  async getProperty(id: number): Promise<Property | undefined> {
    return this.properties.get(id);
  }

  async getPropertyByInviteCode(inviteCode: string): Promise<Property | undefined> {
    return Array.from(this.properties.values()).find(property => property.inviteCode === inviteCode);
  }

  async createProperty(insertProperty: InsertProperty & { landlordId: number }): Promise<Property> {
    const id = this.currentPropertyId++;
    const property: Property = { 
      ...insertProperty, 
      id,
      inviteCode: this.generateInviteCode(),
      createdAt: new Date().toISOString()
    };
    this.properties.set(id, property);
    return property;
  }

  async updateProperty(id: number, updates: Partial<InsertProperty>): Promise<Property | undefined> {
    const property = this.properties.get(id);
    if (!property) return undefined;
    
    const updatedProperty = { ...property, ...updates };
    this.properties.set(id, updatedProperty);
    return updatedProperty;
  }

  async deleteProperty(id: number): Promise<boolean> {
    return this.properties.delete(id);
  }

  // Resident methods
  async getResidents(propertyId?: number): Promise<Resident[]> {
    const allResidents = Array.from(this.residents.values());
    return propertyId ? allResidents.filter(r => r.propertyId === propertyId) : allResidents;
  }

  async getResident(id: number): Promise<Resident | undefined> {
    return this.residents.get(id);
  }

  async getResidentByEmail(email: string): Promise<Resident | undefined> {
    return Array.from(this.residents.values()).find(resident => resident.email === email);
  }

  async createResident(insertResident: InsertResident): Promise<Resident> {
    const id = this.currentResidentId++;
    const resident: Resident = { 
      ...insertResident,
      id,
      invitedAt: insertResident.invitedAt || null,
      joinedAt: insertResident.joinedAt || new Date().toISOString()
    };
    this.residents.set(id, resident);
    return resident;
  }

  async updateResident(id: number, updates: Partial<InsertResident>): Promise<Resident | undefined> {
    const resident = this.residents.get(id);
    if (!resident) return undefined;
    
    const updatedResident = { ...resident, ...updates };
    this.residents.set(id, updatedResident);
    return updatedResident;
  }

  async deleteResident(id: number): Promise<boolean> {
    return this.residents.delete(id);
  }

  // Application methods
  async getApplications(propertyId?: number): Promise<Application[]> {
    const allApplications = Array.from(this.applications.values());
    return propertyId ? allApplications.filter(a => a.propertyId === propertyId) : allApplications;
  }

  async getApplication(id: number): Promise<Application | undefined> {
    return this.applications.get(id);
  }

  async createApplication(insertApplication: InsertApplication): Promise<Application> {
    const id = this.currentApplicationId++;
    const application: Application = {
      ...insertApplication,
      id,
      status: "pending",
      submittedAt: new Date().toISOString()
    };
    this.applications.set(id, application);
    return application;
  }

  async updateApplicationStatus(id: number, status: string): Promise<Application | undefined> {
    const application = this.applications.get(id);
    if (!application) return undefined;
    
    const updatedApplication = { ...application, status };
    this.applications.set(id, updatedApplication);
    return updatedApplication;
  }

  // Document methods
  async getDocuments(propertyId?: number): Promise<Document[]> {
    const allDocuments = Array.from(this.documents.values());
    return propertyId ? allDocuments.filter(d => d.propertyId === propertyId) : allDocuments;
  }

  async getDocument(id: number): Promise<Document | undefined> {
    return this.documents.get(id);
  }

  async createDocument(insertDocument: InsertDocument): Promise<Document> {
    const id = this.currentDocumentId++;
    const document: Document = {
      ...insertDocument,
      id,
      uploadedAt: new Date().toISOString()
    };
    this.documents.set(id, document);
    return document;
  }

  async deleteDocument(id: number): Promise<boolean> {
    return this.documents.delete(id);
  }

  // Marketplace methods
  async getMarketplaceListings(propertyId: number): Promise<MarketplaceListing[]> {
    return Array.from(this.marketplaceListings.values()).filter(listing => listing.propertyId === propertyId);
  }

  async getMarketplaceListing(id: number): Promise<MarketplaceListing | undefined> {
    return this.marketplaceListings.get(id);
  }

  async createMarketplaceListing(insertListing: InsertMarketplaceListing): Promise<MarketplaceListing> {
    const id = this.currentMarketplaceListingId++;
    const listing: MarketplaceListing = {
      ...insertListing,
      id,
      createdAt: new Date().toISOString(),
      soldAt: null
    };
    this.marketplaceListings.set(id, listing);
    return listing;
  }

  async updateMarketplaceListing(id: number, updates: Partial<InsertMarketplaceListing>): Promise<MarketplaceListing | undefined> {
    const listing = this.marketplaceListings.get(id);
    if (!listing) return undefined;
    
    const updatedListing = { ...listing, ...updates };
    if (updates.status === 'sold') {
      updatedListing.soldAt = new Date().toISOString();
    }
    this.marketplaceListings.set(id, updatedListing);
    return updatedListing;
  }

  async deleteMarketplaceListing(id: number): Promise<boolean> {
    return this.marketplaceListings.delete(id);
  }

  // Transaction methods
  async getTransactions(propertyId?: number, payerId?: number): Promise<Transaction[]> {
    let transactions = Array.from(this.transactions.values());
    if (propertyId) transactions = transactions.filter(t => t.propertyId === propertyId);
    if (payerId) transactions = transactions.filter(t => t.payerId === payerId);
    return transactions;
  }

  async getTransaction(id: number): Promise<Transaction | undefined> {
    return this.transactions.get(id);
  }

  async createTransaction(insertTransaction: InsertTransaction): Promise<Transaction> {
    const id = this.currentTransactionId++;
    const transaction: Transaction = {
      ...insertTransaction,
      id,
      createdAt: new Date().toISOString(),
      completedAt: null
    };
    this.transactions.set(id, transaction);
    return transaction;
  }

  async updateTransaction(id: number, updates: Partial<InsertTransaction>): Promise<Transaction | undefined> {
    const transaction = this.transactions.get(id);
    if (!transaction) return undefined;
    
    const updatedTransaction = { ...transaction, ...updates };
    if (updates.status === 'completed') {
      updatedTransaction.completedAt = new Date().toISOString();
    }
    this.transactions.set(id, updatedTransaction);
    return updatedTransaction;
  }

  // Maintenance Request methods
  async getMaintenanceRequests(propertyId?: number, residentId?: number): Promise<MaintenanceRequest[]> {
    let requests = Array.from(this.maintenanceRequests.values());
    if (propertyId) requests = requests.filter(r => r.propertyId === propertyId);
    if (residentId) requests = requests.filter(r => r.residentId === residentId);
    return requests;
  }

  async getMaintenanceRequest(id: number): Promise<MaintenanceRequest | undefined> {
    return this.maintenanceRequests.get(id);
  }

  async createMaintenanceRequest(insertRequest: InsertMaintenanceRequest): Promise<MaintenanceRequest> {
    const id = this.currentMaintenanceRequestId++;
    const now = new Date().toISOString();
    const request: MaintenanceRequest = {
      ...insertRequest,
      id,
      createdAt: now,
      updatedAt: now
    };
    this.maintenanceRequests.set(id, request);
    return request;
  }

  async updateMaintenanceRequest(id: number, updates: Partial<InsertMaintenanceRequest>): Promise<MaintenanceRequest | undefined> {
    const request = this.maintenanceRequests.get(id);
    if (!request) return undefined;
    
    const updatedRequest = { 
      ...request, 
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.maintenanceRequests.set(id, updatedRequest);
    return updatedRequest;
  }
}

export const storage = new MemStorage();