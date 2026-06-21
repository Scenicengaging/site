import { Switch, Route, Router as WouterRouter } from "wouter";
import TikTokExit from "@/pages/TikTokExit";
import AgeGate from "@/pages/AgeGate";
import Offer from "@/pages/Offer";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={TikTokExit} />
      <Route path="/verify" component={AgeGate} />
      <Route path="/offer" component={Offer} />
      <Route path="/terms" component={Terms} />
      <Route path="/privacy" component={Privacy} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <Router />
    </WouterRouter>
  );
}

export default App;
