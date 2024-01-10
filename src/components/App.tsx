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
import ErrorFallback from './common/ErrorFallback';

const catBreedRoutes = (
  <Route path={AppRoutes.Root}>
    {/* Homepage */}
    <Route index element={<Homepage />} loader={HomepageLoader} />

    {/* Single Cat Pate - exact routing */}
    <Route
      path={AppRoutes.SingleCat}
      element={<SingleCat />}
      loader={SingleCatLoader}
    />
  </Route>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RouteWrapper />} errorElement={<ErrorFallback />}>
      {catBreedRoutes}
      {/* Add other routes here */}
    </Route>,
  ),
);

function App() {
  return (
    <CatBreedProvider>
      <RouterProvider router={router} />
    </CatBreedProvider>
  );
}

export default App;
