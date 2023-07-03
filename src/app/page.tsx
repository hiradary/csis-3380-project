"use client";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Home() {
  const [url, setUrl] = useState(
    "https://techcrunch.com/2023/07/03/tweetdeck-suffers-as-musk-enforces-read-limits-on-twitter/"
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const result = await (
      await fetch("/api", {
        method: "POST",
        body: JSON.stringify({ url }),
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).json();

    console.log({ result });
    // scrapeUrl(url);
  };

  return (
    <main className="min-h-screen bg-gray-200 py-6 flex flex-col justify-center sm:py-12 items-center">
      <div className="relative py-3">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-semibold">News Analysis</h1>
            <form
              onSubmit={handleSubmit}
              className="mt-8 flex items-center gap-2 border-b-0"
            >
              <input
                type="text"
                placeholder="Enter the news URL here..."
                value={url}
                onChange={handleInputChange}
                className="border rounded-lg p-2 w-full"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
              >
                Analyze
              </button>
            </form>
            <div className="pt-8 text-base leading-6 font-medium text-gray-500">
              <p>
                Please enter a URL for a news article in the input above. Our
                tool will analyze the contents of the article, providing a
                comprehensive breakdown of its key points and sentiments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
