import { Upload, Clock, Store, Zap } from "lucide-react";

export const Features = () => {
  const features = [
    {
      icon: <Upload className="w-12 h-12 text-primary" />,
      title: "Google Drive Upload",
      description: "Seamlessly upload documents directly to our secure Google Drive system",
    },
    {
      icon: <Clock className="w-12 h-12 text-primary" />,
      title: "Lightning Fast",
      description: "Get your prints ready within hours, not days",
    },
    {
      icon: <Store className="w-12 h-12 text-primary" />,
      title: "In-Store Pickup",
      description: "Convenient pickup from our premium print studio",
    },
    {
      icon: <Zap className="w-12 h-12 text-primary" />,
      title: "QR Payment",
      description: "Secure and instant payment via custom QR codes",
    },
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-secondary sm:text-4xl">
            Premium Printing Experience
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Everything you need for professional quality prints, without the hassle
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex justify-center">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-accent">
                    {feature.icon}
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-secondary">{feature.title}</h3>
                  <p className="mt-2 text-base text-gray-500">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};