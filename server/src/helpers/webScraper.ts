const xray = require("x-ray");

const scan = xray();

const scrapeUrl = (url: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    scan(
      url,
      ".article-content"
    )((err: Error, content: string) => {
      if (err) reject(err);

      resolve(content);
    });
  });
};

export { scrapeUrl };
