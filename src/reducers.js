/**
 * Import mode modules
 */
import { combineReducers } from 'redux-immutable';
/**
 * Import reducers
 * All reducers used in the app must be declared here!
 */
import tasksReducer from './modules/tasks/reducer';

/**
 *  Combine the reducers
 */
const reducers = combineReducers({
	tasks: tasksReducer,
});

/**
 *  Export the combined reducers
 */
export default reducers;