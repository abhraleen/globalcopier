import { GoogleDriveUpload } from "@/components/GoogleDriveUpload";
import { useNavigate } from "react-router-dom";

const UploadPage = () => {
  const navigate = useNavigate();

  const handleUploadComplete = (driveLink: string, fileName: string) => {
    // Navigate to order form with file data
    navigate("/order", { 
      state: { 
        driveLink, 
        fileName 
      } 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
            Upload Your Documents
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Securely upload your files to our Google Drive system for professional printing
          </p>
        </div>
        
        <GoogleDriveUpload onUploadComplete={handleUploadComplete} />
        
        <div className="mt-12 max-w-3xl mx-auto bg-white rounded-2xl shadow-soft p-6">
          <h2 className="text-xl font-bold text-secondary mb-4">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <span className="text-primary font-bold">1</span>
              </div>
              <h3 className="font-semibold text-secondary mb-2">Upload</h3>
              <p className="text-sm text-gray-600">
                Drag and drop your document or browse files
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <span className="text-primary font-bold">2</span>
              </div>
              <h3 className="font-semibold text-secondary mb-2">Order</h3>
              <p className="text-sm text-gray-600">
                Fill in your details and printing requirements
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <span className="text-primary font-bold">3</span>
              </div>
              <h3 className="font-semibold text-secondary mb-2">Pay & Collect</h3>
              <p className="text-sm text-gray-600">
                Pay via QR code and pick up your prints
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;