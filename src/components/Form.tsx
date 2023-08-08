import useAppStore from "@/hooks/useAppStore";
import { type News } from "@/providers/useAppStore";
import { useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";

const Form = () => {
  const { setCurrentNews, setNewsHistory } = useAppStore();
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    if (loading) return;

    event.preventDefault();
    setLoading(true);

    try {
      const newsAnalysis = (
        await (
          await fetch("http://localhost:5003/api/v1/analyze", {
            method: "POST",
            body: JSON.stringify({ content: text }),
            headers: {
              "Content-Type": "application/json",
            },
          })
        ).json()
      ).data as News;

      setCurrentNews(newsAnalysis);
      //@ts-expect-error
      setNewsHistory((currentVal) => [...currentVal, newsAnalysis]);
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
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
              rows={3}
              placeholder="Enter the news text or url here"
              value={text}
              onChange={handleInputChange}
              className="border rounded-lg p-2 w-full max-h-60 min-h-40"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
              disabled={loading}
            >
              {loading ? <PulseLoader color="white" /> : <span>Analyze</span>}
            </button>
          </form>
          <p className="pt-8 text-base leading-6 font-medium text-gray-500">
            Our tool will analyze the content of the article, providing a
            comprehensive breakdown of its key points and sentiments.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Form;
