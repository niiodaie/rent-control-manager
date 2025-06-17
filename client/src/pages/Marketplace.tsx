import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, ShoppingCart, DollarSign, Package } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { formatCurrency } from "@/lib/utils";
import type { MarketplaceListing, InsertMarketplaceListing } from "@shared/schema";

export default function Marketplace() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { toast } = useToast();

  // For demo purposes, use property ID 1
  const propertyId = 1;

  const { data: listings = [], isLoading } = useQuery({
    queryKey: ['/api/marketplace', propertyId],
    queryFn: () => apiRequest(`/api/marketplace/${propertyId}`)
  });

  const createListingMutation = useMutation({
    mutationFn: async (data: InsertMarketplaceListing) => {
      return apiRequest('/api/marketplace', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/marketplace', propertyId] });
      setIsCreateOpen(false);
      toast({ title: "Success", description: "Item listed successfully!" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create listing", variant: "destructive" });
    }
  });

  const buyItemMutation = useMutation({
    mutationFn: async (listingId: number) => {
      return apiRequest(`/api/marketplace/${listingId}`, {
        method: 'PUT',
        body: JSON.stringify({ status: 'sold' }),
        headers: { 'Content-Type': 'application/json' }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/marketplace', propertyId] });
      toast({ title: "Success", description: "Purchase completed!" });
    },
    onError: () => {
      toast({ title: "Error", description: "Purchase failed", variant: "destructive" });
    }
  });

  const onSubmit = (formData: FormData) => {
    const data = Object.fromEntries(formData.entries());
    createListingMutation.mutate({
      propertyId,
      residentId: 1, // Demo resident ID
      title: data.title as string,
      description: data.description as string,
      price: data.price as string,
      category: data.category as string,
      condition: data.condition as string,
      status: "active",
      imageUrls: []
    });
  };

  const filteredListings = selectedCategory === "all" 
    ? listings.filter((listing: MarketplaceListing) => listing.status === "active")
    : listings.filter((listing: MarketplaceListing) => 
        listing.category === selectedCategory && listing.status === "active"
      );

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "new": return "bg-green-100 text-green-800";
      case "like-new": return "bg-blue-100 text-blue-800";
      case "good": return "bg-yellow-100 text-yellow-800";
      case "fair": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Community Marketplace</h1>
          <p className="text-muted-foreground">Buy and sell items with your neighbors</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              List Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>List an Item</DialogTitle>
            </DialogHeader>
            <form action={onSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" name="title" placeholder="What are you selling?" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input id="price" name="price" type="number" step="0.01" placeholder="0.00" required />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select name="category" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="furniture">Furniture</SelectItem>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="books">Books</SelectItem>
                      <SelectItem value="clothing">Clothing</SelectItem>
                      <SelectItem value="sports">Sports & Recreation</SelectItem>
                      <SelectItem value="kitchen">Kitchen & Dining</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="condition">Condition</Label>
                  <Select name="condition" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="like-new">Like New</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="fair">Fair</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  name="description" 
                  placeholder="Describe your item..." 
                  rows={3}
                  required 
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={createListingMutation.isPending}>
                  {createListingMutation.isPending ? "Listing..." : "List Item"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex space-x-4">
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="furniture">Furniture</SelectItem>
            <SelectItem value="electronics">Electronics</SelectItem>
            <SelectItem value="books">Books</SelectItem>
            <SelectItem value="clothing">Clothing</SelectItem>
            <SelectItem value="sports">Sports & Recreation</SelectItem>
            <SelectItem value="kitchen">Kitchen & Dining</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="h-48 bg-gray-200 rounded-t-lg"></div>
              <CardContent className="p-4">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded mb-2"></div>
                <div className="h-6 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredListings.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No items found</h3>
            <p className="text-muted-foreground mb-4">
              {selectedCategory === "all" 
                ? "No items are currently listed in the marketplace"
                : `No items found in the ${selectedCategory} category`
              }
            </p>
            <Button onClick={() => setIsCreateOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              List the first item
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing: MarketplaceListing) => (
            <Card key={listing.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
                <Package className="h-16 w-16 text-muted-foreground" />
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg truncate">{listing.title}</h3>
                  <Badge className={getConditionColor(listing.condition)}>
                    {listing.condition}
                  </Badge>
                </div>
                <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                  {listing.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span className="text-xl font-bold text-green-600">
                      {formatCurrency(parseFloat(listing.price))}
                    </span>
                  </div>
                  <Button 
                    size="sm"
                    onClick={() => buyItemMutation.mutate(listing.id)}
                    disabled={buyItemMutation.isPending}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Buy
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}