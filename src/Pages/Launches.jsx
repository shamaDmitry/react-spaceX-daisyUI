import { XCircleIcon } from "@heroicons/react/24/solid";
import useSWR from "swr";
import { fetcher } from "../helpers/fetcher";

const Launches = () => {
  const { data, error, isLoading } = useSWR("/v5/launches/upcoming", fetcher);

  return (
    <div className="container">
      <h1 className="text-2xl mb-8 font-bold dark:text-white">
        Launches:
      </h1>

      {isLoading && <div className="text-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>}

      {error && <div className="alert alert-error dark:text-white">
        <XCircleIcon className="h-6 w-6 text-dark" />
        <span>Error! Task failed successfully.</span>
      </div>}

      <section className="grid grid-cols-3 gap-4">
        {
          data?.map(item => {
            return (
              <div key={item.id} className="card border w-full bg-base-100 shadow-lg dark:border-gray-700 dark:text-white">
                {/* <figure><img src={item.image} alt={item.name} /></figure> */}

                <div className="card-body">
                  <h2 className="card-title">
                    {item.name}
                  </h2>

                  <div className="dark:text-gray-400">
                    {item.details}
                  </div>
                </div>
              </div>
            )
          })
        }
      </section>
    </div>
  );
}

export default Launches;
