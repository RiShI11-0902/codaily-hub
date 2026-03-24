import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Medal, Crown } from "lucide-react";
import { LeaderboardUser } from "@/types/dashboard";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface LeaderboardProps {
  users: LeaderboardUser[];
  currentUser: LeaderboardUser;
  showCurrentUser: boolean;
}

export const Leaderboard = ({ users, currentUser, showCurrentUser }: LeaderboardProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedUsers = users.slice(startIndex, endIndex);

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 90) return 'text-green-600 dark:text-green-400';
    if (accuracy >= 80) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-orange-600 dark:text-orange-400';
  };

  const renderRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="h-5 w-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="h-5 w-5 text-gray-400" />;
    if (rank === 3) return <Medal className="h-5 w-5 text-amber-600" />;
    return <span className="text-sm font-semibold text-muted-foreground">#{rank}</span>;
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          Top Performers
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {paginatedUsers.map((user,index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8">
                  {renderRankIcon(startIndex + index + 1)}
                </div>
                <div>
                  <p className="font-medium">{user?.name?.charAt(0).toUpperCase() + user?.name?.slice(1)  || user.email}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-lg font-bold ${getAccuracyColor(user.avgAccuracy)}`}>
                  {user.avgAccuracy.toFixed(1)}%
                </p>
                <p className="text-xs text-muted-foreground">Avg Accuracy</p>
              </div>
            </div>
          ))}

          {showCurrentUser && (
            <>
              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-card px-2 text-muted-foreground">Your Rank</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-primary/10 border-2 border-primary">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8">
                    <span className="text-sm font-semibold text-primary">
                      #{currentUser?.rank}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-primary">{currentUser?.name?.charAt(0).toUpperCase() + currentUser?.name?.slice(1)  || currentUser?.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-bold ${getAccuracyColor(currentUser?.avgAccuracy)}`}>
                    {currentUser?.avgAccuracy.toFixed(1)}%
                  </p>
                  <p className="text-xs text-muted-foreground">Avg Accuracy</p>
                </div>
              </div>
            </>
          )}
        </div>

        {totalPages > 1 && (
          <div className="mt-6">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => setCurrentPage(page)}
                      isActive={currentPage === page}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
