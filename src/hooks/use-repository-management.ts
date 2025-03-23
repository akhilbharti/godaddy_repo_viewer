
import { useState, useEffect, useMemo, useCallback } from "react";
import { Repository } from "@/lib/types";
import { fetchRepositories } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import { SortField, SortDirection } from "@/components/repos/types";
import { filterAndSortRepositories } from "@/components/repos/utils";
import { useQuery } from "@tanstack/react-query";

export function useRepositoryManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [languageFilter, setLanguageFilter] = useState("all");
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  
  const { toast } = useToast();
  
  // Fetch repositories using React Query with improved configuration
  const { 
    data: repositories = [], 
    isLoading: loading, 
    error: queryError,
    refetch: fetchRepos,
    isRefetching
  } = useQuery({
    queryKey: ['repositories'],
    queryFn: fetchRepositories,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes cache time
    retry: 3, // Retry failed requests 3 times
    refetchOnMount: true, // Always refetch when component mounts
    refetchInterval: false, // Don't automatically refetch at intervals
  });

  // Convert query error to string for UI
  const error = queryError ? (queryError instanceof Error ? queryError.message : "Failed to fetch repositories") : null;
  
  // // Initial data fetch notification
  // useEffect(() => {
  //   if (repositories.length > 0) {
  //     toast({
  //       title: "Repositories loaded",
  //       description: `Loaded ${repositories.length} repositories from GoDaddy.`,
  //     });
  //   }
  // }, [repositories.length, toast]);
  
  // Enhanced refetch function that shows user feedback
  const refetchRepositories = useCallback(() => {
    toast({
      title: "Refreshing data",
      description: "Fetching the latest repositories..."
    });
    fetchRepos();
  }, [fetchRepos, toast]);
  
  useEffect(() => {
    // Load favorites from local storage
    const storedFavorites = localStorage.getItem("favoriteRepos");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);
  
  // Save favorites to local storage when they change
  useEffect(() => {
    localStorage.setItem("favoriteRepos", JSON.stringify(favorites));
  }, [favorites]);
  
  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, languageFilter, sortField, sortDirection, showFavoritesOnly]);
  
  // Extract unique languages from repositories
  const availableLanguages = useMemo(() => {
    const languages = repositories
      .map(repo => repo.language)
      .filter(Boolean) as string[];
    
    return Array.from(new Set(languages)).sort();
  }, [repositories]);
  
  // Toggle favorite status for a repository
  const toggleFavorite = (repoId: number) => {
    setFavorites(prev => {
      if (prev.includes(repoId)) {
        toast({
          title: "Removed from favorites",
          description: "Repository has been removed from your favorites",
        });
        return prev.filter(id => id !== repoId);
      } else {
        toast({
          title: "Added to favorites",
          description: "Repository has been added to your favorites",
        });
        return [...prev, repoId];
      }
    });
  };
  
  // Handle sorting by clicking on sort buttons
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Toggle direction if same field is clicked
      setSortDirection(prev => prev === "asc" ? "desc" : "asc");
    } else {
      // Set new field and default to descending
      setSortField(field);
      setSortDirection("desc");
    }
  };
  
  // Handle language filter from clicking on a language badge
  const handleLanguageClick = (language: string) => {
    setLanguageFilter(language);
  };
  
  // Filter and sort repositories based on search query, language filter, and sort settings
  const processedRepos = useMemo(() => {
    return filterAndSortRepositories(repositories, {
      searchQuery,
      languageFilter,
      sortField,
      sortDirection,
      showFavoritesOnly,
      favorites
    });
  }, [repositories, searchQuery, languageFilter, sortField, sortDirection, favorites, showFavoritesOnly]);
  
  // Force an immediate fetch on component mount
  useEffect(() => {
    if (repositories.length === 0 && !loading && !isRefetching) {
      fetchRepos();
    }
  }, [repositories.length, loading, isRefetching, fetchRepos]);
  
  return {
    repositories,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    languageFilter,
    setLanguageFilter,
    sortField,
    sortDirection,
    favorites,
    showFavoritesOnly,
    setShowFavoritesOnly,
    currentPage,
    setCurrentPage,
    availableLanguages,
    processedRepos,
    toggleFavorite,
    handleSort,
    handleLanguageClick,
    fetchRepos: refetchRepositories,
    isRefetching
  };
}
