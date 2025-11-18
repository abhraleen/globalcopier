import { useState } from "react";
import { OrderForm } from "@/components/OrderForm";
import { useLocation, useNavigate } from "react-router-dom";

const OrderPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { driveLink, fileName } = location.state || {};
  
  const handleOrderSubmit = (data: any) => {
    // Navigate to payment page with order data
    navigate("/payment", { 
      state: { 
        orderData: data
      } 
    });
  };

  // If we don't have file data, redirect to upload page
  if (!driveLink || !fileName) {
    navigate("/upload");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
            Place Your Order
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Provide your details and printing requirements
          </p>
        </div>
        
        <OrderForm 
          fileName={fileName} 
          driveLink={driveLink} 
          onOrderSubmit={handleOrderSubmit} 
        />
      </div>
    </div>
  );
};

export default OrderPage;