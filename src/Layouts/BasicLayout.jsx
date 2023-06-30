import { Outlet } from 'react-router-dom';
import Footer from '../Components/base/Footer';
import Navigation from '../Components/base/Navigation';

const BasicLayout = () => {
  return (
    <>
      <div className="h-screen flex flex-col">
        <header className="mb-5">
          <Navigation />
        </header>

        <main className="flex-1">
          <Outlet />
        </main>

        <Footer />
      </div>
    </>
  );
}

export default BasicLayout;
