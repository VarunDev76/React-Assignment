/**
 * Import node Modules
 */
import { createSelector } from 'reselect';

/**
 * Select the portion of the root reducer
 */
export const tasks = () => state => state.get('tasks');

/**
 * Select the correct portion of the root reducer
 */
export const getAssignmentListing = () => 
  createSelector(tasks(), state => {
    const listing = state.get('assignmentList').toJS()
    return listing.length > 0 ? listing : []
  });

/**
 * Select the correct portion of the root reducer
 */
export const getAssignmentBugListing = () => 
  createSelector(tasks(), state => {
    const listing = state.get('assignmentBug').toJS()
    return listing.length > 0 ? listing : []
  });

/**
 * Select the correct portion of the root reducer
 */
export const getAssignmentRequirementListing = () => 
  createSelector(tasks(), state => {
    const listing = state.get('assignmentRequirement').toJS()
    return listing.length > 0 ? listing : []
  });

/**
 * Select the correct portion of the root reducer
 */
export const getAssignmentFeatureListing = () => 
  createSelector(tasks(), state => {
    const listing = state.get('assignmentFeature').toJS()
    return listing.length > 0 ? listing : []
  });

/**
 * Select the Single User Fetching Data 
 */
export const getIsFecthingAssignment = () => 
  createSelector(tasks(), state => {
    return state.get('isFecthingAssignmentList')
  });

/**
 * Select the correct portion of the root reducer
 */
export const getAssignmentDataListing = () => 
  createSelector(tasks(), state => {
    const listing = state.get('assignmentData').toJS()
    return Object.keys(listing).length > 0 ? listing : {}
  });

/**
 * Select the Single User Fetching Data 
 */
export const getIsFecthingAssignmentData = () => 
  createSelector(tasks(), state => {
    return state.get('isFecthingAssignmentData')
  });