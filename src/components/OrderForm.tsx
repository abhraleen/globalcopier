import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { FileText } from "lucide-react";

interface OrderFormProps {
  fileName: string;
  driveLink: string;
  onOrderSubmit: (orderData: any) => void;
}

export const OrderForm = ({ fileName, driveLink, onOrderSubmit }: OrderFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    deliveryMode: "pickup",
    address: "",
    city: "",
    state: "",
    pincode: "",
    pageCount: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.phone || !formData.pageCount) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Validate phone number (10 digits)
    if (!/^\d{10}$/.test(formData.phone)) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid 10-digit phone number.",
        variant: "destructive",
      });
      return;
    }

    // Validate page count
    const pageCount = parseInt(formData.pageCount);
    if (isNaN(pageCount) || pageCount <= 0) {
      toast({
        title: "Invalid page count",
        description: "Please enter a valid number of pages.",
        variant: "destructive",
      });
      return;
    }

    // If delivery is selected, validate address fields
    if (formData.deliveryMode === "courier") {
      if (!formData.address || !formData.city || !formData.state || !formData.pincode) {
        toast({
          title: "Missing address details",
          description: "Please fill in all address fields for courier delivery.",
          variant: "destructive",
        });
        return;
      }

      // Validate pincode (6 digits)
      if (!/^\d{6}$/.test(formData.pincode)) {
        toast({
          title: "Invalid pincode",
          description: "Please enter a valid 6-digit pincode.",
          variant: "destructive",
        });
        return;
      }
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      onOrderSubmit({
        ...formData,
        fileName,
        driveLink,
        pageCount: parseInt(formData.pageCount),
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg rounded-2xl border-0 bg-white">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-secondary">Order Details</CardTitle>
        <CardDescription className="text-gray-600">
          Please provide your details and printing requirements
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* File Preview */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <FileText className="w-8 h-8 text-primary" />
              <div>
                <p className="font-medium text-secondary truncate max-w-xs">{fileName}</p>
                <a 
                  href={driveLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  View in Google Drive
                </a>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-secondary border-b pb-2">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="9876543210"
                  maxLength={10}
                  required
                />
              </div>
            </div>
          </div>

          {/* Delivery Options */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-secondary border-b pb-2">Delivery Options</h3>
            
            <div className="space-y-2">
              <Label htmlFor="deliveryMode">Delivery Mode *</Label>
              <Select 
                value={formData.deliveryMode} 
                onValueChange={(value) => handleSelectChange("deliveryMode", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select delivery mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pickup">In-Store Pickup</SelectItem>
                  <SelectItem value="courier">Courier Delivery</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.deliveryMode === "courier" && (
              <div className="space-y-4 mt-4 p-4 bg-gray-50 rounded-xl">
                <div className="space-y-2">
                  <Label htmlFor="address">Full Address *</Label>
                  <Textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Street address, apartment, building, etc."
                    rows={3}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="City"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="State"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="pincode">Pincode *</Label>
                    <Input
                      id="pincode"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      placeholder="123456"
                      maxLength={6}
                      required
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Printing Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-secondary border-b pb-2">Printing Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pageCount">Number of Pages *</Label>
                <Input
                  id="pageCount"
                  name="pageCount"
                  type="number"
                  value={formData.pageCount}
                  onChange={handleChange}
                  placeholder="Enter page count"
                  min="1"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Any special instructions for printing..."
                rows={3}
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90 py-6 text-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Proceed to Payment"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};