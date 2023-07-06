import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import BasicLayout from './Layouts/BasicLayout';

import Crew from './Pages/Crew';
import Launches from './Pages/Launches';
import Home from './Pages/Home';
import History from './Pages/History';
import Page_404 from './Pages/Page_404';
import Rockets from './Pages/Rockets';
import Rocket from './Pages/Rocket';
import Launch from './Pages/Launch';

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
        path="/launches"
        element={<Launches />}
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