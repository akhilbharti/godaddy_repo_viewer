
import { Repository } from "@/lib/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Archive, Code, Copy, Eye, GitFork, GitMerge, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { languageColors } from "@/lib/types";

interface RepoTableProps {
  repos: Repository[];
  favorites: number[];
  onToggleFavorite: (repoId: number) => void;
  onLanguageClick: (language: string) => void;
}

const RepoTable = ({ repos, favorites, onToggleFavorite, onLanguageClick }: RepoTableProps) => {
  if (repos.length === 0) {
    return (
      <div className="text-center py-12 animate-fade-in" role="status" aria-live="polite">
        <h3 className="text-lg font-medium mb-2">No repositories found</h3>
        <p className="text-muted-foreground">
          Try adjusting your search or filter criteria
        </p>
      </div>
    );
  }
  
  // Function to get the appropriate badge for repo type
  const getRepoTypeBadge = (repo: Repository) => {
    if (repo.archived) {
      return <Badge variant="outline" className="ml-1 bg-gray-100"><Archive className="h-3 w-3 mr-1" aria-hidden="true" />Archived</Badge>;
    } else if (repo.fork) {
      return <Badge variant="outline" className="ml-1 bg-blue-50"><GitFork className="h-3 w-3 mr-1" aria-hidden="true" />Fork</Badge>;
    } else if (repo.mirror) {
      return <Badge variant="outline" className="ml-1 bg-purple-50"><GitMerge className="h-3 w-3 mr-1" aria-hidden="true" />Mirror</Badge>;
    } else if (repo.is_template) {
      return <Badge variant="outline" className="ml-1 bg-green-50"><Copy className="h-3 w-3 mr-1" aria-hidden="true" />Template</Badge>;
    } else {
      return <Badge variant="outline" className="ml-1 bg-amber-50"><Code className="h-3 w-3 mr-1" aria-hidden="true" />Source</Badge>;
    }
  };

  return (
    <div className="w-full overflow-auto animate-fade-in">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Language</TableHead>
            <TableHead className="text-center">Stars</TableHead>
            <TableHead className="text-center">Forks</TableHead>
            <TableHead className="text-center">Watchers</TableHead>
            <TableHead className="text-center">Favorite</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {repos.map((repo) => {
            const isFavorite = favorites.includes(repo.id);
            const languageColor = repo.language 
              ? languageColors[repo.language] || languageColors.unknown
              : languageColors.unknown;
              
            return (
              <TableRow key={repo.id}>
                <TableCell className="font-medium">
                  <div className="flex flex-col">
                    <Link 
                      to={`/repo/${repo.name}`} 
                      className="hover:text-primary transition-colors"
                      aria-label={`View details for ${repo.name}`}
                    >
                      {repo.name}
                    </Link>
                    <span className="text-xs text-muted-foreground">{repo.visibility}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {getRepoTypeBadge(repo)}
                </TableCell>
                <TableCell className="max-w-md truncate">
                  {repo.description || "No description provided"}
                </TableCell>
                <TableCell>
                  {repo.language && (
                    <Badge 
                      variant="outline" 
                      className="cursor-pointer hover:bg-secondary transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onLanguageClick(repo.language!);
                      }}
                    >
                      <span 
                        className="w-3 h-3 rounded-full mr-1.5" 
                        style={{ backgroundColor: languageColor }}
                        aria-hidden="true"
                      />
                      <span className="text-xs font-medium">{repo.language}</span>
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-center" aria-label={`${repo.stargazers_count} stars`}>
                  {repo.stargazers_count}
                </TableCell>
                <TableCell className="text-center" aria-label={`${repo.forks_count} forks`}>
                  {repo.forks_count}
                </TableCell>
                <TableCell className="text-center" aria-label={`${repo.watchers_count} watchers`}>
                  {repo.watchers_count}
                </TableCell>
                <TableCell className="text-center">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0 rounded-full"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onToggleFavorite(repo.id);
                    }}
                    aria-label={isFavorite ? `Remove ${repo.name} from favorites` : `Add ${repo.name} to favorites`}
                  >
                    <Star 
                      className={`h-5 w-5 transition-all ${isFavorite ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground'}`} 
                      aria-hidden="true"
                    />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default RepoTable;
