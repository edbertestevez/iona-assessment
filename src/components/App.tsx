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
    {/**
     * Homepage
     * - loader: call api to get all breeds and load to the component
     */}
    <Route index element={<Homepage />} loader={HomepageLoader} />

    {/**
     * Single Cat Page
     * - exact path routing '*'
     * - loader: call api to get image and breed info and load to the component
     */}
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
