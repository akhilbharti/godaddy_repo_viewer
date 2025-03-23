
import { Button } from "@/components/ui/button";
import { LayoutGrid, LayoutList } from "lucide-react";
import { ViewMode } from "@/components/repos/RepoGrid";

interface ViewToggleProps {
  viewMode: ViewMode;
  onViewChange: (mode: ViewMode) => void;
}

const ViewToggle = ({ viewMode, onViewChange }: ViewToggleProps) => {
  return (
    <div className="flex space-x-2">
      <Button
        variant={viewMode === "grid" ? "default" : "outline"}
        size="sm"
        onClick={() => onViewChange("grid")}
        aria-label="Grid view"
        className="h-9 w-9 p-0"
      >
        <LayoutGrid className="h-4 w-4" />
      </Button>
      <Button
        variant={viewMode === "table" ? "default" : "outline"}
        size="sm"
        onClick={() => onViewChange("table")}
        aria-label="Table view"
        className="h-9 w-9 p-0"
      >
        <LayoutList className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ViewToggle;
