
import { Button } from "@/components/ui/button";
import { Star, GitFork, Eye, Code } from "lucide-react";
import { SortField, SortDirection } from "./types";
import SortButton from "./SortButton";

interface RepoControlsProps {
  sortField: SortField;
  sortDirection: SortDirection;
  showFavoritesOnly: boolean;
  onSortChange: (field: SortField) => void;
  onToggleFavoritesOnly: () => void;
}

const RepoControls = ({ 
  sortField, 
  sortDirection, 
  showFavoritesOnly, 
  onSortChange, 
  onToggleFavoritesOnly 
}: RepoControlsProps) => {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      <div className="flex flex-wrap gap-2">
        <SortButton 
          field="stars" 
          label="Stars" 
          icon={Star} 
          activeField={sortField} 
          direction={sortDirection} 
          onClick={onSortChange} 
        />
        <SortButton 
          field="forks" 
          label="Forks" 
          icon={GitFork} 
          activeField={sortField} 
          direction={sortDirection} 
          onClick={onSortChange} 
        />
        <SortButton 
          field="watchers" 
          label="Watchers" 
          icon={Eye} 
          activeField={sortField} 
          direction={sortDirection} 
          onClick={onSortChange} 
        />
        <SortButton 
          field="issues" 
          label="Issues" 
          icon={Code} 
          activeField={sortField} 
          direction={sortDirection} 
          onClick={onSortChange} 
        />
      </div>
      
      <Button 
        variant={showFavoritesOnly ? "default" : "outline"} 
        size="sm"
        onClick={onToggleFavoritesOnly}
        className="gap-1"
      >
        <Star className={`h-4 w-4 ${showFavoritesOnly ? 'fill-primary-foreground' : ''}`} />
        <span>
          {showFavoritesOnly ? "Show All" : "Favorites"}
        </span>
      </Button>
    </div>
  );
};

export default RepoControls;
