
import { Repository } from "@/lib/types";

export type SortField = "stars" | "forks" | "watchers" | "issues" | null;
export type SortDirection = "asc" | "desc";

export interface RepoFilterProps {
  searchQuery: string;
  languageFilter: string;
  sortField: SortField;
  sortDirection: SortDirection;
  showFavoritesOnly: boolean;
  favorites: number[];
}
