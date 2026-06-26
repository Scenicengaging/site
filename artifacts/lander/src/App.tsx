import { Switch, Route, Router as WouterRouter } from "wouter";
import { EXIT_SLUGS } from "@/config";
import TikTokExit from "@/pages/TikTokExit";
import AgeGate from "@/pages/AgeGate";
import Offer from "@/pages/Offer";
import Admin from "@/pages/Admin";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={AgeGate} />
      {EXIT_SLUGS.map((slug) => (
        <Route key={slug} path={`/${slug}`} component={TikTokExit} />
      ))}
      <Route path="/offer" component={Offer} />
      <Route path="/admin" component={Admin} />
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
