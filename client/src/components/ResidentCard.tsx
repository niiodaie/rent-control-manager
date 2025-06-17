import { Eye, Edit2, Bell, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import type { Resident } from "@shared/schema";

interface ResidentCardProps {
  resident: Resident;
  onEdit: (resident: Resident) => void;
  onDelete: (id: number) => void;
}

export default function ResidentCard({ resident, onEdit, onDelete }: ResidentCardProps) {
  const [noticeType, setNoticeType] = useState("");
  const [noticeMessage, setNoticeMessage] = useState("");
  const [isNoticeDialogOpen, setIsNoticeDialogOpen] = useState(false);
  const { toast } = useToast();

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "active":
        return "default";
      case "late":
        return "destructive";
      case "notice":
        return "secondary";
      default:
        return "default";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "status-active";
      case "late":
        return "status-late";
      case "notice":
        return "status-notice";
      default:
        return "status-active";
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleSendNotice = () => {
    if (!noticeType || !noticeMessage.trim()) {
      toast({
        title: "Error",
        description: "Please select a notice type and enter a message.",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically send the notice via API
    toast({
      title: "Notice Sent",
      description: `${noticeType} notice sent to ${resident.name}`,
    });
    
    setNoticeType("");
    setNoticeMessage("");
    setIsNoticeDialogOpen(false);
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-shadow ${
      resident.status === "late" ? "border-red-200" : "border-neutral-200"
    }`}>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-lg ${
              resident.status === "late" ? "bg-gradient-to-r from-red-500 to-red-600" : "gradient-avatar"
            }`}>
              {getInitials(resident.name)}
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900">{resident.name}</h3>
              <p className="text-sm text-neutral-600">{resident.email}</p>
            </div>
          </div>
          <Badge variant={getStatusVariant(resident.status)} className={getStatusColor(resident.status)}>
            {resident.status.charAt(0).toUpperCase() + resident.status.slice(1)}
          </Badge>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-neutral-600">Unit:</span>
            <span className="font-medium text-neutral-900">{resident.unit}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-neutral-600">Monthly Rent:</span>
            <span className="font-medium text-neutral-900">${resident.rent.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-neutral-600">Lease Expires:</span>
            <span className="font-medium text-neutral-900">{resident.leaseExpiry}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-neutral-600">
              {resident.status === "late" ? "Days Late:" : "Last Payment:"}
            </span>
            <span className={`font-medium ${
              resident.status === "late" ? "text-red-600" : "text-accent"
            }`}>
              {resident.status === "late" ? "12 days" : resident.lastPayment}
            </span>
          </div>
        </div>

        <div className="flex space-x-2">
          <Button 
            size="sm" 
            className="flex-1"
            onClick={() => onEdit(resident)}
          >
            <Eye className="w-4 h-4 mr-1" />
            View
          </Button>
          
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => onEdit(resident)}
          >
            <Edit2 className="w-4 h-4" />
          </Button>

          <Dialog open={isNoticeDialogOpen} onOpenChange={setIsNoticeDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline" className="bg-amber-100 text-amber-700 hover:bg-amber-200 border-amber-200">
                <Bell className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Send Notice to {resident.name}</DialogTitle>
                <DialogDescription>
                  Send a notice to the resident regarding their tenancy.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="notice-type">Notice Type</Label>
                  <Select value={noticeType} onValueChange={setNoticeType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select notice type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="late-payment">Late Payment Notice</SelectItem>
                      <SelectItem value="lease-renewal">Lease Renewal</SelectItem>
                      <SelectItem value="maintenance">Maintenance Notice</SelectItem>
                      <SelectItem value="move-out">Move-out Notice</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Enter your message..."
                    value={noticeMessage}
                    onChange={(e) => setNoticeMessage(e.target.value)}
                    rows={4}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setIsNoticeDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSendNotice}>
                  Send Notice
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="sm" variant="outline" className="bg-red-100 text-red-700 hover:bg-red-200 border-red-200">
                <Trash2 className="w-4 h-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Remove Resident</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to remove {resident.name} from your property? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => onDelete(resident.id)}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Remove
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}
