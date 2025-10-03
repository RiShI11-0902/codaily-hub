import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Trophy, Calendar, TrendingUp, ArrowLeft, Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface GroupMember {
  id: string;
  name: string;
  daysCompleted: number;
  currentStreak: number;
  joinedDate: string;
  avatar: string;
}

interface Group {
  id: string;
  name: string;
  targetDays: number;
  memberCount: number;
  createdBy: string;
  isOwner: boolean;
  isMember: boolean;
  members: GroupMember[];
}

const dummyGroups: Group[] = [
  {
    id: "1",
    name: "100 Days of Code Challenge",
    targetDays: 100,
    memberCount: 24,
    createdBy: "You",
    isOwner: true,
    isMember: true,
    members: [
      { id: "1", name: "Alex Chen", daysCompleted: 87, currentStreak: 45, joinedDate: "2024-01-15", avatar: "AC" },
      { id: "2", name: "Sarah Johnson", daysCompleted: 76, currentStreak: 32, joinedDate: "2024-02-01", avatar: "SJ" },
      { id: "3", name: "Mike Peterson", daysCompleted: 65, currentStreak: 28, joinedDate: "2024-02-10", avatar: "MP" },
      { id: "4", name: "Emily Davis", daysCompleted: 54, currentStreak: 22, joinedDate: "2024-02-20", avatar: "ED" },
      { id: "5", name: "John Smith", daysCompleted: 43, currentStreak: 18, joinedDate: "2024-03-01", avatar: "JS" },
    ]
  },
  {
    id: "2",
    name: "50 Days DSA Bootcamp",
    targetDays: 50,
    memberCount: 18,
    createdBy: "John Doe",
    isOwner: false,
    isMember: true,
    members: [
      { id: "6", name: "Rachel Green", daysCompleted: 42, currentStreak: 30, joinedDate: "2024-02-15", avatar: "RG" },
      { id: "7", name: "You", daysCompleted: 38, currentStreak: 25, joinedDate: "2024-02-20", avatar: "YO" },
      { id: "8", name: "David Miller", daysCompleted: 35, currentStreak: 20, joinedDate: "2024-02-25", avatar: "DM" },
      { id: "9", name: "Lisa Anderson", daysCompleted: 31, currentStreak: 18, joinedDate: "2024-03-01", avatar: "LA" },
    ]
  },
  {
    id: "3",
    name: "30 Days of JavaScript",
    targetDays: 30,
    memberCount: 32,
    createdBy: "Jane Smith",
    isOwner: false,
    isMember: false,
    members: [
      { id: "10", name: "Chris Brown", daysCompleted: 28, currentStreak: 28, joinedDate: "2024-03-01", avatar: "CB" },
      { id: "11", name: "Anna Taylor", daysCompleted: 25, currentStreak: 22, joinedDate: "2024-03-05", avatar: "AT" },
      { id: "12", name: "Tom Wilson", daysCompleted: 22, currentStreak: 19, joinedDate: "2024-03-08", avatar: "TW" },
    ]
  },
  {
    id: "4",
    name: "75 Hard Coding Challenge",
    targetDays: 75,
    memberCount: 15,
    createdBy: "Bob Lee",
    isOwner: false,
    isMember: false,
    members: [
      { id: "13", name: "Kevin White", daysCompleted: 58, currentStreak: 35, joinedDate: "2024-01-20", avatar: "KW" },
      { id: "14", name: "Maria Garcia", daysCompleted: 52, currentStreak: 30, joinedDate: "2024-01-25", avatar: "MG" },
    ]
  }
];

const Groups = () => {
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

  const myGroups = dummyGroups.filter(g => g.isOwner || g.isMember);
  const browseGroups = dummyGroups.filter(g => !g.isMember);

  const handleGroupClick = (group: Group) => {
    setSelectedGroup(group);
  };

  const handleBack = () => {
    setSelectedGroup(null);
  };

  if (selectedGroup) {
    // Sort members by days completed (descending)
    const sortedMembers = [...selectedGroup.members].sort((a, b) => b.daysCompleted - a.daysCompleted);

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold gradient-heading">{selectedGroup.name}</h1>
            <p className="text-muted-foreground">
              Target: {selectedGroup.targetDays} days • {selectedGroup.memberCount} members
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Leaderboard</CardTitle>
            <CardDescription>Members ranked by completion progress</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">Rank</TableHead>
                  <TableHead>Member</TableHead>
                  <TableHead>Days Completed</TableHead>
                  <TableHead>Current Streak</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Joined</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedMembers.map((member, index) => {
                  const progressPercent = Math.round((member.daysCompleted / selectedGroup.targetDays) * 100);
                  return (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">
                        {index === 0 && <Trophy className="h-5 w-5 text-yellow-500 inline mr-2" />}
                        #{index + 1}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
                            {member.avatar}
                          </div>
                          <span className="font-medium">{member.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{member.daysCompleted}/{selectedGroup.targetDays}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-orange-500" />
                          {member.currentStreak} days
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary transition-all"
                              style={{ width: `${progressPercent}%` }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground">{progressPercent}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {new Date(member.joinedDate).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold gradient-heading">Groups</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Group
        </Button>
      </div>

      <Tabs defaultValue="my-groups" className="space-y-6">
        <TabsList>
          <TabsTrigger value="my-groups">My Groups</TabsTrigger>
          <TabsTrigger value="browse">Browse Groups</TabsTrigger>
        </TabsList>

        <TabsContent value="my-groups" className="space-y-4">
          {myGroups.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Users className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">You haven't joined any groups yet</p>
                <Button variant="outline" className="mt-4">Browse Groups</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {myGroups.map((group) => (
                <Card 
                  key={group.id} 
                  className="cursor-pointer hover:shadow-lg transition-all hover:scale-105"
                  onClick={() => handleGroupClick(group)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{group.name}</CardTitle>
                      {group.isOwner && (
                        <Badge variant="secondary">Owner</Badge>
                      )}
                    </div>
                    <CardDescription>Target: {group.targetDays} days</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{group.memberCount} members</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Created by {group.createdBy}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="browse" className="space-y-4">
          {browseGroups.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Users className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No groups available to join</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {browseGroups.map((group) => (
                <Card 
                  key={group.id}
                  className="cursor-pointer hover:shadow-lg transition-all hover:scale-105"
                  onClick={() => handleGroupClick(group)}
                >
                  <CardHeader>
                    <CardTitle className="text-lg">{group.name}</CardTitle>
                    <CardDescription>Target: {group.targetDays} days</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{group.memberCount} members</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Created by {group.createdBy}</span>
                    </div>
                    <Button className="w-full mt-2" onClick={(e) => {
                      e.stopPropagation();
                    }}>
                      Join Group
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Groups;
