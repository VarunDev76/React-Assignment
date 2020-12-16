import React from "react";
import { func, bool, array } from 'prop-types'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter, Link } from "react-router-dom";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

/**
 *  Import other dependencies
 */

import RequirementTableComponent from './RequirementTable';
import BugTableComponent from './BugTable';
import FeatureTableComponent from './FeatureTable';

import { getLocalStorage } from 'utils/helper';
import { getAssignmentList, deleteAssignmentList } from 'modules/tasks/actions';
import { 
  getAssignmentListing, 
  getAssignmentBugListing,
  getAssignmentRequirementListing,
  getAssignmentFeatureListing,
  getIsFecthingAssignment 
} from 'modules/tasks/selectors';



class DashbaordComponent extends React.Component {
  state = {
    userProfile: JSON.parse(getLocalStorage()),
    isLoader: false
  }

  componentDidMount(){
    if(Object.keys(this.state.userProfile).length > 0){
      this.props.getAssignmentList()
    }
  }

  deleteUser = props => {
    if(props)
      this.props.deleteAssignmentList(props).then(res => {
        this.props.getAssignmentList()
      })
  }
  
  render() {
    let { isFetchingAssignment, bugList,  requirementList, featureList} = this.props;

    return (
      <div className="row">
        <div className="d-flex flex-fill justify-content-between text-right mb-3 w-100 px-3">
          <h6> Task Lists </h6>
          <Link to="/user/add-task">
            <button className="btn btn-primary"> Add Task </button>
          </Link>
        </div>

        <Tabs defaultActiveKey="bug" id="uncontrolled-tab-example" className="col-md-12">
          <Tab eventKey="bug" title="Bug">
            <div className="row w-100">
              <BugTableComponent isFetchingAssignment={isFetchingAssignment} assignmentList={bugList} deleteUser={this.deleteUser} />
            </div>
          </Tab>
          <Tab eventKey="requirement" title="Requirement">
            <div className="row w-100">
              <RequirementTableComponent isFetchingAssignment={isFetchingAssignment} assignmentList={requirementList} deleteUser={this.deleteUser} />
            </div>
          </Tab>
          <Tab eventKey="feature" title="Feature">
            <div className="row w-100">
              <FeatureTableComponent isFetchingAssignment={isFetchingAssignment} assignmentList={featureList} deleteUser={this.deleteUser} />
            </div>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

/**
 *  Define component PropTypes
 */
DashbaordComponent.propTypes = {
  assignmentList: array.isRequired,
  bugList: array.isRequired,
  requirementList: array.isRequired,
  featureList: array.isRequired,
  isFetchingAssignment: bool.isRequired,
  getAssignmentList: func.isRequired,
  deleteAssignmentList: func.isRequired,
};

/**
 *  Map redux state to component props
 */
const mapStateToProps = createStructuredSelector({
  assignmentList: getAssignmentListing(),
  isFetchingAssignment: getIsFecthingAssignment(),
  bugList: getAssignmentBugListing(),
  requirementList: getAssignmentRequirementListing(),
  featureList: getAssignmentFeatureListing()
});

export default connect(
  mapStateToProps,
  {
    getAssignmentList,
    deleteAssignmentList
  }
)(withRouter(DashbaordComponent));
