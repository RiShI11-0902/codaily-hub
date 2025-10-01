import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const CodingSheet = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      try {
        // Dummy API call
        const response = await fetch('/api/coding-sheet').catch(() => ({
          ok: false,
          json: async () => ({ 
            message: "Coding sheet data loaded successfully",
            sheets: [
              { id: 1, name: "Arrays & Strings", problems: 45, completed: 23 },
              { id: 2, name: "Linked Lists", problems: 30, completed: 15 },
              { id: 3, name: "Trees & Graphs", problems: 50, completed: 8 },
              { id: 4, name: "Dynamic Programming", problems: 40, completed: 5 },
            ]
          })
        }));
        
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching coding sheet:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-12 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-40" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-4xl font-bold gradient-heading mb-2">Coding Sheet</h1>
        <p className="text-muted-foreground">Master coding problems organized by topics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data?.sheets?.map((sheet: any) => (
          <Card key={sheet.id} className="shadow-card hover:shadow-card-hover transition-all cursor-pointer">
            <CardHeader>
              <CardTitle>{sheet.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Problems</span>
                  <span className="font-semibold">{sheet.problems}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Completed</span>
                  <span className="font-semibold text-primary">{sheet.completed}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 mt-3">
                  <div 
                    className="h-2 rounded-full bg-gradient-to-r from-secondary via-primary to-accent"
                    style={{ width: `${(sheet.completed / sheet.problems) * 100}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CodingSheet;
