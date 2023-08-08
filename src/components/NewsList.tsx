import useAppStore from "@/hooks/useAppStore";
import { type News } from "@/providers/useAppStore";
import PulseLoader from "react-spinners/PulseLoader";
import { useEffect, useState } from "react";

const NewsList = () => {
  const [loading, setLoading] = useState(true);
  const { setNewsHistory, newsHistory, setCurrentNews } = useAppStore();

  const fetchNewsList = async () => {
    setLoading(true);

    try {
      const newsList = (
        await (
          await fetch("http://localhost:5003/api/v1/news", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
        ).json()
      ).data as News[];

      setNewsHistory(newsList);
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleNewsSelection = (newsData: News) => {
    setCurrentNews(newsData);
  };

  useEffect(() => {
    fetchNewsList();
  }, []);

  return (
    <section className="w-full relative">
      <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-light-blue-500 shadow-lg transform skew-y-3 sm:skew-y-3 sm:rotate-1 sm:rounded-3xl"></div>
      <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20 flex flex-col">
        <h2 className="text-2xl font-semibold mb-4">Analysis History</h2>

        {loading && <PulseLoader />}

        <div className="w-full flex items-baseline flex-wrap gap-4">
          {newsHistory.map((item) => (
            <div
              key={item._id ?? item.title}
              className="max-w-sm p- border border-gray-200 rounded-lg shadow hover:bg-gray-100 cursor-pointer p-4"
              onClick={() => handleNewsSelection(item)}
            >
              <h5 className="text-lg tracking-tight text-gray-90">
                {item.title}
              </h5>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsList;
