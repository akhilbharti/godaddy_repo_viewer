
import { Repository } from "@/lib/types";
import { RepoFilterProps, SortField } from "./types";

// Memoization cache for filter operations
const filterCache = new Map<string, Repository[]>();

// Filter and sort repositories based on filters
export const filterAndSortRepositories = (
  repositories: Repository[],
  filters: RepoFilterProps
): Repository[] => {
  const { 
    searchQuery, 
    languageFilter, 
    sortField, 
    sortDirection, 
    showFavoritesOnly, 
    favorites 
  } = filters;
  debugger;
  
  let result = repositories.filter(repo => {
    // Search filter
    const matchesSearch = searchQuery 
      ? repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (repo.description && repo.description.toLowerCase().includes(searchQuery.toLowerCase()))
      : true;
    
    // Language filter
    const matchesLanguage = languageFilter === "all"
      ? true
      : repo.language === languageFilter;
    
    // Favorites filter
    const matchesFavorite = showFavoritesOnly
      ? favorites.includes(repo.id)
      : true;
      
    return matchesSearch && matchesLanguage && matchesFavorite;
  });
  
 // Sort the filtered repositories
 if (sortField) {
  result = [...result].sort((a, b) => {
    let valueA: number;
    let valueB: number;
    
    switch (sortField) {
      case "stars":
        valueA = a.stargazers_count;
        valueB = b.stargazers_count;
        break;
      case "forks":
        valueA = a.forks_count;
        valueB = b.forks_count;
        break;
      case "watchers":
        valueA = a.watchers_count;
        valueB = b.watchers_count;
        break;
      case "issues":
        valueA = a.open_issues_count;
        valueB = b.open_issues_count;
        break;
      default:
        return 0;
    }
    
    return sortDirection === "asc" 
      ? valueA - valueB 
      : valueB - valueA;
  });
}
  
  return result;
};


// Generate page numbers for pagination display
export const generatePageNumbers = (currentPage: number, totalPages: number): (number | null)[] => {
  const maxPagesToShow = 5;
  const pages: (number | null)[] = [];
  
  if (totalPages <= maxPagesToShow) {
    // Show all pages if total is less than max
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    // Always include first page
    pages.push(1);
    
    // Calculate start and end of middle pages
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);
    
    // Adjust if we're near the beginning or end
    if (currentPage <= 2) {
      endPage = 3;
    } else if (currentPage >= totalPages - 1) {
      startPage = totalPages - 2;
    }
    
    // Add ellipsis after first page if needed
    if (startPage > 2) {
      pages.push(null); // null indicates ellipsis
    }
    
    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    // Add ellipsis before last page if needed
    if (endPage < totalPages - 1) {
      pages.push(null); // null indicates ellipsis
    }
    
    // Always include last page
    pages.push(totalPages);
  }
  
  return pages;
};
