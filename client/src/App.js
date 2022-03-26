import React, { useCallback, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import NewPlace from './places/pages/NewPlace';
import Users from './user/pages/Users';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './user/pages/Auth';
import { AuthContext } from './shared/context/auth-context'

function App() {
  const [token, setToken] = useState(false)
  const [userId, setUserId] = useState(null)

  const login = useCallback((uid, token) => {
    setToken(token)
    setUserId(uid) 
    console.log(uid);
    localStorage.setItem("userData", JSON.stringify({userId: uid , token: token}))
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)
    localStorage.removeItem("userData")
  }, [])
  
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"))
    if(storedData && storedData.token) {
      login(storedData.userId, storedData.token)
    }
  }, [login])

  
  let routes;
  if (token) {
    routes = (
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="/places/new" element={<NewPlace />} />
        <Route path="/places/:placeId" element={<UpdatePlace />} />
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    )
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="*"
          element={<Navigate to="/auth" replace />}
        />
      </Routes>
    )
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout
      }}
    >
      <Router>
        <MainNavigation />
        <main>
          {routes}
        </main>
      </Router>
    </AuthContext.Provider>
  )
}

export default App;
