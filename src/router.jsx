import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import BasicLayout from './Layouts/BasicLayout';

import Crew from './Pages/Crew';
import Home from './Pages/Home';
import History from './Pages/History';
import Page_404 from './Pages/Page_404';
import Rockets from './Pages/Rockets';
import Rocket from './Pages/Rocket';
import Launch from './Pages/Launch';
import OnePersonPage from './Pages/OnePersonPage';
import Launchpads from './Pages/Launchpads';
import Launchpad from './Pages/Launchpad';

const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route element={<BasicLayout />}>
      <Route
        index
        path="/"
        element={<Home />}
      />
      <Route
        path="/crew"
        element={<Crew />}
      />
      <Route
        path="/crew/:id"
        element={<OnePersonPage />}
      />
      <Route
        path="/rockets"
        element={<Rockets />}
      />
      <Route
        path="/rockets/:id/"
        element={<Rocket />}
      />
      <Route
        path="/history"
        element={<History />}
      />
      <Route
        path="/launchpads"
        element={<Launchpads />}
      />
      <Route
        path="/launchpads/:id"
        element={<Launchpad />}
      />
      <Route
        path="/launches/:id"
        element={<Launch />}
      />

      <Route path="*" element={<Page_404 />} />
    </Route>
  </>
));

export default router;