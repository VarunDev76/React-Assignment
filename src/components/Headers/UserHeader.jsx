import React from "react";
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { object, bool, array, func } from 'prop-types'
import { createStructuredSelector } from 'reselect';
import { getLocalStorage, deleteLocalStorage, isDisplayRoute } from '../../utils/helper';
import { showSuccessMsg } from 'utils/notification';
import Navbar from 'react-bootstrap/Navbar';
import Container from "react-bootstrap/Container";

import routes from "routes.js";

class UserHeaders extends React.Component {
  state = {
    userProfile: JSON.parse(getLocalStorage()),
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.userProfile) {
      return {
        userProfile: nextProps.userProfile,
      };
    }
  }

  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }

  // creates the links that appear in the top menu
  createLinks = routes => {
    return routes.map((prop, key) => {
      return (
        isDisplayRoute(prop.path) ?
          <li key={key}>
            <Link to={prop.layout + prop.path} className={this.activeRoute(prop.layout + prop.path)}>{prop.name}</Link>
          </li> : null
      );
    });
  };

  logout = () => {
    const { history } = this.props;
    deleteLocalStorage();
    showSuccessMsg("Logout successfully");
    if (history) {
      history.push('/public/login');
    }
  };

  render() {
    const {
      userProfile,
      isLoader,
    } = this.state; 
    let path = this.props.location.pathname;

    return (
      <>
        <header id="head">
          <div className="bg-white">
            <Navbar collapseOnSelect expand="lg" fixed="top" className="bg-white">
              <Container className="center d-flex justify-content-between">
                <Navbar.Brand to="/" className="navbar-brand d-flex align-items-center">
                  <Link to="/user/dashboard">
                    <svg enable-background="new 0 0 128 128" height="30" viewBox="0 0 128 128" width="30" ><path d="m118.496 34.843-.918-.608 2.068-3.121c.848-1.279 1.146-2.811.842-4.314-.305-1.504-1.177-2.799-2.457-3.646-1.278-.847-2.81-1.146-4.314-.841s-2.798 1.177-3.646 2.456l-2.62 3.954-10.087 15.22-3.337 5.036v-33.9c0-2.754-2.24-4.995-4.994-4.995h-72.64c-2.754 0-4.995 2.241-4.995 4.995v102.448c0 2.421 1.97 4.391 4.391 4.391h71.929c3.479 0 6.31-2.831 6.31-6.31v-45.836l12.913-19.484 9.535-14.387.918.609c.459.305.585.926.281 1.386l-12.618 19.039-2.601 2.085c-.431.346-.5.975-.155 1.406.198.247.488.375.781.375.22 0 .44-.072.625-.22l2.723-2.183c.081-.065.151-.142.208-.228l12.701-19.17c.914-1.378.535-3.244-.843-4.157z" fill="#e6e7e8"/><path d="m83.716 116.916h-71.929c-1.873 0-3.39-1.518-3.39-3.391v-102.447c0-2.206 1.788-3.994 3.994-3.994h72.64c2.206 0 3.994 1.788 3.994 3.994v100.528c.001 2.933-2.377 5.31-5.309 5.31z" fill="#d4fbff"/><path d="m85.031 7.084h-72.64c-2.206 0-3.994 1.788-3.994 3.994v3c0-2.206 1.788-3.994 3.994-3.994h72.64c2.206 0 3.994 1.788 3.994 3.994v-3c0-2.206-1.788-3.994-3.994-3.994z" fill="#fff"/><path d="m68.015 54.553h38.823v9.487h-38.823z" fill="#6dc9f7" transform="matrix(.552 -.834 .834 .552 -10.297 99.415)"/><path d="m98.45 26.375h9.487v18.259h-9.487z" fill="#fa759e" transform="matrix(.834 .552 -.552 .834 36.789 -51.098)"/><path d="m112.192 30.515-7.908-5.241 2.62-3.954c1.447-2.184 4.391-2.781 6.575-1.334 2.184 1.447 2.781 4.391 1.334 6.575z" fill="#ffd7e5"/><path d="m70.044 85.526 2.705-12.669 7.908 5.241z" fill="#fa759e"/><g fill="#3a2c60"><path d="m89.025 83.615c-.552 0-1 .448-1 1v9.097c0 .552.448 1 1 1s1-.448 1-1v-9.097c0-.552-.447-1-1-1z"/><path d="m37.418 29.137h39.938c.552 0 1-.448 1-1s-.448-1-1-1h-39.938c-.552 0-1 .448-1 1s.448 1 1 1z"/><path d="m37.418 43.484h39.938c.552 0 1-.448 1-1s-.448-1-1-1h-39.938c-.552 0-1 .448-1 1s.448 1 1 1z"/><path d="m37.418 57.831h39.938c.552 0 1-.448 1-1s-.448-1-1-1h-39.938c-.552 0-1 .448-1 1s.448 1 1 1z"/><path d="m77.356 98.873h-39.938c-.552 0-1 .448-1 1s.448 1 1 1h39.938c.552 0 1-.448 1-1s-.447-1-1-1z"/><path d="m30.274 24.704c0-1.385-1.126-2.511-2.511-2.511h-6.866c-1.385 0-2.511 1.126-2.511 2.511v6.866c0 1.385 1.126 2.511 2.511 2.511h6.866c1.385 0 2.511-1.126 2.511-2.511zm-2 6.866c0 .282-.229.511-.511.511h-6.866c-.282 0-.511-.229-.511-.511v-6.866c0-.282.229-.511.511-.511h6.866c.282 0 .511.229.511.511z"/><path d="m30.274 53.398c0-1.385-1.126-2.511-2.511-2.511h-6.866c-1.385 0-2.511 1.126-2.511 2.511v6.866c0 1.385 1.126 2.511 2.511 2.511h6.866c1.385 0 2.511-1.126 2.511-2.511zm-2 6.866c0 .282-.229.511-.511.511h-6.866c-.282 0-.511-.229-.511-.511v-6.866c0-.282.229-.511.511-.511h6.866c.282 0 .511.229.511.511z"/><path d="m27.763 79.582h-6.866c-1.385 0-2.511 1.126-2.511 2.511v6.866c0 1.385 1.126 2.511 2.511 2.511h6.866c1.385 0 2.511-1.126 2.511-2.511v-6.866c0-1.385-1.127-2.511-2.511-2.511zm.511 9.377c0 .282-.229.511-.511.511h-6.866c-.282 0-.511-.229-.511-.511v-6.866c0-.282.229-.511.511-.511h6.866c.282 0 .511.229.511.511z"/><path d="m114.496 30.843-.918-.608 2.068-3.121c.848-1.279 1.146-2.811.842-4.314-.305-1.504-1.177-2.799-2.457-3.646-1.278-.847-2.81-1.146-4.314-.841s-2.798 1.177-3.646 2.456l-2.62 3.954-10.087 15.22-3.337 5.036v-33.9c0-2.754-2.24-4.995-4.994-4.995h-72.64c-2.754 0-4.995 2.241-4.995 4.995v102.448c0 2.421 1.97 4.391 4.391 4.391h71.929c3.479 0 6.31-2.831 6.31-6.31v-12.585c0-.552-.448-1-1-1s-1 .448-1 1v12.583c0 2.376-1.933 4.31-4.31 4.31h-71.931c-1.318 0-2.391-1.072-2.391-2.391v-102.447c0-1.651 1.343-2.995 2.995-2.995h72.64c1.651 0 2.994 1.343 2.994 2.995v36.918l-14.7 22.183h-35.907c-.552 0-1 .448-1 1s.448 1 1 1h34.581l-.083.125c-.008.011-.008.025-.015.036-.058.095-.106.196-.13.307l-2.537 11.878h-31.816c-.552 0-1 .448-1 1s.448 1 1 1h39.938c.552 0 1-.448 1-1s-.448-1-1-1h-4.14l8.014-5.609c.093-.065.168-.149.233-.239.008-.011.02-.017.028-.028l6.534-9.86v10.335c0 .552.448 1 1 1s1-.448 1-1v-13.352l12.913-19.484 9.535-14.387.918.609c.459.305.585.926.281 1.386l-12.618 19.038-2.601 2.085c-.431.346-.5.975-.155 1.406.198.247.488.375.781.375.22 0 .44-.072.625-.22l2.723-2.183c.081-.065.151-.142.208-.228l12.704-19.169c.914-1.378.535-3.244-.843-4.157zm-6.759-8.97c1.141-1.719 3.469-2.192 5.189-1.052.833.552 1.402 1.396 1.601 2.376s.004 1.979-.548 2.812l-2.068 3.12-6.241-4.136zm-36.184 61.377 1.868-8.748 5.46 3.619zm8.823-6.539-6.241-4.136 20.342-30.694 6.241 4.136zm21.447-32.361-6.241-4.136 8.982-13.553 6.241 4.136z"/></g><path d="m23.405 31.016c-.406 0-.795-.165-1.078-.457l-4.235-4.379c-.576-.596-.56-1.545.035-2.121.596-.576 1.546-.56 2.121.035l3.102 3.207 6.525-7.455c.545-.624 1.493-.688 2.117-.141.624.546.687 1.493.141 2.117l-7.599 8.682c-.276.316-.672.501-1.092.512-.012 0-.025 0-.037 0z" fill="#fa759e"/><path d="m23.405 59.71c-.406 0-.795-.165-1.078-.457l-4.235-4.379c-.576-.596-.56-1.545.035-2.121.596-.576 1.546-.56 2.121.035l3.102 3.207 6.525-7.455c.545-.624 1.493-.687 2.117-.141s.687 1.493.141 2.117l-7.599 8.682c-.276.316-.672.501-1.092.512-.012 0-.025 0-.037 0z" fill="#fa759e"/></svg>
                  </Link>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="navbarSupportedContent" />

                <div className="container-fluid header-bottom bg-white px-md-5 px-3">
                  <ul className="main-nav d-inline-flex mb-0 py-md-2 py-2 my-md-2 my-1 pl-0 align-items-center">
                    {/* Nomal menu without dropdown */}
                    {this.createLinks(routes)}
                    <li onClick={this.logout}> 
                      <button className="btn btn-danger btn-sm"> Logout </button>
                    </li>
                  </ul>
                </div>

                
              </Container>
            </Navbar>
          </div>
        </header>
      </>
    );
  }
}

/**
 *  Define component PropTypes
 */
UserHeaders.propTypes = {
  searchSuggestions: object.isRequired,
  FetchingSuggestions: bool.isRequired,
  isAllInitiatedChatData: bool.isRequired,
  getInitiatedChatData: array.isRequired,
  FetchingPendingRequests: bool.isRequired,
  PendingRequests: array.isRequired,
  isFetchingSearchData: bool.isRequired,
  searchData: object.isRequired,
  readNotification: func.isRequired
};

/**
 *  Map redux state to component props
 */
const mapStateToProps = createStructuredSelector({
  // searchSuggestions: searchSuggestionsList(),
  // FetchingSuggestions: IsFetchingSuggestions(),
  // getAllInitiatedChatData: getInitiatedChatData(),
  // FetchingPendingRequests: IsFetchingPendingRequests(),
  // PendingRequests: getPendingRequests(),
  // isFetchingSearchData: isSearchData(),
  // searchData: searchDataList()
});

export default connect(
  mapStateToProps,
  {
    // getSearchData,
    // getSearchSuggestions,
    // getAllInitiatedChat,
    // getAllReceivedPendingRequests,
    // acceptOrRejectRequest,
    // readNotification
  }
)(withRouter(UserHeaders));
