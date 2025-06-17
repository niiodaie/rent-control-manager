import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertApplicationSchema } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useMutation, queryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import FileUpload from "./FileUpload";
import { useState } from "react";
import type { InsertApplication } from "@shared/schema";

export default function ApplicationForm() {
  const [idFile, setIdFile] = useState<File | null>(null);
  const [incomeFile, setIncomeFile] = useState<File | null>(null);
  const { toast } = useToast();

  const form = useForm<InsertApplication>({
    resolver: zodResolver(insertApplicationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      desiredUnit: "",
      monthlyIncome: 0,
      references: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertApplication) => {
      const response = await apiRequest("POST", "/api/applications", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Application Submitted",
        description: "Your rental application has been submitted successfully.",
      });
      form.reset();
      setIdFile(null);
      setIncomeFile(null);
      queryClient.invalidateQueries({ queryKey: ["/api/applications"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertApplication) => {
    if (!idFile || !incomeFile) {
      toast({
        title: "Missing Documents",
        description: "Please upload both your ID and proof of income.",
        variant: "destructive",
      });
      return;
    }
    
    mutation.mutate(data);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200">
      <div className="border-b border-neutral-200 p-6">
        <h3 className="text-xl font-bold text-neutral-900">Rental Application Form</h3>
        <p className="text-neutral-600 mt-1">Fill out this form to apply for a unit</p>
      </div>
      
      <div className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="your.email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="(555) 123-4567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="desiredUnit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Desired Unit</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a unit" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1a">Unit 1A - $1,800/month</SelectItem>
                        <SelectItem value="2b">Unit 2B - $2,200/month</SelectItem>
                        <SelectItem value="3c">Unit 3C - $2,800/month</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="monthlyIncome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monthly Income</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="5000" 
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="references"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>References</FormLabel>
                    <FormControl>
                      <Input placeholder="Previous landlord contact" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-neutral-900">Required Documents</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Government ID</label>
                  <FileUpload
                    onFileSelect={setIdFile}
                    selectedFile={idFile}
                    accept=".jpg,.jpeg,.png,.pdf"
                    maxSize={5 * 1024 * 1024} // 5MB
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Proof of Income</label>
                  <FileUpload
                    onFileSelect={setIncomeFile}
                    selectedFile={incomeFile}
                    accept=".jpg,.jpeg,.png,.pdf"
                    maxSize={5 * 1024 * 1024} // 5MB
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={mutation.isPending} className="px-8 py-3">
                {mutation.isPending ? "Submitting..." : "Submit Application"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
