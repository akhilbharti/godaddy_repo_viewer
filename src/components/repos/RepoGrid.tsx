import { Repository } from "@/lib/types";
import RepoCard from "@/components/RepoCard";
import RepoTable from "@/components/repos/RepoTable";

export type ViewMode = "grid" | "table";

interface RepoGridProps {
  repos: Repository[];
  favorites: number[];
  onToggleFavorite: (repoId: number) => void;
  onLanguageClick: (language: string) => void;
  viewMode: ViewMode;
}

const RepoGrid = ({ repos, favorites, onToggleFavorite, onLanguageClick, viewMode }: RepoGridProps) => {
  if (repos.length === 0) {
    return (
      <div className="text-center py-12 animate-fade-in">
        <h3 className="text-lg font-medium mb-2">No repositories found</h3>
        <p className="text-muted-foreground">
          Try adjusting your search or filter criteria
        </p>
      </div>
    );
  }
  
  // Display table view if selected
  if (viewMode === "table") {
    return (
      <RepoTable 
        repos={repos}
        favorites={favorites}
        onToggleFavorite={onToggleFavorite}
        onLanguageClick={onLanguageClick}
      />
    );
  }
  
  // Otherwise display grid view (default)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
      {repos.map((repo) => (
        <RepoCard 
          key={repo.id} 
          repo={repo} 
          isFavorite={favorites.includes(repo.id)}
          onToggleFavorite={() => onToggleFavorite(repo.id)}
          onLanguageClick={onLanguageClick}
        />
      ))}
    </div>
  );
};

export default RepoGrid;
