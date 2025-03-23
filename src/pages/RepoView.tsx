
import { useParams, useNavigate } from "react-router-dom";
import { fetchRepositoryByName } from "@/lib/api";
import Layout from "@/components/Layout";
import RepoDetails from "@/components/RepoDetails";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";

const RepoView = () => {
  const { repoName } = useParams<{ repoName: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { data: repository, isLoading, error, refetch } = useQuery({
    queryKey: ['repository', repoName],
    queryFn: () => fetchRepositoryByName(repoName || ''),
    enabled: !!repoName,
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5 minutes
    meta: {
      onError: (error: Error) => {
        toast({
          title: "Error",
          description: `Failed to fetch repository: ${repoName}`,
          variant: "destructive",
        });
      }
    }
  });
  
  if (!repoName) {
    navigate("/");
    return null;
  }
  
  if (isLoading) {
    return (
      <Layout showBackButton title={repoName}>
        <LoadingState type="detail" />
      </Layout>
    );
  }
  
  if (error || !repository) {
    return (
      <Layout showBackButton>
        <ErrorState 
          message={error instanceof Error ? error.message : "Repository not found"} 
          onRetry={() => refetch()} 
        />
      </Layout>
    );
  }
  
  return (
    <Layout showBackButton title={repository.name}>
      <RepoDetails repo={repository} />
    </Layout>
  );
};

export default RepoView;
