import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import useSWR from 'swr';
import BackLink from '../Components/base/BackLink';
import ErrorAlert from '../Components/base/ErrorAlert';
import Loader from '../Components/base/Loader';
import { fetcher } from '../helpers/fetcher';
import dayjs from "../helpers/dayjs";
import Logo from '../Components/shared/Logo';

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

const Launch = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { data, error, isLoading } = useSWR(`/v4/launches/${params.id}`, fetcher)

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

  return (
    <Container>
      <div className="mb-4">
        <BackLink
          text="Go back"
          onClick={() => navigate(-1)}
        />
      </div>

      <div className="border flex flex-col items-center px-4 md:px-6 py-4 max-w-2xl mx-auto">
        {
          data.links.patch.small ?
            <img
              className="mb-3"
              src={data.links.patch.small}
              alt={data.name}
              loading="lazy"
            />
            :
            <div className="flex mx-auto items-center justify-center w-32 h-32 border rounded-full p-3 dark:bg-gray-500 dark:border-gray-500 dark:text-white mb-3">
              <Logo className="w-full" />
            </div>
        }

        <div className="text-xl md:text-2xl font-bold mb-2">
          {data.name}
        </div>

        <div className="mb-2 font-medium">
          {dayjs(data.event_date_utc).format('LLL')}
        </div>

        {data.details && <div>
          {data.details}
        </div>}

        <div className="text-center">
          {data.links.webcast &&
            <a href={data.links.webcast} target="_blank" rel="noreferrer" className="inline-flex gap-1 p-2 hover:opacity-60">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
              </svg>

              Youtube
            </a>}

          {data.links.wikipedia &&
            <a href={data.links.wikipedia} target="_blank" rel="noreferrer" className="inline-flex gap-1 p-2 hover:opacity-60">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
              </svg>
              Wiki
            </a>}
        </div>

      </div>
    </Container>
  );
}

export default Launch;
