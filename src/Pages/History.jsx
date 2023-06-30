import TimelineList from "../Components/HistoryPage/TimelineList";

const History = () => {
  return (
    <div className="container max-w-3xl">
      <h1 className="text-2xl mb-8 font-bold dark:text-white">
        History:
      </h1>

      <TimelineList />
    </div>
  );
}

export default History;
