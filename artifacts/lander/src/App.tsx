import { Switch, Route, Router as WouterRouter } from "wouter";
import TikTokExit from "@/pages/TikTokExit";
import AgeGate from "@/pages/AgeGate";
import Offer from "@/pages/Offer";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";
import NotFound from "@/pages/not-found";

// ─── Add or remove exit-page slugs here ───────────────────────────────────────
const EXIT_SLUGS = [
  "go",
  "start",
  "tiktok",
  "exit",
];
// ──────────────────────────────────────────────────────────────────────────────

function Router() {
  return (
    <Switch>
      {/* Default landing page */}
      <Route path="/" component={AgeGate} />

      {/* Exit / browser-escape page — one route per slug */}
      {EXIT_SLUGS.map((slug) => (
        <Route key={slug} path={`/${slug}`} component={TikTokExit} />
      ))}

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
