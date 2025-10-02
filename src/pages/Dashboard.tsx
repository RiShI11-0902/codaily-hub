import { Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Home from "./dashboard/Home";
import CodingSheet from "./dashboard/CodingSheet";
import StartInterview from "./dashboard/StartInterview";
import Premium from "./dashboard/Premium";
import Account from "./dashboard/Account";
import Logout from "./dashboard/Logout";

const Dashboard = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 overflow-auto">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 px-6">
            <SidebarTrigger />
            <h1 className="text-2xl font-bold gradient-heading">2CodeDaily</h1>
          </header>

          <div className="p-6 transition-all duration-300">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/coding-sheet" element={<CodingSheet />} />
              <Route path="/start-interview" element={<StartInterview />} />
              <Route path="/premium" element={<Premium />} />
              <Route path="/account" element={<Account />} />
              <Route path="/logout" element={<Logout />} />
            </Routes>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
