
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Repository, languageColors } from "@/lib/types";
import { Eye, GitFork, Star, Archive, Code, Copy, GitMerge } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface RepoCardProps {
  repo: Repository;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onLanguageClick: (language: string) => void;
}

const RepoCard = ({ repo, isFavorite, onToggleFavorite, onLanguageClick }: RepoCardProps) => {
  const languageColor = repo.language 
    ? languageColors[repo.language] || languageColors.unknown
    : languageColors.unknown;
    
  const handleLanguageClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (repo.language) {
      onLanguageClick(repo.language);
    }
  };
  
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite();
  };

  // Determine repository type for badge
  const getRepoTypeBadge = () => {
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
    <Link to={`/repo/${repo.name}`} aria-label={`View details for ${repo.name}`}>
      <Card className="h-full transition-all duration-300 hover:shadow-md hover:border-primary/20 hover:-translate-y-1 group">
        <CardHeader className="pb-2 flex flex-row justify-between items-start">
          <div>
            <CardTitle className="truncate text-lg font-medium group-hover:text-primary transition-colors flex items-center gap-1">
              {repo.name}
              <span className="text-xs ml-1">{getRepoTypeBadge()}</span>
            </CardTitle>
            <div className="text-xs text-muted-foreground mt-1">{repo.visibility}</div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0 rounded-full"
            onClick={handleFavoriteClick}
            aria-label={isFavorite ? `Remove ${repo.name} from favorites` : `Add ${repo.name} to favorites`}
          >
            <Star 
              className={`h-5 w-5 transition-all ${isFavorite ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground'}`}
              aria-hidden="true"
            />
          </Button>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm line-clamp-2 h-10 mb-3">
            {repo.description || "No description provided"}
          </p>
          
          <div className="flex items-center">
            {repo.language && (
              <Badge 
                variant="outline" 
                className="cursor-pointer hover:bg-secondary transition-colors"
                onClick={handleLanguageClick}
              >
                <span 
                  className="w-3 h-3 rounded-full mr-1.5" 
                  style={{ backgroundColor: languageColor }}
                  aria-hidden="true"
                />
                <span className="text-xs font-medium">{repo.language}</span>
              </Badge>
            )}
          </div>
        </CardContent>
        <CardFooter className="pt-0 text-xs text-muted-foreground flex justify-between">
          <div className="flex gap-4">
            <div className="flex items-center" aria-label={`${repo.stargazers_count} stars`}>
              <Star className="h-3.5 w-3.5 mr-1" aria-hidden="true" />
              <span>{repo.stargazers_count}</span>
            </div>
            <div className="flex items-center" aria-label={`${repo.forks_count} forks`}>
              <GitFork className="h-3.5 w-3.5 mr-1" aria-hidden="true" />
              <span>{repo.forks_count}</span>
            </div>
            <div className="flex items-center" aria-label={`${repo.watchers_count} watchers`}>
              <Eye className="h-3.5 w-3.5 mr-1" aria-hidden="true" />
              <span>{repo.watchers_count}</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default RepoCard;
