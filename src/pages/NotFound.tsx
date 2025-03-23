
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/Layout";
import { FileX } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center animate-fade-in">
        <div className="bg-secondary p-6 rounded-full mb-6">
          <FileX className="h-12 w-12 text-muted-foreground" />
        </div>
        <h1 className="text-4xl font-semibold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild>
          <a href="/">Return to Home</a>
        </Button>
      </div>
    </Layout>
  );
};

export default NotFound;
