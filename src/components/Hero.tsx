import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-secondary sm:text-5xl md:text-6xl fade-in">
                <span className="block">Print Anything.</span>
                <span className="block text-primary mt-2">Anytime. Perfectly.</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 fade-in">
                Fast, Reliable, Premium Printing for Everyone.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start fade-in">
                <div className="rounded-md shadow">
                  <Button 
                    asChild 
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 md:py-4 md:text-lg md:px-10 transition-all duration-300"
                  >
                    <Link to="/upload">Upload Documents</Link>
                  </Button>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Button 
                    asChild 
                    variant="outline"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-accent hover:bg-accent/80 md:py-4 md:text-lg md:px-10 transition-all duration-300"
                  >
                    <Link to="/order">Place Order</Link>
                  </Button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <div className="h-56 w-full bg-gradient-to-r from-primary to-accent sm:h-72 md:h-96 lg:w-full lg:h-full rounded-l-2xl shadow-2xl">
          <div className="flex items-center justify-center h-full">
            <div className="text-center p-8">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 inline-block">
                <div className="bg-white rounded-xl p-4 shadow-lg">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-left">
                    <div className="h-2 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-2 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-2 bg-gray-200 rounded w-5/6 mb-4"></div>
                    <div className="h-8 bg-primary/20 rounded w-full mb-2"></div>
                    <div className="h-8 bg-success/20 rounded w-full"></div>
                  </div>
                </div>
              </div>
              <p className="text-white font-medium mt-4 text-lg">Premium Print Experience</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};