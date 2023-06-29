import { Link } from 'react-router-dom';

const Page404 = () => {
  return (
    <section className="flex items-center h-full justify-center flex-col gap-4">
      <h1 className="text-4xl text-red-500">
        404
      </h1>

      <Link to="/" className="border-[3px] py-2 px-4 ">
        Go home
      </Link>
    </section>
  );
}

export default Page404;
