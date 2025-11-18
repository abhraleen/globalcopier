import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { LogOut, Users, FileText, TrendingUp } from "lucide-react";

// Mock data for demonstration
const mockVisitors = [
  { id: 1, timestamp: "2023-05-15 14:30:22", ip: "192.168.1.101", userAgent: "Chrome 113" },
  { id: 2, timestamp: "2023-05-15 15:45:17", ip: "192.168.1.102", userAgent: "Firefox 112" },
  { id: 3, timestamp: "2023-05-15 16:22:05", ip: "192.168.1.103", userAgent: "Safari 16" },
  { id: 4, timestamp: "2023-05-15 17:18:44", ip: "192.168.1.104", userAgent: "Edge 112" },
];

const mockOrders = [
  { id: 1, name: "John Doe", phone: "9876543210", deliveryMode: "pickup", pageCount: 25, timestamp: "2023-05-15 14:35:12", driveLink: "https://drive.google.com/file/..." },
  { id: 2, name: "Jane Smith", phone: "8765432109", deliveryMode: "courier", pageCount: 150, timestamp: "2023-05-15 15:50:33", driveLink: "https://drive.google.com/file/..." },
  { id: 3, name: "Robert Johnson", phone: "7654321098", deliveryMode: "pickup", pageCount: 75, timestamp: "2023-05-15 16:25:47", driveLink: "https://drive.google.com/file/..." },
];

const AdminDashboard = () => {
  const [visitors, setVisitors] = useState<any[]>(mockVisitors);
  const [orders, setOrders] = useState<any[]>(mockOrders);
  const navigate = useNavigate();

  // Check if admin is logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("admin_logged_in");
    if (!isLoggedIn) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("admin_logged_in");
    navigate("/admin/login");
  };

  // Load data from localStorage or initialize with mock data
  useEffect(() => {
    const savedVisitors = localStorage.getItem("admin_visitors");
    const savedOrders = localStorage.getItem("admin_orders");
    
    if (savedVisitors) {
      try {
        setVisitors(JSON.parse(savedVisitors));
      } catch (e) {
        console.error("Failed to parse visitors data", e);
      }
    }
    
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch (e) {
        console.error("Failed to parse orders data", e);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-secondary">GlobalCopier Admin</h1>
            </div>
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
              <Users className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{visitors.length}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <FileText className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orders.length}</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24.5%</div>
              <p className="text-xs text-muted-foreground">+3.2% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Visitors Table */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Visitor Tracking</CardTitle>
            <CardDescription>
              Recent visitors to your website
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Timestamp</th>
                    <th className="text-left py-3 px-4 font-medium">IP Address</th>
                    <th className="text-left py-3 px-4 font-medium">User Agent</th>
                  </tr>
                </thead>
                <tbody>
                  {visitors.map((visitor) => (
                    <tr key={visitor.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{visitor.timestamp}</td>
                      <td className="py-3 px-4">{visitor.ip}</td>
                      <td className="py-3 px-4">{visitor.userAgent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle>Order Logs</CardTitle>
            <CardDescription>
              Recent orders placed through the website
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Timestamp</th>
                    <th className="text-left py-3 px-4 font-medium">Customer</th>
                    <th className="text-left py-3 px-4 font-medium">Phone</th>
                    <th className="text-left py-3 px-4 font-medium">Delivery</th>
                    <th className="text-left py-3 px-4 font-medium">Pages</th>
                    <th className="text-left py-3 px-4 font-medium">File</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{order.timestamp}</td>
                      <td className="py-3 px-4">{order.name}</td>
                      <td className="py-3 px-4">{order.phone}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          order.deliveryMode === 'pickup' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {order.deliveryMode === 'pickup' ? 'Pickup' : 'Courier'}
                        </span>
                      </td>
                      <td className="py-3 px-4">{order.pageCount}</td>
                      <td className="py-3 px-4">
                        <a 
                          href={order.driveLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          View File
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboard;