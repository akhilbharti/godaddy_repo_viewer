
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Repository, languageColors } from "@/lib/types";
import { Archive, Calendar, Code, Copy, ExternalLink, Eye, GitFork, GitMerge, Github, Star } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useState, useEffect } from "react";

interface RepoDetailsProps {
  repo: Repository;
}

const RepoDetails = ({ repo }: RepoDetailsProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const languageColor = repo.language 
    ? languageColors[repo.language] || languageColors.unknown
    : languageColors.unknown;
  
  useEffect(() => {
    // Check if repo is in favorites
    const storedFavorites = localStorage.getItem("favoriteRepos");
    if (storedFavorites) {
      const favorites = JSON.parse(storedFavorites);
      setIsFavorite(favorites.includes(repo.id));
    }
  }, [repo.id]);
  
  const toggleFavorite = () => {
    const storedFavorites = localStorage.getItem("favoriteRepos");
    let favorites: number[] = [];
    
    if (storedFavorites) {
      favorites = JSON.parse(storedFavorites);
    }
    
    if (favorites.includes(repo.id)) {
      favorites = favorites.filter(id => id !== repo.id);
      setIsFavorite(false);
    } else {
      favorites.push(repo.id);
      setIsFavorite(true);
    }
    
    localStorage.setItem("favoriteRepos", JSON.stringify(favorites));
  };

  // Get repository type badge
  const getRepoTypeBadge = () => {
    if (repo.archived) {
      return <Badge variant="outline" className="bg-gray-100"><Archive className="h-3 w-3 mr-1" />Archived</Badge>;
    } else if (repo.fork) {
      return <Badge variant="outline" className="bg-blue-50"><GitFork className="h-3 w-3 mr-1" />Fork</Badge>;
    } else if (repo.mirror) {
      return <Badge variant="outline" className="bg-purple-50"><GitMerge className="h-3 w-3 mr-1" />Mirror</Badge>;
    } else if (repo.is_template) {
      return <Badge variant="outline" className="bg-green-50"><Copy className="h-3 w-3 mr-1" />Template</Badge>;
    } else {
      return <Badge variant="outline" className="bg-amber-50"><Code className="h-3 w-3 mr-1" />Source</Badge>;
    }
  };
    
  return (
    <div className="max-w-3xl mx-auto animate-fade-up space-y-6">
      <Card className="overflow-hidden">
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center flex-wrap gap-2">
              <CardTitle className="text-2xl font-semibold mr-2">{repo.name}</CardTitle>
              {getRepoTypeBadge()}
              <Badge variant="outline" className="capitalize">{repo.visibility}</Badge>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0 rounded-full"
                onClick={toggleFavorite}
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                <Star 
                  className={`h-5 w-5 transition-all ${isFavorite ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground'}`} 
                />
              </Button>
              <Button asChild size="sm" className="gap-1.5">
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                  <span>View on GitHub</span>
                </a>
              </Button>
            </div>
          </div>
          <CardDescription className="text-base mt-1">
            {repo.description || "No description provided"}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="flex flex-wrap gap-3">
            {repo.language && (
              <Badge variant="outline" className="px-3 py-1.5 bg-secondary flex items-center">
                <span 
                  className="w-2.5 h-2.5 rounded-full mr-1.5" 
                  style={{ backgroundColor: languageColor }}
                />
                <span>{repo.language}</span>
              </Badge>
            )}
            
            {repo.topics && repo.topics.length > 0 && (
              repo.topics.slice(0, 5).map(topic => (
                <Badge key={topic} variant="secondary" className="px-3 py-1.5">
                  {topic}
                </Badge>
              ))
            )}
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-secondary rounded-lg p-3 text-center">
              <div className="flex justify-center">
                <Star className={`h-5 w-5 ${isFavorite ? 'text-amber-500' : 'text-amber-500'} mb-1`} />
              </div>
              <div className="text-lg font-medium">{repo.stargazers_count}</div>
              <div className="text-xs text-muted-foreground">Stars</div>
            </div>
            
            <div className="bg-secondary rounded-lg p-3 text-center">
              <div className="flex justify-center">
                <GitFork className="h-5 w-5 text-blue-500 mb-1" />
              </div>
              <div className="text-lg font-medium">{repo.forks_count}</div>
              <div className="text-xs text-muted-foreground">Forks</div>
            </div>
            
            <div className="bg-secondary rounded-lg p-3 text-center">
              <div className="flex justify-center">
                <Code className="h-5 w-5 text-green-500 mb-1" />
              </div>
              <div className="text-lg font-medium">{repo.open_issues_count}</div>
              <div className="text-xs text-muted-foreground">Issues</div>
            </div>
            
            <div className="bg-secondary rounded-lg p-3 text-center">
              <div className="flex justify-center">
                <Eye className="h-5 w-5 text-purple-500 mb-1" />
              </div>
              <div className="text-lg font-medium">{repo.watchers_count}</div>
              <div className="text-xs text-muted-foreground">Watchers</div>
            </div>
          </div>
          
          <Separator />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-muted-foreground mb-1 flex items-center">
                <Calendar className="h-3.5 w-3.5 mr-1.5" />
                Created
              </div>
              <div>{formatDistanceToNow(new Date(repo.created_at), { addSuffix: true })}</div>
            </div>
            
            <div>
              <div className="text-muted-foreground mb-1 flex items-center">
                <Calendar className="h-3.5 w-3.5 mr-1.5" />
                Last updated
              </div>
              <div>{formatDistanceToNow(new Date(repo.updated_at), { addSuffix: true })}</div>
            </div>
            
            {repo.homepage && (
              <div className="sm:col-span-2">
                <div className="text-muted-foreground mb-1 flex items-center">
                  <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                  Homepage
                </div>
                <a 
                  href={repo.homepage} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline truncate inline-block max-w-full"
                >
                  {repo.homepage}
                </a>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RepoDetails;
