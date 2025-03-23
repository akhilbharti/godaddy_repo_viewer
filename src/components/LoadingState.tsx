
import { Skeleton } from "@/components/ui/skeleton";

interface LoadingStateProps {
  type: 'list' | 'detail';
  count?: number;
}

const LoadingState = ({ type, count = 8 }: LoadingStateProps) => {
  if (type === 'list') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
        {Array(count).fill(null).map((_, index) => (
          <div key={index} className="border rounded-lg p-5 bg-card animate-pulse">
            <Skeleton className="h-7 w-3/4 mb-3" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6 mb-4" />
            <div className="flex items-center mt-4">
              <Skeleton className="h-5 w-5 rounded-full mr-2" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="border rounded-xl p-6 bg-card animate-pulse max-w-3xl mx-auto">
      <Skeleton className="h-8 w-2/3 mb-4" />
      <Skeleton className="h-4 w-full mb-3" />
      <Skeleton className="h-4 w-5/6 mb-5" />
      
      <div className="flex flex-wrap gap-3 mb-6">
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
      
      <div className="space-y-4">
        <Skeleton className="h-32 w-full rounded-lg" />
        <div className="flex justify-between">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-5 w-28" />
        </div>
      </div>
    </div>
  );
};

export default LoadingState;
