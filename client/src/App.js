import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import Auth from "./components/Auth";
import Booking from "./components/Booking";
import Event from "./components/Event";
import MainNavigation from "./components/Navigation/MainNavigation";
import AuthContext from "./components/context/authContext";
import "./App.css";

class App extends React.Component {
  state = {
    token: null,
    userId: null
  };

  login = (token, userId, tokenExpiration) => {
    this.setState({ token: token, userId: userId });
  };

  logout = () => {
    this.setState({ token: null, userId: null });
  };

  render() {
    return (
      <BrowserRouter>
        <AuthContext.Provider
          value={{
            token: this.state.token,
            userId: this.state.userId,
            login: this.login,
            logout: this.logout
          }}
        >
          <MainNavigation />
          <main className="main-content">
            <Switch>
              {!this.state.token && <Redirect from="/" to="/auth" exact />}
              {!this.state.token && (
                <Redirect from="/bookings" to="/auth" exact />
              )}
              {this.state.token && <Redirect from="/" to="/events" exact />}
              {this.state.token && <Redirect from="/auth" to="/events" exact />}
              {!this.state.token && <Route path="/auth" component={Auth} />}
              <Route path="/events" component={Event} />
              {this.state.token && (
                <Route path="/bookings" component={Booking} />
              )}
            </Switch>
          </main>
        </AuthContext.Provider>
      </BrowserRouter>
    );
  }
}

export default App;
