import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NewPlace from './places/pages/NewPlace';
import Users from './user/pages/Users';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import UserPlaces from './places/pages/UserPlaces';

function App() {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/:userId/places" element={<UserPlaces />} /> 
          <Route path="/places/new" element={<NewPlace />} />
          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
      </main>
    </Router>
  )
}

export default App;
