import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

console.log('Index page is loading...');

const Index = () => {
  console.log('Index page is rendering...');
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="absolute top-0 right-0 p-4">
        <Button asChild variant="outline" size="sm">
          <Link to="/admin/login" className="flex items-center gap-2">
            <Lock className="w-4 h-4" />
            Admin
          </Link>
        </Button>
      </header>
      <main className="flex-grow">
        <Hero />
        <Features />
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Ready to get started?</h2>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                Upload your document now and experience premium printing services
              </p>
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                <Link to="/upload">Upload Document</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-500">
            <p>© {new Date().getFullYear()} GlobalCopier. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;