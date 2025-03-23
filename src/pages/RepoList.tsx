
import { useMemo, useState } from "react";
import Layout from "@/components/Layout";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";
import SearchBar from "@/components/SearchBar";
import { useRepositoryManagement } from "@/hooks/use-repository-management";
import RepoControls from "@/components/repos/RepoControls";
import RepoGrid, { ViewMode } from "@/components/repos/RepoGrid";
import RepoPagination from "@/components/repos/RepoPagination";
import ViewToggle from "@/components/repos/ViewToggle";

const ITEMS_PER_PAGE = 9; // Number of repos to show per page

const RepoList = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  
  const {
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
    fetchRepos
  } = useRepositoryManagement();
  
  // Calculate pagination
  const totalPages = Math.ceil(processedRepos.length / ITEMS_PER_PAGE);
  
  // Get current page of repositories
  const paginatedRepos = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return processedRepos.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [processedRepos, currentPage]);
  
  // Handle page changes
  const goToPage = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  if (loading) {
    return (
      <Layout>
        <LoadingState type="list" />
      </Layout>
    );
  }
  
  if (error) {
    return (
      <Layout>
        <ErrorState message={error} onRetry={fetchRepos} />
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">GoDaddy Repositories</h1>
        <p className="text-muted-foreground">
          Explore {processedRepos.length} public repositories from GoDaddy
        </p>
      </div>
      
      <SearchBar 
        onSearchChange={setSearchQuery}
        onLanguageChange={setLanguageFilter}
        languages={availableLanguages}
      />
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <RepoControls 
          sortField={sortField}
          sortDirection={sortDirection}
          showFavoritesOnly={showFavoritesOnly}
          onSortChange={handleSort}
          onToggleFavoritesOnly={() => setShowFavoritesOnly(!showFavoritesOnly)}
        />
        
        <div className="flex items-center gap-3">
          <ViewToggle viewMode={viewMode} onViewChange={setViewMode} />
        </div>
      </div>
      
      <RepoGrid 
        repos={paginatedRepos}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
        onLanguageClick={handleLanguageClick}
        viewMode={viewMode}
      />
      
      {processedRepos.length > 0 && (
        <>
          <RepoPagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={goToPage} 
          />
          
          <div className="mt-4 text-center text-sm text-muted-foreground">
            Showing {paginatedRepos.length} of {processedRepos.length} repositories
          </div>
        </>
      )}
    </Layout>
  );
};

export default RepoList;
