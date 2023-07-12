import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useSWR from 'swr';
import BackLink from '../Components/base/BackLink';
import ErrorAlert from '../Components/base/ErrorAlert';
import Loader from '../Components/base/Loader';
import { postFetcher } from '../helpers/fetchers';

const Container = ({ children }) => {
  return (
    <div className="container">
      {children}
    </div>
  )
}

Container.propTypes = {
  children: PropTypes.any.isRequired,
}

const OnePersonPage = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [query,] = useState({
    _id: params.id
  });

  const [options,] = useState({
    populate: "launches"
  });

  const { data, isLoading, error } = useSWR({ url: '/v4/crew/query', query: query, options: options }, postFetcher);

  if (isLoading) return <Container><Loader /></Container>

  if (error) return <Container><ErrorAlert /></Container>

  const [user] = data.docs;
  const { launches } = user;

  return (
    <Container>
      <div className="mb-4">
        <BackLink
          text="Go back"
          onClick={() => navigate(-1)}
        />
      </div>

      <div className="mb-5">
        <figure className="w-96 mb-2">
          <img src={user.image} alt={user.name} />
        </figure>

        <div className="flex items-center gap-2">

          <div className="font-bold text-2xl">
            {user.name}
          </div>

          <a
            href={user.wikipedia}
            target="_blank"
            rel="noreferrer"
            className="inline-flex gap-1 p-2 hover:opacity-60"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
            </svg>
            Wiki
          </a>
        </div>

      </div>

      <h2 className="text-lg">
        Launches:
      </h2>

      <ul className="list-decimal list-inside">
        {launches.map(item => {
          return (
            <li
              key={item.id}
            >
              <Link
                className="text-accent hover:underline"
                to={`/launches/${item.id}`}
              >
                {item.name}
              </Link>

            </li>
          )
        })}
      </ul>
    </Container>
  );
}

export default OnePersonPage;
