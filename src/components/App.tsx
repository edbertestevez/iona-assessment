import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import Homepage from './containers/Homepage';
import SingleCat from './containers/SingleCat';
import { CatBreedProvider } from './context/CatBreedContext';
import api from '../api';
import AppRoutes from '../config/routes';

const catBreedRoutes = (
  <Route path={AppRoutes.Root}>
    {/* React router v6 - loader loads data to the component */}
    <Route index element={<Homepage />} loader={api.getAllBreeds} />

    {/* React router v6 - specify '*' for exact routing */}
    <Route
      path={AppRoutes.SingleCat}
      element={<SingleCat />}
      loader={async ({ params }) =>
        params.imageId && api.getBreedImageWithInfo(params.imageId)
      }
    />
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
