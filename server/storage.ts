import { 
  residents, applications, documents, properties,
  type Resident, type InsertResident,
  type Application, type InsertApplication,
  type Document, type InsertDocument,
  type Property, type InsertProperty
} from "@shared/schema";

export interface IStorage {
  // Residents
  getResidents(): Promise<Resident[]>;
  getResident(id: number): Promise<Resident | undefined>;
  createResident(resident: InsertResident): Promise<Resident>;
  updateResident(id: number, resident: Partial<InsertResident>): Promise<Resident | undefined>;
  deleteResident(id: number): Promise<boolean>;

  // Applications
  getApplications(): Promise<Application[]>;
  getApplication(id: number): Promise<Application | undefined>;
  createApplication(application: InsertApplication): Promise<Application>;
  updateApplicationStatus(id: number, status: string): Promise<Application | undefined>;

  // Documents
  getDocuments(): Promise<Document[]>;
  getDocument(id: number): Promise<Document | undefined>;
  createDocument(document: InsertDocument): Promise<Document>;
  deleteDocument(id: number): Promise<boolean>;

  // Properties
  getProperties(): Promise<Property[]>;
  getProperty(id: number): Promise<Property | undefined>;
  createProperty(property: InsertProperty): Promise<Property>;
  updateProperty(id: number, property: Partial<InsertProperty>): Promise<Property | undefined>;
  deleteProperty(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private residents: Map<number, Resident>;
  private applications: Map<number, Application>;
  private documents: Map<number, Document>;
  private properties: Map<number, Property>;
  private currentResidentId: number;
  private currentApplicationId: number;
  private currentDocumentId: number;
  private currentPropertyId: number;

  constructor() {
    this.residents = new Map();
    this.applications = new Map();
    this.documents = new Map();
    this.properties = new Map();
    this.currentResidentId = 1;
    this.currentApplicationId = 1;
    this.currentDocumentId = 1;
    this.currentPropertyId = 1;

    // Initialize with some sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample properties
    const sampleProperties: InsertProperty[] = [
      { name: "Building A", address: "123 Main St", units: 12, type: "apartment" },
      { name: "Building B", address: "456 Oak Ave", units: 8, type: "apartment" },
      { name: "Single Homes", address: "Various Locations", units: 5, type: "house" },
    ];

    sampleProperties.forEach(property => {
      this.createProperty(property);
    });

    // Sample residents
    const sampleResidents: InsertResident[] = [
      {
        name: "Jane Doe",
        email: "jane.doe@email.com",
        phone: "(555) 123-4567",
        unit: "2A",
        rent: 2400,
        status: "active",
        leaseExpiry: "Dec 2024",
        lastPayment: "Nov 1, 2024"
      },
      {
        name: "Mike Smith",
        email: "mike.smith@email.com",
        phone: "(555) 234-5678",
        unit: "1B",
        rent: 1950,
        status: "late",
        leaseExpiry: "Mar 2025",
        lastPayment: "Oct 15, 2024"
      },
      {
        name: "Alice Miller",
        email: "alice.miller@email.com",
        phone: "(555) 345-6789",
        unit: "3C",
        rent: 2800,
        status: "active",
        leaseExpiry: "Jun 2025",
        lastPayment: "Nov 1, 2024"
      }
    ];

    sampleResidents.forEach(resident => {
      this.createResident(resident);
    });
  }

  // Residents
  async getResidents(): Promise<Resident[]> {
    return Array.from(this.residents.values());
  }

  async getResident(id: number): Promise<Resident | undefined> {
    return this.residents.get(id);
  }

  async createResident(insertResident: InsertResident): Promise<Resident> {
    const id = this.currentResidentId++;
    const resident: Resident = { 
      ...insertResident, 
      id,
      status: insertResident.status || "active",
      lastPayment: insertResident.lastPayment || null
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

  // Applications
  async getApplications(): Promise<Application[]> {
    return Array.from(this.applications.values());
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

  // Documents
  async getDocuments(): Promise<Document[]> {
    return Array.from(this.documents.values());
  }

  async getDocument(id: number): Promise<Document | undefined> {
    return this.documents.get(id);
  }

  async createDocument(insertDocument: InsertDocument): Promise<Document> {
    const id = this.currentDocumentId++;
    const document: Document = {
      fileName: insertDocument.fileName,
      fileType: insertDocument.fileType,
      fileSize: insertDocument.fileSize,
      filePath: insertDocument.filePath,
      uploadedBy: insertDocument.uploadedBy,
      category: insertDocument.category,
      relatedId: insertDocument.relatedId ?? null,
      id,
      uploadedAt: new Date().toISOString()
    };
    this.documents.set(id, document);
    return document;
  }

  async deleteDocument(id: number): Promise<boolean> {
    return this.documents.delete(id);
  }

  // Properties
  async getProperties(): Promise<Property[]> {
    return Array.from(this.properties.values());
  }

  async getProperty(id: number): Promise<Property | undefined> {
    return this.properties.get(id);
  }

  async createProperty(insertProperty: InsertProperty): Promise<Property> {
    const id = this.currentPropertyId++;
    const property: Property = { ...insertProperty, id };
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
}

export const storage = new MemStorage();
