import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, ExternalLink } from "lucide-react";

const CodingSheet = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [selectedSheet, setSelectedSheet] = useState<any>(null);

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
        
        const result = {
          message: "Coding sheet data loaded successfully",
          sheets: [
            { 
              id: 1, 
              name: "Arrays & Strings", 
              problems: 45, 
              completed: 23,
              questions: [
                { title: "Remove Duplicates from Sorted Array", id: 26, url: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/" },
                { title: "Two Sum", id: 1, url: "https://leetcode.com/problems/two-sum/" },
                { title: "Valid Anagram", id: 242, url: "https://leetcode.com/problems/valid-anagram/" },
                { title: "Contains Duplicate", id: 217, url: "https://leetcode.com/problems/contains-duplicate/" },
              ]
            },
            { 
              id: 2, 
              name: "Linked Lists", 
              problems: 30, 
              completed: 15,
              questions: [
                { title: "Reverse Linked List", id: 206, url: "https://leetcode.com/problems/reverse-linked-list/" },
                { title: "Merge Two Sorted Lists", id: 21, url: "https://leetcode.com/problems/merge-two-sorted-lists/" },
              ]
            },
            { 
              id: 3, 
              name: "Trees & Graphs", 
              problems: 50, 
              completed: 8,
              questions: [
                { title: "Binary Tree Inorder Traversal", id: 94, url: "https://leetcode.com/problems/binary-tree-inorder-traversal/" },
                { title: "Maximum Depth of Binary Tree", id: 104, url: "https://leetcode.com/problems/maximum-depth-of-binary-tree/" },
              ]
            },
            { 
              id: 4, 
              name: "Dynamic Programming", 
              problems: 40, 
              completed: 5,
              questions: [
                { title: "Climbing Stairs", id: 70, url: "https://leetcode.com/problems/climbing-stairs/" },
                { title: "House Robber", id: 198, url: "https://leetcode.com/problems/house-robber/" },
              ]
            },
          ]
        };
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

  if (selectedSheet) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => setSelectedSheet(null)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-4xl font-bold gradient-heading mb-2">{selectedSheet.name}</h1>
            <p className="text-muted-foreground">{selectedSheet.completed} of {selectedSheet.problems} problems completed</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Problems</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead className="text-right">Link</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedSheet.questions?.map((question: any) => (
                  <TableRow key={question.id}>
                    <TableCell className="font-medium">{question.id}</TableCell>
                    <TableCell>{question.title}</TableCell>
                    <TableCell className="text-right">
                      <a 
                        href={question.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-primary hover:underline"
                      >
                        Solve <ExternalLink className="h-4 w-4" />
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
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
          <Card 
            key={sheet.id} 
            className="shadow-card hover:shadow-card-hover transition-all cursor-pointer"
            onClick={() => setSelectedSheet(sheet)}
          >
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
