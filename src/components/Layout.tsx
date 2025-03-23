
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ArrowLeft, Github, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  showBackButton?: boolean;
  title?: string;
}

const Layout = ({ children, className, showBackButton = false, title }: LayoutProps) => {

  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-10 backdrop-blur-md bg-background/80 border-b border-border" role="banner">
        <div className="container mx-auto px-4 md:px-6 py-4 flex items-center">
          {showBackButton ? (
            <Link
              to="/"
              className="inline-flex items-center mr-4 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Back to repository list"
            >
              <ArrowLeft className="h-5 w-5 mr-1" aria-hidden="true" />
              <span>Back</span>
            </Link>
          ) : (
            <div className="flex items-center">
              <Github className="h-6 w-6 mr-2" aria-hidden="true" />
              <span className="font-medium text-lg">GoDaddy Repos</span>
            </div>
          )}
          
          {title && (
            <h1 className="text-xl font-semibold ml-4 truncate">{title}</h1>
          )}
          
          <div className="ml-auto flex items-center gap-4">
            
            <a
              href="https://github.com/godaddy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Visit GoDaddy GitHub page"
            >
              <Github className="h-4 w-4 mr-1" aria-hidden="true" />
              <span>GoDaddy GitHub</span>
            </a>
          </div>
        </div>
      </header>
      
      <main className={cn("flex-1 container mx-auto px-4 md:px-6 py-6", className)} id="main-content">
        {children}
      </main>
      
      <footer className="border-t border-border py-6" role="contentinfo">
        <div className="container mx-auto px-4 md:px-6 text-center text-sm text-muted-foreground">
          <p>GitHub Repository Viewer – Created with ShadCN and React</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
