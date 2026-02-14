export type Leaning = "left" | "center" | "right";

export interface FeedDefinition {
  id: string;
  name: string;
  url: string;
  leaning?: Leaning;
  industries?: string[];
  regions?: string[];
}

export interface NewsArticle {
  title: string;
  url: string;
  publishedAt: string; // ISO string
  author: string | null;
  summary: string | null;
  guid: string | null;
  sourceName: string;
  sourceUrl: string;
}

export type DateRange = "5m" | "15m" | "30m" | "45m" | "1h" | "24h" | "7d" | "30d";

export interface NewsFilters {
  industries?: string[];
  sources?: string[];
  leanings?: Leaning[];
  dateRange?: DateRange;
  searchQuery?: string;
  sortBy?: "newest" | "source";
}

export interface FeedResponse {
  feed: {
    title: string;
    link: string;
    description: string | null;
  };
  articles: NewsArticle[];
}
