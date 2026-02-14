import {
  createRootRoute,
  Link,
  Outlet,
  useLocation,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Logo } from "@/components/Logo";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createRootRoute({
  component: RootComponent,
});

const PATH_TO_TAB: Record<string, string> = {
  "/": "dashboard",
  "/news": "news",
  "/pnl": "pnl",
};

function RootComponent() {
  const location = useLocation();
  const activeTab = PATH_TO_TAB[location.pathname] ?? "dashboard";

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border/70 bg-card">
        <div className="container mx-auto flex flex-wrap items-center gap-6 px-4 py-3">
          <Logo />
          <Tabs value={activeTab} className="w-auto">
            <TabsList>
              <TabsTrigger value="dashboard" asChild>
                <Link
                  to="/"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Dashboard
                </Link>
              </TabsTrigger>
              <TabsTrigger value="news" asChild>
                <Link
                  to="/news"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  News
                </Link>
              </TabsTrigger>
              <TabsTrigger value="pnl" asChild>
                <Link
                  to="/pnl"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  PNL
                </Link>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
      {import.meta.env.DEV && <TanStackRouterDevtools />}
    </div>
  );
}
