import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate, useLocation } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { FileText, Clock, CheckCircle, ArrowLeft, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [isPaid, setIsPaid] = useState(false);
  const [paymentVerified, setPaymentVerified] = useState(false);
  
  // Get order data from location state
  const orderData = location.state?.orderData;

  // Calculate amount based on page count (example pricing)
  const calculateAmount = () => {
    if (!orderData?.pageCount) return 0;
    const basePrice = 0.5; // ₹0.5 per page
    const pages = parseInt(orderData.pageCount);
    return pages * basePrice;
  };

  const amount = calculateAmount();

  // Timer effect
  useEffect(() => {
    if (isPaid || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaid, timeLeft]);

  // Format time for display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle payment confirmation
  const handlePaymentConfirmation = () => {
    setIsPaid(true);
    
    // Simulate payment verification
    setTimeout(() => {
      setPaymentVerified(true);
      toast({
        title: "Payment Confirmed",
        description: "Your payment has been successfully processed.",
      });
      
      // Redirect to WhatsApp automation after 2 seconds
      setTimeout(() => {
        // Create WhatsApp message
        const message = `New Print Order from GlobalCopierOfficial.com\n\n` +
          `Name: ${orderData?.name}\n` +
          `Phone: ${orderData?.phone}\n` +
          `Delivery Mode: ${orderData?.deliveryMode === 'pickup' ? 'In-Store Pickup' : 'Courier Delivery'}\n` +
          `${orderData?.deliveryMode === 'courier' ? `Address: ${orderData?.address}, ${orderData?.city}, ${orderData?.state} - ${orderData?.pincode}\n` : ''}` +
          `Pages: ${orderData?.pageCount}\n` +
          `Notes: ${orderData?.notes || 'None'}\n\n` +
          `Uploaded File:\n${orderData?.driveLink}\n\n` +
          `Payment: Completed via QR\n\n` +
          `Please confirm cost and delivery time.`;
        
        const encodedMessage = encodeURIComponent(message);
        const adminNumber = "918777060249"; // Replace with actual admin number
        
        // Redirect to WhatsApp
        window.open(`https://wa.me/${adminNumber}?text=${encodedMessage}`, '_blank');
        
        // Navigate to success page or home
        navigate("/");
      }, 2000);
    }, 1500);
  };

  // Reset timer
  const resetTimer = () => {
    setTimeLeft(300);
    toast({
      title: "Timer Reset",
      description: "Your payment timer has been reset for another 5 minutes.",
    });
  };

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-8">
            <div className="mx-auto bg-gray-100 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-secondary mb-2">No Order Data</h3>
            <p className="text-gray-600 mb-6">Please place an order first to proceed with payment.</p>
            <Button onClick={() => navigate("/upload")} className="bg-primary hover:bg-primary/90">
              Place New Order
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-secondary mb-2">Complete Your Payment</h1>
          <p className="text-gray-600">Scan the QR code to pay securely</p>
        </div>

        <Card className="shadow-lg rounded-2xl border-0 bg-white overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-primary to-accent/50 text-white text-center">
            <CardTitle className="text-2xl">Payment Details</CardTitle>
            <CardDescription className="text-white/90">
              Order for {orderData.fileName}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            {timeLeft <= 0 && !isPaid ? (
              <div className="text-center py-8">
                <div className="mx-auto bg-gray-100 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
                  <Clock className="w-8 h-8 text-gray-500" />
                </div>
                <h3 className="text-xl font-semibold text-secondary mb-2">Payment Expired</h3>
                <p className="text-gray-600 mb-6">The payment window has expired. Please place a new order.</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button onClick={() => navigate("/upload")} className="bg-primary hover:bg-primary/90">
                    Place New Order
                  </Button>
                  <Button variant="outline" onClick={resetTimer}>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Reset Timer
                  </Button>
                </div>
              </div>
            ) : isPaid ? (
              <div className="text-center py-8">
                {paymentVerified ? (
                  <>
                    <div className="mx-auto bg-success/10 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
                      <CheckCircle className="w-8 h-8 text-success" />
                    </div>
                    <h3 className="text-xl font-semibold text-secondary mb-2">Payment Confirmed!</h3>
                    <p className="text-gray-600 mb-6">Redirecting to WhatsApp for order confirmation...</p>
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mx-auto bg-primary/10 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                    <h3 className="text-xl font-semibold text-secondary mb-2">Processing Payment</h3>
                    <p className="text-gray-600 mb-6">Please wait while we verify your payment...</p>
                  </>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                {/* Order Summary */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-semibold text-secondary mb-3">Order Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">File:</span>
                      <span className="font-medium truncate max-w-[150px]">{orderData.fileName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pages:</span>
                      <span className="font-medium">{orderData.pageCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Delivery:</span>
                      <span className="font-medium">
                        {orderData.deliveryMode === 'pickup' ? 'In-Store Pickup' : 'Courier Delivery'}
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 border-t">
                      <span className="text-gray-600 font-medium">Total Amount:</span>
                      <span className="font-bold text-lg text-primary">₹{amount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* QR Code Section */}
                <div className="bg-gradient-to-br from-accent/30 to-white rounded-2xl p-6 border border-accent/20 shadow-soft">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-semibold text-secondary">Scan to Pay</h3>
                    <p className="text-sm text-gray-600">Use any UPI app to scan this QR code</p>
                  </div>
                  
                  <div className="flex justify-center mb-4">
                    <div className="bg-white p-4 rounded-xl shadow-medium">
                      <QRCodeSVG 
                        value={`upi://pay?pa=globalcopier@upi&pn=GlobalCopier&am=${amount}&cu=INR`} 
                        size={200} 
                        level="H"
                      />
                    </div>
                  </div>
                  
                  <div className="text-center text-sm text-gray-600">
                    <p>Amount: ₹{amount.toFixed(2)}</p>
                    <p className="mt-1">UPI ID: globalcopier@upi</p>
                  </div>
                </div>

                {/* Timer */}
                <div className="flex items-center justify-between bg-warning/10 rounded-xl p-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-warning" />
                    <span className="font-medium text-warning">Time Remaining</span>
                  </div>
                  <span className="text-xl font-bold text-warning">{formatTime(timeLeft)}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    onClick={handlePaymentConfirmation}
                    className="flex-1 bg-primary hover:bg-primary/90 py-6"
                  >
                    I've Paid
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => navigate(-1)}
                    className="flex-1"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Edit
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentPage;