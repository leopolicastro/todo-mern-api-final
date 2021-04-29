import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Login from './pages/Login';
// import Navigation from './components/Navigation';
import SignUp from './pages/SignUp';
import ResetPassword from './pages/ResetPassword';
import './App.css';
import Profile from './components/Profile';
import UpdatePassword from './pages/UpdatePassword';
import Calendar from './pages/Calendar';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/reset-password" component={ResetPassword} />
          <Route exact path="/update-password" component={UpdatePassword} />
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/calendar" component={Calendar} />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
