import Parser from "rss-parser";
import type { FeedResponse, NewsArticle } from "../types.js";

const parser = new Parser({
  customFields: {
    item: [
      "media:content",
      "media:thumbnail",
      "content:encoded",
      "metadata:type",
      "metadata:id",
      "metadata:sponsored",
    ],
  },
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    Accept: "application/rss+xml, application/xml, text/xml, */*",
  },
});

const MAX_SUMMARY_LENGTH = 500;

function truncateSummary(summary: string | null | undefined): string | null {
  if (!summary) {
    return null;
  }
  if (summary.length > MAX_SUMMARY_LENGTH) {
    return `${summary.substring(0, MAX_SUMMARY_LENGTH)}...`;
  }
  return summary;
}

function normalizeArticle(
  item: Parser.Item,
  feedTitle: string,
  feedUrl: string,
): NewsArticle {
  // Type assertion for extended item properties
  const extendedItem = item as Parser.Item & {
    description?: string;
    id?: string;
    "dc:creator"?: string;
  };

  const summary =
    item.contentSnippet ||
    item.content?.substring(0, MAX_SUMMARY_LENGTH) ||
    extendedItem.description?.substring(0, MAX_SUMMARY_LENGTH) ||
    null;

  return {
    title: item.title || "Untitled",
    url: item.link || "",
    publishedAt: item.pubDate
      ? new Date(item.pubDate).toISOString()
      : new Date().toISOString(),
    author: item.creator || extendedItem["dc:creator"] || null,
    summary: truncateSummary(summary),
    guid: item.guid || extendedItem.id || item.link || null,
    sourceName: feedTitle || "Unknown Source",
    sourceUrl: feedUrl, // Always use the RSS feed URL for matching feed definitions
  };
}

export async function parseFeed(feedUrl: string): Promise<FeedResponse> {
  const feed = await parser.parseURL(feedUrl);

  const articles = feed.items.map((item) =>
    normalizeArticle(item, feed.title || "Unknown Feed", feed.link, feedUrl),
  );

  return {
    feed: {
      title: feed.title || "Unknown Feed",
      link: feed.link || feedUrl,
      description: feed.description || null,
    },
    articles,
  };
}
