
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Archive, GitFork, Code, Copy, GitMerge } from "lucide-react";
import { RepositoryType } from "@/lib/schemas";

interface TypeFilterProps {
  typeFilter: RepositoryType;
  onChange: (type: RepositoryType) => void;
}

const typeLabels: Record<RepositoryType, { label: string; icon: React.ElementType }> = {
  "all": { label: "All types", icon: Code },
  "source": { label: "Sources", icon: Code },
  "fork": { label: "Forks", icon: GitFork },
  "archived": { label: "Archived", icon: Archive },
  "mirror": { label: "Mirrors", icon: GitMerge },
  "template": { label: "Templates", icon: Copy },
};

const TypeFilter = ({ typeFilter, onChange }: TypeFilterProps) => {
  const currentType = typeLabels[typeFilter];
  const Icon = currentType.icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-9 gap-1">
          <Icon className="h-4 w-4" />
          <span>{currentType.label}</span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuRadioGroup value={typeFilter} onValueChange={(value) => onChange(value as RepositoryType)}>
          {Object.entries(typeLabels).map(([type, { label, icon: ItemIcon }]) => (
            <DropdownMenuRadioItem key={type} value={type} className="gap-2">
              <ItemIcon className="h-4 w-4" />
              <span>{label}</span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TypeFilter;
