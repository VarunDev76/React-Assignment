/**
 * Import action creator constants
 */
import { fromJS } from 'immutable';
import { success, failure } from '../../utils/redux';
import {
	GET_ASSIGNMENT,
	GET_SINGLE_ASSIGNMENT,
	CANCEL_ALL_API_REQUESTS
} from './constants';

/**
 * Set intial state
 */
const initialState = fromJS({
	assignmentList: [],	
	assignmentBug: [],
	assignmentRequirement: [],
	assignmentFeature: [],
	isFecthingAssignmentList: false,
	assignmentData: {},	
	isFecthingAssignmentData: false,
})

/**
 * Define the reducer with actions
 */
function tasksReducer(state = initialState, action) {
	switch (action.type) {
		case GET_ASSIGNMENT:
			return fromJS({
				...state.toJS(),
				isFecthingAssignmentList: true,
			})

		case success(GET_ASSIGNMENT):
			let tasks = action.payload.data.tasks
			let bug = tasks.filter(value => value.type.value === 'Bug')
			let requirement = tasks.filter(value => value.type.value === 'Requirement')
			let feature = tasks.filter(value => value.type.value === 'Feature')

			return fromJS({
				...state.toJS(),
				assignmentBug: bug,
				assignmentRequirement: requirement,
				assignmentFeature: feature,
				assignmentList: action.payload.data.tasks,
				isFecthingAssignmentList: false,
			})

		case failure(GET_ASSIGNMENT):
			return fromJS({
				...state.toJS(),
				isFecthingAssignmentList: false,
			})

		case CANCEL_ALL_API_REQUESTS:
			return fromJS({
				...initialState.toJS(),
			})

		case GET_SINGLE_ASSIGNMENT:
			return fromJS({
				...state.toJS(),
				isFecthingAssignmentData: true,
			})

		case success(GET_SINGLE_ASSIGNMENT):
			return fromJS({
				...state.toJS(),
				assignmentData: action.payload.data.task,
				isFecthingAssignmentData: false,
			})

		case failure(GET_SINGLE_ASSIGNMENT):
			return fromJS({
				...state.toJS(),
				isFecthingAssignmentData: false,
			})

		case CANCEL_ALL_API_REQUESTS:
			return fromJS({
				...initialState.toJS(),
			})

		default:
			return state;
	}
}

/**
 * Export the reducer
 */

export default tasksReducer;