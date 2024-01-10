import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './containers/Homepage';
import SingleCat from './containers/SingleCat';

function App() {
  return (
    <Router>
      <Routes>
        <Route path={'/'} element={<Homepage />} />
        <Route path={'/:catId/*'} element={<SingleCat />} />
      </Routes>
    </Router>
  );
}

export default App;
