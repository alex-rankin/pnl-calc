import { createFileRoute } from "@tanstack/react-router";
import { NewsTapeWidget } from "@/news/components/NewsTapeWidget";

export const Route = createFileRoute("/")({
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <NewsTapeWidget />
    </div>
  );
}
