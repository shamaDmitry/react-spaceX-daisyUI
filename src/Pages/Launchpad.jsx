import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";

import BackLink from "../Components/base/BackLink";
import ErrorAlert from "../Components/base/ErrorAlert";
import Loader from "../Components/base/Loader";
import { fetcher } from "../helpers/fetcher";
import { postFetcher } from "../helpers/fetchers";

const Container = ({ children }) => {
  return (
    <div className="container">
      {children}
    </div>
  )
}

const Launchpad = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [query, setQuery] = useState({
    _id: params.id
  });

  const [options, setOptions] = useState({
    populate: "launches"
  });

  const { data, isLoading, error } = useSWR({ url: '/v4/launchpads/query', query: query, options: options }, postFetcher);


  if (isLoading) return (
    <Container>
      <Loader />
    </Container>
  )

  if (error) return (
    <ErrorAlert
      text="Data fetch is failed"
    />
  )
  const [launchpad] = data.docs;
  console.log(launchpad);

  return (
    <Container>
      <div className="mb-4">
        <BackLink
          text="Go back"
          onClick={() => navigate(-1)}
        />
      </div>

      <div className="mb-6">
        <div
          className="text-xl font-bold"
        >
          {launchpad.name}
        </div>

        <div
          className="text-base"
        >
          {launchpad.full_name}
        </div>

        <figure className="mt-4">
          <img src={launchpad.images.large} alt="" />
        </figure>


      </div>

      <h2 className="text-xl font-bold mb-2">
        Launches
      </h2>

      <div>
        {launchpad.launches.map(item => {
          return (
            <div
              key={item.id}
            >
              <Link
                className="text-accent hover:text-accent-content"
                to={`/launches/${item.id}`}
              >
                {item.name}
              </Link>
            </div>
          )
        })}
      </div>

    </Container>
  );
}

export default Launchpad;
