
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

interface SearchBarProps {
  onSearchChange: (value: string) => void;
  onLanguageChange: (value: string) => void;
  languages: string[];
}

const SearchBar = ({ onSearchChange, onLanguageChange, languages }: SearchBarProps) => {
  const [searchValue, setSearchValue] = useState("");
  
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onSearchChange(searchValue);
    }, 300);
    
    return () => clearTimeout(debounceTimer);
  }, [searchValue, onSearchChange]);
  
  return (
    <div className="bg-card rounded-lg border p-3 mb-6 flex flex-col sm:flex-row gap-3 animate-fade-in">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search repositories..."
          className="pl-9"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      
      <div className="w-full sm:w-48">
        <Select onValueChange={onLanguageChange} defaultValue="all">
          <SelectTrigger>
            <SelectValue placeholder="Filter by language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All languages</SelectItem>
            {languages.map(language => (
              <SelectItem key={language} value={language}>
                {language}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SearchBar;
