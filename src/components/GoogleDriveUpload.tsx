import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileText, CheckCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GoogleDriveUploadProps {
  onUploadComplete: (driveLink: string, fileName: string) => void;
}

export const GoogleDriveUpload = ({ onUploadComplete }: GoogleDriveUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<{ name: string; driveLink: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    const file = files[0];
    if (!file) return;

    // Validate file type
    const validTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/png'
    ];

    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF, DOC, DOCX, JPG, or PNG file.",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 50MB)
    if (file.size > 50 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 50MB.",
        variant: "destructive",
      });
      return;
    }

    uploadFile(file);
  };

  const uploadFile = async (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 95) {
            clearInterval(interval);
            return 95;
          }
          return prev + 5;
        });
      }, 200);

      // Simulate API call to Google Apps Script
      // In a real implementation, this would be:
      // const formData = new FormData();
      // formData.append('file', file);
      // const response = await fetch('YOUR_GOOGLE_APPS_SCRIPT_URL', {
      //   method: 'POST',
      //   body: formData
      // });
      // const result = await response.json();

      // Simulate response delay
      await new Promise(resolve => setTimeout(resolve, 3000));

      clearInterval(interval);
      setUploadProgress(100);

      // Simulate successful upload response
      const fakeDriveLink = `https://drive.google.com/file/d/${Math.random().toString(36).substring(2, 15)}/view`;
      
      setUploadedFile({
        name: file.name,
        driveLink: fakeDriveLink
      });

      // Call parent callback
      onUploadComplete(fakeDriveLink, file.name);

      toast({
        title: "Upload successful",
        description: "Your file has been uploaded to Google Drive.",
      });
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your file. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const resetUpload = () => {
    setUploadedFile(null);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg rounded-2xl border-0 bg-white">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-secondary">Upload Your Document</CardTitle>
        <CardDescription className="text-gray-600">
          Drag and drop your file or click to browse
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!uploadedFile ? (
          <div
            className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 ${
              isDragging 
                ? "border-primary bg-accent/50" 
                : "border-gray-300 hover:border-primary hover:bg-accent/30"
            }`}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={triggerFileInput}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileInput}
              className="hidden"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            />
            
            {isUploading ? (
              <div className="space-y-4">
                <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto" />
                <p className="text-lg font-medium text-secondary">Uploading...</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-primary h-2.5 rounded-full transition-all duration-300" 
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500">{uploadProgress}% complete</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="mx-auto bg-accent rounded-full p-3 w-16 h-16 flex items-center justify-center">
                  <Upload className="w-8 h-8 text-primary" />
                </div>
                <p className="text-lg font-medium text-secondary">
                  Drag & drop your file here
                </p>
                <p className="text-sm text-gray-500">
                  Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 50MB)
                </p>
                <Button 
                  variant="outline" 
                  className="mt-2 border-primary text-primary hover:bg-primary hover:text-white"
                >
                  Or browse files
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center space-y-6">
            <div className="mx-auto bg-success/10 rounded-full p-4 w-20 h-20 flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-success" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-secondary">Upload Successful!</h3>
              <p className="text-gray-600 mt-2">Your file has been uploaded to Google Drive</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-left">
              <div className="flex items-center space-x-3">
                <FileText className="w-8 h-8 text-primary" />
                <div>
                  <p className="font-medium text-secondary truncate max-w-xs">{uploadedFile.name}</p>
                  <a 
                    href={uploadedFile.driveLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    View in Google Drive
                  </a>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                onClick={() => onUploadComplete(uploadedFile.driveLink, uploadedFile.name)}
                className="bg-primary hover:bg-primary/90"
              >
                Continue to Order
              </Button>
              <Button 
                variant="outline" 
                onClick={resetUpload}
              >
                Upload Another File
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};