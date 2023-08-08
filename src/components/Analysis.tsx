import ProgressBar from "@ramonak/react-progress-bar";
import useAppStore from "@/hooks/useAppStore";

const getSentimentColor = (value: number) => {
  if (value <= 33) {
    return "#dc2626";
  } else if (value <= 66) {
    return "#f59e0b";
  } else {
    return "#16a34a";
  }
};

const Analysis = () => {
  const { currentNews } = useAppStore();
  if (!currentNews) return null;

  const { highlights, openQuestions, sentiment } = currentNews;

  return (
    <div className="w-[40rem] bg-white px-4 py-10 sm:rounded-3xl">
      <section className="mb-6">
        <h3 className="text-2xl font-semibold">Highlights</h3>
        <p className="text-left pt-2">{highlights}</p>
      </section>
      <section className="mb-6">
        <h3 className="text-2xl font-semibold">Sentiment</h3>
        <div className="pt-2">
          <ProgressBar
            completed={sentiment}
            bgColor={getSentimentColor(sentiment)}
          />
        </div>
      </section>
      <section className="mb-6">
        <h3 className="text-2xl font-semibold">Open questions?</h3>

        <ul className="pt-2 pl-4">
          {openQuestions.map((item) => (
            <li className="list-disc mb-2" key={item}>
              {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Analysis;
