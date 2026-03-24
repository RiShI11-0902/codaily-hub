import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Protected from "./components/auth/Protected"

import Home from "./pages/Home";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import Shipping from "./pages/Shipping";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard"; 
import Privacy from "./pages/Privacy"
import Contact from "./pages/Contact"
import Refunds from "./pages/Refunds"
import TermsConditions from "./pages/TermsConditions"
import AuthenticateExtension from './pages/AuthenticateExtension'

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/sign-in" element={<Layout><AuthPage /></Layout>} />
            <Route path="/about" element={<Layout><About /></Layout>} />
            <Route path="/pricing" element={<Layout><Pricing /></Layout>} />
            <Route path="/shipping" element={<Layout><Shipping /></Layout>} />
            <Route path="/privacy-policy" element={<Layout><Privacy /></Layout>} />
            <Route path='//authenticate-extension' element={<AuthenticateExtension />} />
            <Route path="/terms-conditions" element={<Layout><TermsConditions /></Layout>} />
            <Route path="/refunds" element={<Layout><Refunds/></Layout>} />
            <Route path="/contact-us" element={<Layout><Contact/></Layout>} />
            <Route path="/dashboard/*" element={ <Protected><Dashboard /></Protected>} />
            <Route path="*" element={<Layout><NotFound /></Layout>} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
