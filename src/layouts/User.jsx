import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { getToken, isRouteAllow, getLocalStorage } from 'utils/helper';
import UserHeader from 'components/Headers/UserHeader';
import routes from 'routes.js';

class User extends React.Component {
  componentWillMount() {
    const { history } = this.props;
    const token = getToken();
    if (history && !token) {
      history.push('/public/login');
    }
  }

  componentDidUpdate(e) {
    // document.documentElement.scrollTop = 0;
    // document.scrollingElement.scrollTop = 0;
    // this.refs.userContent.scrollTop = 0;
  }

  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === '/user' && isRouteAllow(prop.path)) {
        return (
          <Route
            exact
            strict
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    })
  }

  getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1
      ) {
        return routes[i].name;
      }
    }
    return 'Brand';
  };

  selectUserType = () => {
    const storage = getLocalStorage();

    return (
      <>        
        <div className="wrapper" ref="userContent">
          <div className="supreme-container">
            <div className="headerContainer">
              <UserHeader storage={storage} />
              <section className="m-t-rem-8">
                {/* Page content */}
                <div className="container">
                  <Switch> {this.getRoutes(routes)} </Switch>
                </div>
              </section>
            </div>
          </div>
        </div>
      </>
    )
  }

  render() {
    const token = getToken();
    if (!token) return null;
    return (
      <>
        {this.selectUserType()}
      </>
    )
  }

}

export default withRouter(User);