import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import BasicLayout from './Layouts/BasicLayout';

import Home from './Pages/Home';

// import { authLoader } from './loaders/authLoader';

const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route element={<BasicLayout />}>
      <Route
        index
        path="/"
        element={<Home />}
      />

      <Route
        path=""
        // loader={}
        element={<Home />}
      />
    </Route>

    {/* <Route path="*" element={<Page_404 />} /> */}
  </>
));

export default router;