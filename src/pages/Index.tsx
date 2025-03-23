
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { useToast } from "@/components/ui/use-toast";
import LoadingState from "@/components/LoadingState";

/**
 * Index component that redirects to the main repository list page
 * and ensures data is properly loaded
 */
const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Redirect to the main repository list where data is fetched
    navigate("/", { replace: true });
    
    toast({
      title: "Loading repositories",
      description: "Fetching the latest GitHub repositories for GoDaddy",
    });
  }, [navigate, toast]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <LoadingState type="list" />
        <div className="text-center mt-4 text-muted-foreground">
          Loading repository data...
        </div>
      </div>
    </Layout>
  );
};

export default Index;
