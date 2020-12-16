import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";

// Import css file
import "../assets/css/root.scss";
// core components
import { getToken, getLocalStorage } from "utils/helper";

import routes from "routes.js";

class LoginAuth extends React.Component {
  componentWillMount() {
    const { history } = this.props;
    const token = getToken();
    const storage = getLocalStorage();
    if (history && token && storage) {
      const { role_type, career_portal } = JSON.parse(storage);
      if (role_type === "assignment") {
        history.push("/user/dashboard");
        return;
      }
    }
  }

  componentDidUpdate(e) {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.mainContent.scrollTop = 0;
  }

  getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/public") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  render() {
    return (
      <div className="auth-wrapper" ref="mainContent">
        <div className="d-flex mx-auto justify-content-center w-50 nous-height-100">
          <Switch>{this.getRoutes(routes)}</Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginAuth);
