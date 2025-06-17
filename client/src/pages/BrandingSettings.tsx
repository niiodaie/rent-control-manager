import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Palette, Upload, Eye, Save, Smartphone, Monitor, RefreshCw } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import FileUpload from "@/components/FileUpload";
import type { Landlord } from "@shared/schema";

interface BrandingData {
  brandName?: string;
  brandLogo?: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  customDomain?: string;
  welcomeMessage?: string;
}

export default function BrandingSettings() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const { toast } = useToast();

  const landlordId = parseInt(localStorage.getItem('user-id') || '1');

  const { data: landlord, isLoading } = useQuery({
    queryKey: ['/api/landlords', landlordId],
    queryFn: () => apiRequest(`/api/landlords/${landlordId}`)
  });

  const [brandingData, setBrandingData] = useState<BrandingData>({
    brandName: '',
    brandLogo: '',
    primaryColor: '#2563eb',
    secondaryColor: '#64748b',
    accentColor: '#10b981',
    customDomain: '',
    welcomeMessage: ''
  });

  // Update branding data when landlord data loads
  useState(() => {
    if (landlord) {
      setBrandingData({
        brandName: landlord.brandName || '',
        brandLogo: landlord.brandLogo || '',
        primaryColor: landlord.primaryColor || '#2563eb',
        secondaryColor: landlord.secondaryColor || '#64748b',
        accentColor: landlord.accentColor || '#10b981',
        customDomain: landlord.customDomain || '',
        welcomeMessage: landlord.welcomeMessage || ''
      });
    }
  });

  const updateBrandingMutation = useMutation({
    mutationFn: async (data: BrandingData) => {
      return apiRequest(`/api/landlords/${landlordId}/branding`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/landlords'] });
      toast({ title: "Success", description: "Branding settings updated successfully!" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update branding settings", variant: "destructive" });
    }
  });

  const uploadLogoMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('logo', file);
      formData.append('landlordId', landlordId.toString());
      
      return apiRequest('/api/landlords/upload-logo', {
        method: 'POST',
        body: formData
      });
    },
    onSuccess: (data) => {
      setBrandingData(prev => ({ ...prev, brandLogo: data.logoUrl }));
      setSelectedFile(null);
      toast({ title: "Success", description: "Logo uploaded successfully!" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to upload logo", variant: "destructive" });
    }
  });

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
    if (file) {
      uploadLogoMutation.mutate(file);
    }
  };

  const handleInputChange = (field: keyof BrandingData, value: string) => {
    setBrandingData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    updateBrandingMutation.mutate(brandingData);
  };

  const applyPreviewStyles = () => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      root.style.setProperty('--preview-primary', brandingData.primaryColor);
      root.style.setProperty('--preview-secondary', brandingData.secondaryColor);
      root.style.setProperty('--preview-accent', brandingData.accentColor);
    }
  };

  const resetPreviewStyles = () => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      root.style.removeProperty('--preview-primary');
      root.style.removeProperty('--preview-secondary');
      root.style.removeProperty('--preview-accent');
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Branding Settings</h1>
          <p className="text-muted-foreground">Customize your property management dashboard appearance</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={applyPreviewStyles}>
            <Eye className="h-4 w-4 mr-2" />
            Preview Changes
          </Button>
          <Button variant="outline" onClick={resetPreviewStyles}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset Preview
          </Button>
          <Button onClick={handleSave} disabled={updateBrandingMutation.isPending}>
            <Save className="h-4 w-4 mr-2" />
            {updateBrandingMutation.isPending ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="branding" className="space-y-6">
        <TabsList>
          <TabsTrigger value="branding">Brand Identity</TabsTrigger>
          <TabsTrigger value="colors">Colors & Theme</TabsTrigger>
          <TabsTrigger value="domain">Custom Domain</TabsTrigger>
          <TabsTrigger value="preview">Live Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="branding">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Brand Information</CardTitle>
                <CardDescription>Configure your brand name and welcome message</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="brandName">Brand Name</Label>
                  <Input
                    id="brandName"
                    placeholder="Your Property Management Company"
                    value={brandingData.brandName}
                    onChange={(e) => handleInputChange('brandName', e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">
                    This will replace "Rent Control" throughout the dashboard
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="welcomeMessage">Welcome Message</Label>
                  <Textarea
                    id="welcomeMessage"
                    placeholder="Welcome to your property portal..."
                    value={brandingData.welcomeMessage}
                    onChange={(e) => handleInputChange('welcomeMessage', e.target.value)}
                    rows={3}
                  />
                  <p className="text-sm text-muted-foreground">
                    Displayed on the resident dashboard homepage
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Logo Upload</CardTitle>
                <CardDescription>Upload your company logo for dashboard branding</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FileUpload
                  onFileSelect={handleFileSelect}
                  selectedFile={selectedFile}
                  accept="image/*"
                  maxSize={2 * 1024 * 1024} // 2MB
                  className="h-32 border-dashed border-2 rounded-lg flex items-center justify-center"
                />
                
                {brandingData.brandLogo && (
                  <div className="mt-4">
                    <Label>Current Logo</Label>
                    <div className="mt-2 p-4 border rounded-lg bg-gray-50">
                      <img 
                        src={brandingData.brandLogo} 
                        alt="Brand logo" 
                        className="h-12 object-contain"
                      />
                    </div>
                  </div>
                )}

                <p className="text-sm text-muted-foreground">
                  Recommended: PNG or SVG format, max 2MB. Optimal size: 200x60px
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="colors">
          <Card>
            <CardHeader>
              <CardTitle>Color Scheme</CardTitle>
              <CardDescription>Customize the color palette for your branded dashboard</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="primaryColor"
                      type="color"
                      value={brandingData.primaryColor}
                      onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                      className="w-16 h-10 p-1 border"
                    />
                    <Input
                      value={brandingData.primaryColor}
                      onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                      placeholder="#2563eb"
                      className="flex-1"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Used for buttons, links, and accents
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="secondaryColor">Secondary Color</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="secondaryColor"
                      type="color"
                      value={brandingData.secondaryColor}
                      onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
                      className="w-16 h-10 p-1 border"
                    />
                    <Input
                      value={brandingData.secondaryColor}
                      onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
                      placeholder="#64748b"
                      className="flex-1"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Used for text and subtle elements
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accentColor">Accent Color</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="accentColor"
                      type="color"
                      value={brandingData.accentColor}
                      onChange={(e) => handleInputChange('accentColor', e.target.value)}
                      className="w-16 h-10 p-1 border"
                    />
                    <Input
                      value={brandingData.accentColor}
                      onChange={(e) => handleInputChange('accentColor', e.target.value)}
                      placeholder="#10b981"
                      className="flex-1"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Used for success states and highlights
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 border rounded-lg bg-gray-50">
                <h4 className="font-medium mb-3">Color Preview</h4>
                <div className="flex space-x-4">
                  <div 
                    className="w-16 h-16 rounded border"
                    style={{ backgroundColor: brandingData.primaryColor }}
                  ></div>
                  <div 
                    className="w-16 h-16 rounded border"
                    style={{ backgroundColor: brandingData.secondaryColor }}
                  ></div>
                  <div 
                    className="w-16 h-16 rounded border"
                    style={{ backgroundColor: brandingData.accentColor }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="domain">
          <Card>
            <CardHeader>
              <CardTitle>Custom Domain</CardTitle>
              <CardDescription>Configure a custom domain for your branded dashboard</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="customDomain">Custom Domain</Label>
                <Input
                  id="customDomain"
                  placeholder="properties.yourcompany.com"
                  value={brandingData.customDomain}
                  onChange={(e) => handleInputChange('customDomain', e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  Enter your custom domain without protocol (https://)
                </p>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Domain Setup Instructions</h4>
                <ol className="text-sm text-blue-800 space-y-1">
                  <li>1. Configure your DNS to point to our servers</li>
                  <li>2. Add a CNAME record: properties.yourcompany.com → app.rentcontrol.com</li>
                  <li>3. SSL certificates will be automatically provisioned</li>
                  <li>4. Allow 24-48 hours for DNS propagation</li>
                </ol>
              </div>

              <Badge variant="outline" className="mt-4">
                <Monitor className="h-3 w-3 mr-1" />
                Custom domains available on Pro and Enterprise plans
              </Badge>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview">
          <Card>
            <CardHeader>
              <CardTitle>Live Preview</CardTitle>
              <CardDescription>See how your branding will look to landlords and residents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-6">
                <Button
                  variant={previewMode === 'desktop' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPreviewMode('desktop')}
                >
                  <Monitor className="h-4 w-4 mr-2" />
                  Desktop
                </Button>
                <Button
                  variant={previewMode === 'mobile' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPreviewMode('mobile')}
                >
                  <Smartphone className="h-4 w-4 mr-2" />
                  Mobile
                </Button>
              </div>

              <div className={`border rounded-lg overflow-hidden ${previewMode === 'mobile' ? 'max-w-sm mx-auto' : ''}`}>
                <div 
                  className="p-4 text-white"
                  style={{ backgroundColor: brandingData.primaryColor }}
                >
                  <div className="flex items-center space-x-3">
                    {brandingData.brandLogo && (
                      <img 
                        src={brandingData.brandLogo} 
                        alt="Logo" 
                        className="h-8 w-auto"
                      />
                    )}
                    <h3 className="font-semibold">
                      {brandingData.brandName || 'Your Property Management'}
                    </h3>
                  </div>
                </div>
                
                <div className="p-4 bg-white">
                  <div className="space-y-3">
                    <div 
                      className="px-3 py-2 rounded text-white text-sm"
                      style={{ backgroundColor: brandingData.primaryColor }}
                    >
                      Primary Button
                    </div>
                    <div 
                      className="px-3 py-2 rounded text-white text-sm"
                      style={{ backgroundColor: brandingData.accentColor }}
                    >
                      Success Button
                    </div>
                    <div 
                      className="text-sm"
                      style={{ color: brandingData.secondaryColor }}
                    >
                      {brandingData.welcomeMessage || 'Welcome to your property portal. Manage your units, residents, and payments all in one place.'}
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mt-4 text-center">
                This preview shows how your branding will appear to residents and landlords
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="bg-gray-50 border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Powered by Visnec</h4>
            <p className="text-sm text-muted-foreground">
              White-label branding maintains subtle attribution in footer
            </p>
          </div>
          <Badge variant="secondary">Platform Attribution</Badge>
        </div>
      </div>
    </div>
  );
}