/**
 * Import action creator constants & dependencies
 */
import {
	GET_ASSIGNMENT,
	ADD_ASSIGNMENT,
	UPDATE_ASSIGNMENT,
	DELETE_ASSIGNMENT,
	GET_SINGLE_ASSIGNMENT,
	CANCEL_ALL_API_REQUESTS
} from './constants';
import { API_URLS } from '../../configs/urls';
import axios from 'axios';
import qs from 'qs/lib/index';
import { v4 as uuidv4 } from 'uuid';
import { createServer, Model } from "miragejs";

const cancelApiRequests = [];

// SERVER CREATE

createServer({
	models: {
    task: Model,
	},
	seeds(server) {
		server.create("task", { id: uuidv4(), title: 'New Assignment', type: {id: 3, label: 'Feature', value: 'Feature'}, projectLead: 'Project Lead', description: 'qwe'})
		server.create("task", { id: uuidv4(), title: 'New Assignment 1', type: { id: 1, label: 'Bug', value: 'Bug' }, priority: { id: 1, value: 'High', label: 'High' }, assignTo: { id: 1, value: 'Manager', label: 'Manager' }, description: 'qwe'})
	},
  routes() {
    this.namespace = "api"
		
		// Get All Request
    this.get("/tasks", (schema, request) => {
			return schema.tasks.all()
		})
		
		// Get Single Task detail Request
    this.get("/tasks/:id", (schema, request) => {
			let id = request.params.id
			
			return schema.tasks.find(id)
		})
		
		// Add New Tasks Request
    this.post("/tasks", (schema, request) => {
			let attrs = JSON.parse(request.requestBody)
			attrs.map(item => {
				return schema.tasks.create(item)
			})
		})

		// Update New Tasks Request
		this.patch("/tasks/:id", (schema, request) => {
			let newAttrs = JSON.parse(request.requestBody)
			let id = request.params.id
			let task = schema.tasks.find(id)
			debugger
			return task.update(newAttrs)
		})
		
		// Delete New Tasks Request
    this.delete("/tasks/:id", (schema, request) => {
			let id = request.params.id
			
			return schema.tasks.find(id).destroy()
		})
		
  },
})

/**
 *  API for Assignment List
 */
export function getAssignmentList() {
	return async (dispatch, getState) => {
		const state = getState();
		const source = axios.CancelToken.source();
		cancelApiRequests.push(source);
		try {
			const response = await dispatch(
				getAssignmentListBegin(
					'/api/tasks',
					source
				)
			);
			if (response.payload) {
				const { data } = response.payload;
				return data;
			}
			throw response;
		} catch (error) {
			throw error.response;
		}
	};
}

export const getAssignmentListBegin = (API_URLS, source) => ({
	type: GET_ASSIGNMENT,
	payload: {
		request: {
			url: API_URLS,
			method: 'get',
			cancelToken: source.token
		}
	}
});

/**
 *  API for Single Assignment List
 */
export function getSingleAssignment(id) {
	return async (dispatch, getState) => {
		const state = getState();
		const source = axios.CancelToken.source();
		cancelApiRequests.push(source);
		try {
			const response = await dispatch(
				getSingleAssignmentBegin(
					`/api/tasks/${id}`,
					source
				)
			);
			if (response.payload) {
				const { data } = response.payload;
				return data;
			}
			throw response;
		} catch (error) {
			throw error.response;
		}
	};
}

export const getSingleAssignmentBegin = (API_URLS, source) => ({
	type: GET_SINGLE_ASSIGNMENT,
	payload: {
		request: {
			url: API_URLS,
			method: 'get',
			cancelToken: source.token
		}
	}
});

/**
 *  API for Add Assignment List
 */
export function addAssignmentList(params) {
	return async (dispatch, getState) => {
		const state = getState();
		const source = axios.CancelToken.source();
		cancelApiRequests.push(source);
		try {
			const response = await dispatch(
				addAssignmentListBegin(
					'/api/tasks',
					params,
					source
				)
			);
			if (response.payload) {
				const { data } = response.payload;
				return data;
			}
			throw response;
		} catch (error) {
			throw error.response;
		}
	};
}

export const addAssignmentListBegin = (API_URLS, params, source) => ({
	type: ADD_ASSIGNMENT,
	payload: {
		request: {
			url: API_URLS,
			method: 'post',
			data: JSON.stringify(params),
			headers: {
				accept: 'application/json',
				'content-type': 'application/json'
			},
			cancelToken: source.token
		}
	}
});

/**
 *  API for Update Assignment List
 */
export function updateAssignmentList(params, id) {
	return async (dispatch, getState) => {
		const state = getState();
		const source = axios.CancelToken.source();
		cancelApiRequests.push(source);
		try {
			const response = await dispatch(
				updateAssignmentListBegin(
					`/api/tasks/${id}`,
					params,
					source
				)
			);
			if (response.payload) {
				const { data } = response.payload;
				return data;
			}
			throw response;
		} catch (error) {
			throw error.response;
		}
	};
}

export const updateAssignmentListBegin = (API_URLS, params, source) => ({
	type: UPDATE_ASSIGNMENT,
	payload: {
		request: {
			url: API_URLS,
			method: 'patch',
			data: params,
			headers: {
				accept: 'application/json',
				'content-type': 'application/json'
			},
			cancelToken: source.token
		}
	}
});

/**
 *  API for Delete Assignment List
 */
export function deleteAssignmentList(id) {
	return async (dispatch, getState) => {
		const state = getState();
		const source = axios.CancelToken.source();
		cancelApiRequests.push(source);
		try {
			const response = await dispatch(
				deleteAssignmentListBegin(
					`/api/tasks/${id}`,
					// params,
					source
				)
			);
			if (response.payload) {
				const { data } = response.payload;
				return data;
			}
			throw response;
		} catch (error) {
			throw error.response;
		}
	};
}

export const deleteAssignmentListBegin = (API_URLS, source) => ({
	type: DELETE_ASSIGNMENT,
	payload: {
		request: {
			url: API_URLS,
			method: 'delete',
			// data: JSON.stringify(params),
			// headers: {
			// 	accept: 'application/json',
			// 	'content-type': 'application/json'
			// },
			cancelToken: source.token
		}
	}
});

/**
 * Cancel All API Request 
 */
export function cancelAllApiRequests(){
	return dispatch => {
		cancelApiRequests.forEach(apiRequest => {
			apiRequest.cancel()
		})
		dispatch(cancelAllApiRequestsBegin())
	}
};

export const cancelAllApiRequestsBegin = () => ({
	type: CANCEL_ALL_API_REQUESTS
});