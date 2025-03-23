
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp } from "lucide-react";
import { SortField, SortDirection } from "./types";

interface SortButtonProps {
  field: SortField;
  label: string;
  icon: React.ElementType;
  activeField: SortField;
  direction: SortDirection;
  onClick: (field: SortField) => void;
}

const SortButton = ({ 
  field, 
  label, 
  icon: Icon, 
  activeField, 
  direction,
  onClick 
}: SortButtonProps) => (
  <Button 
    variant="outline" 
    size="sm"
    className={`gap-1 ${activeField === field ? 'bg-secondary' : ''}`}
    onClick={() => onClick(field)}
  >
    <Icon className="h-4 w-4" />
    <span>{label}</span>
    {activeField === field && (
      direction === "asc" 
        ? <ArrowUp className="h-3 w-3 ml-1" /> 
        : <ArrowDown className="h-3 w-3 ml-1" />
    )}
  </Button>
);

export default SortButton;
