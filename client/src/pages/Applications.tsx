import { useQuery, useMutation, queryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { FileText, Clock, CheckCircle, XCircle } from "lucide-react";
import { getStatusColor } from "@/lib/utils";
import type { Application } from "@shared/schema";

export default function Applications() {
  const { toast } = useToast();

  const { data: applications, isLoading } = useQuery<Application[]>({
    queryKey: ["/api/applications"],
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const response = await apiRequest("PUT", `/api/applications/${id}/status`, { status });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Application Updated",
        description: "Application status has been updated.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/applications"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update application status.",
        variant: "destructive",
      });
    },
  });

  const handleStatusUpdate = (id: number, status: string) => {
    updateStatusMutation.mutate({ id, status });
  };

  const stats = applications ? {
    total: applications.length,
    pending: applications.filter(a => a.status === "pending").length,
    approved: applications.filter(a => a.status === "approved").length,
    rejected: applications.filter(a => a.status === "rejected").length,
  } : { total: 0, pending: 0, approved: 0, rejected: 0 };

  return (
    <div className="flex-1 overflow-auto">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 px-6 py-4">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">Applications</h2>
          <p className="text-neutral-600">Review and manage rental applications</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-600">Total Applications</p>
                  <p className="text-2xl font-bold text-neutral-900">{stats.total}</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-600">Pending Review</p>
                  <p className="text-2xl font-bold text-amber-500">{stats.pending}</p>
                </div>
                <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-amber-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-600">Approved</p>
                  <p className="text-2xl font-bold text-accent">{stats.approved}</p>
                </div>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-600">Rejected</p>
                  <p className="text-2xl font-bold text-red-500">{stats.rejected}</p>
                </div>
                <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
                  <XCircle className="h-6 w-6 text-red-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Applications List */}
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-32 bg-neutral-200 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : applications && applications.length > 0 ? (
          <div className="space-y-4">
            {applications.map((application) => (
              <Card key={application.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-neutral-900">
                          {application.fullName}
                        </h3>
                        <Badge className={getStatusColor(application.status)}>
                          {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-sm text-neutral-600 mb-1">{application.email}</p>
                      <p className="text-sm text-neutral-600">{application.phone}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-neutral-500">
                        Applied: {new Date(application.submittedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-neutral-600">Desired Unit</p>
                      <p className="font-medium">{application.desiredUnit}</p>
                    </div>
                    <div>
                      <p className="text-sm text-neutral-600">Monthly Income</p>
                      <p className="font-medium">${application.monthlyIncome.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-neutral-600">References</p>
                      <p className="font-medium">{application.references}</p>
                    </div>
                  </div>

                  {application.status === "pending" && (
                    <div className="flex space-x-3">
                      <Button
                        size="sm"
                        onClick={() => handleStatusUpdate(application.id, "approved")}
                        disabled={updateStatusMutation.isPending}
                        className="bg-accent hover:bg-accent/90"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleStatusUpdate(application.id, "rejected")}
                        disabled={updateStatusMutation.isPending}
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-neutral-900 mb-2">No applications yet</h3>
            <p className="text-neutral-600">Applications will appear here when people apply for units.</p>
          </div>
        )}
      </main>
    </div>
  );
}
