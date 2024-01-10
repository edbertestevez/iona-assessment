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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      {/* React router v6 - loader loads data to the component */}
      <Route index element={<Homepage />} loader={api.getAllBreeds} />

      {/* React router v6 - specify '*' for exact routing */}
      <Route path="/:id/*" element={<SingleCat />} />
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
