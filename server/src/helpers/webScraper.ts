const xray = require("x-ray");

const scan = xray();

const DESIGNATED_NEWS_WEBSITES_MAP = {
  "techcrunch.com": ".article-content",
} as const;

const scrapeUrl = (url: string): Promise<string> => {
  let newsSource: keyof typeof DESIGNATED_NEWS_WEBSITES_MAP | null = null;

  for (const [key] of Object.entries(DESIGNATED_NEWS_WEBSITES_MAP)) {
    if (url.includes(key)) {
      newsSource = key as keyof typeof DESIGNATED_NEWS_WEBSITES_MAP;
    }
  }

  if (newsSource === null) {
    throw new Error("URL does not match any designated news source.");
  }

  const selector = DESIGNATED_NEWS_WEBSITES_MAP[newsSource];

  return new Promise((resolve, reject) => {
    scan(
      url,
      selector
    )((err: Error, content: string) => {
      if (err) reject(err);

      resolve(content);
    });
  });
};

export { scrapeUrl };
