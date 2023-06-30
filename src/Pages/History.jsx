import TimelineList from "../Components/HistoryPage/TimelineList";

const History = () => {
  return (
    <div className="container">
      <h1 className="text-2xl mb-8 font-bold dark:text-white">
        History:
      </h1>

      <div className="max-w-3xl mx-auto">
        <TimelineList />
      </div>
    </div>
  );
}

export default History;
