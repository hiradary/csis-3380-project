const xray = require("x-ray");

const scan = xray();

const scrapeUrl = (url: string) => {
  try {
    scan(
      url,
      ".article-content"
    )((err, content) => {
      console.log({ err, content });
    });
  } catch (err) {
    return "Something unexpected happened. Please try again later!";
  }
};

export { scrapeUrl };
