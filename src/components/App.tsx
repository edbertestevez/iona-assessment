/* eslint-disable import/order */

import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import RouteWrapper from './common/RouteWrapper';

import Homepage from './containers/Homepage';
import HomepageLoader from './containers/Homepage/loader';

import SingleCat from './containers/SingleCat';
import SingleCatLoader from './containers/SingleCat/loader';

import { CatBreedProvider } from './context/CatBreedContext';
import AppRoutes from '../config/routes';

const catBreedRoutes = (
  <Route element={<RouteWrapper />}>
    <Route path={AppRoutes.Root}>
      {/* React router v6 - loader loads data to the component */}
      <Route index element={<Homepage />} loader={HomepageLoader} />

      {/* React router v6 - specify '*' for exact routing */}
      <Route
        path={AppRoutes.SingleCat}
        element={<SingleCat />}
        loader={SingleCatLoader}
      />
    </Route>
  </Route>
);

const router = createBrowserRouter(
  createRoutesFromElements([
    catBreedRoutes,
    // Add other routes here
  ]),
);

function App() {
  return (
    <CatBreedProvider>
      <RouterProvider router={router} />
    </CatBreedProvider>
  );
}

export default App;
