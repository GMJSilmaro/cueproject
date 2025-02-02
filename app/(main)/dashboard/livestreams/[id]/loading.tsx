import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export default function StreamLoading() {
  return (
    <div className="container max-w-[1500px] py-6">
      <div className="grid lg:grid-cols-[1fr,380px] gap-6">
        {/* Main Content */}
        <div className="space-y-4">
          <Card className="overflow-hidden">
            <div className="aspect-video bg-muted" />
          </Card>
          
          <div className="space-y-2">
            <Skeleton className="h-8 w-2/3" />
            <Skeleton className="h-4 w-full" />
          </div>

          {/* Stream Info */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </div>

          {/* Comments Section Loading */}
          <div className="space-y-4 pt-6">
            <Skeleton className="h-6 w-32" />
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Loading */}
        <div className="lg:h-[calc(100vh-8rem)] bg-card rounded-xl border border-border p-4">
          <div className="space-y-4">
            <Skeleton className="h-6 w-24" />
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex gap-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div className="space-y-1 flex-1">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-3 w-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 