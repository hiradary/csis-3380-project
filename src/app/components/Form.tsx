import { useState } from "react";
import toast from "react-hot-toast";

const Form = () => {
  const [url, setUrl] = useState(
    "https://techcrunch.com/2023/07/03/tweetdeck-suffers-as-musk-enforces-read-limits-on-twitter/"
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUrl(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const result = await (
      await fetch("http://localhost:5003/api/v1/analyze", {
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
    <div className="relative py-3">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
      <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-semibold">News Analysis</h1>
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col gap-2 border-b-0"
          >
            <textarea
              placeholder="Enter the news text or url here"
              value={url}
              onChange={handleInputChange}
              className="border rounded-lg p-2 w-full"
              rows={2}
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
              Please enter a URL for a news article in the input above. Our tool
              will analyze the contents of the article, providing a
              comprehensive breakdown of its key points and sentiments.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
