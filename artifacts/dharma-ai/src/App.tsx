import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import Home from "@/pages/Home";
import Library from "@/pages/Library";
import TopicReader from "@/pages/TopicReader";
import Consult from "@/pages/Consult";
import Directory from "@/pages/Directory";
import LawyerProfile from "@/pages/LawyerProfile";
import MatchWizard from "@/pages/MatchWizard";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/library" component={Library} />
      <Route path="/library/:topicSlug" component={TopicReader} />
      <Route path="/consult" component={Consult} />
      <Route path="/directory" component={Directory} />
      <Route path="/directory/:id" component={LawyerProfile} />
      <Route path="/match" component={MatchWizard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
