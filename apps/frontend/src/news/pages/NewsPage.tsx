import { useState } from "react";
import { FilterPanel } from "../components/FilterPanel";
import { NewsList } from "../components/NewsList";
import type { NewsFilters } from "../types";

export function NewsPage() {
  const [filters, setFilters] = useState<NewsFilters>({
    dateRange: "24h",
    sortBy: "newest",
  });

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        <aside className="lg:sticky lg:top-6 lg:h-fit">
          <FilterPanel filters={filters} onFiltersChange={setFilters} />
        </aside>

        <main className="flex flex-col">
          <NewsList filters={filters} />
        </main>
      </div>
    </div>
  );
}
