import { showErrorMsg } from './notification';
import * as moment from 'moment';
// Permissions arrays
import {
  assignment
} from "configs/routesConfig";

const storageKeyName = 'assignment';
const dateFormat = 'DD-MMM-YYYY';
const chatFormat = 'MMMM Do YYYY, h:mm:ss a';

/** 
 * Handle API Error Reponse
 * 
 * @param err
 */
export const httpHandleError = error => {
	/* error = {error,config, code, request, response } */
	try{
		var xhr = error.request
		if(!xhr.response){
			return Promise.reject({})
		}

		var err = xhr.response;
		if(xhr && xhr.status && err){
			switch (xhr.status){
				case 400:
				case 401:
					logout();
					showErrorMsg(err.error)
					break;
				case 404:
					showErrorMsg(err.error)
          break;
        case 406:
          showErrorMsg(err.error)
          break;
				case 422:
					if(err.errors){
						showErrorMsg(err.errors[Object.keys(err.errors)[0][0]]);
						break;
					}
					showErrorMsg(err.error)
					break;

				default:
					showErrorMsg("An internal error occur")
			}
		} else{
      showErrorMsg("An internal error occur")
    }
    return Promise.reject({})
	} catch (e) {
    return Promise.reject({})
  }
};

export const logout = () => {
  deleteLocalStorage();
  window.location.replace("/public/login");
}

export const setLocalStorage = data => {
  if(!data) return;
  localStorage.setItem(storageKeyName, JSON.stringify(data));
}

export const getLocalStorage = () => {
  return localStorage.getItem(storageKeyName);
}

export const deleteLocalStorage = () => {
  return localStorage.removeItem(storageKeyName);
}

export  const getToken = () => {
  const storage = getLocalStorage();
  if (storage) {
    const { token } = JSON.parse(storage);
    return token;
  }
  return null;
}

export const getUserId = () => {
  const storage = getLocalStorage();
  if (storage) {
    const { id } = JSON.parse(storage);
    return id;
  }
  return null;
}

export const getFormattedDate = date => {
  if (!date) return;
  return moment(date).format(dateFormat);
}

export const isDisplayRoute = path => {
  const storage = getLocalStorage();
  if (storage) {
    const { role_type } = JSON.parse(storage);
    if (path.search(':') !== -1) {
      return false;
    }

    switch (role_type) {
      case "assignment":
        return assignment.includes(path);

      default:
          return false;
    }
  }
  return false;
};

export const isRouteAllow = path => {
  const storage = getLocalStorage();
  if (storage) {
    const { role_type } = JSON.parse(storage);
    switch (role_type) {
      case "assignment":
        return assignment.includes(path);

      default:
        return false;
    }
  }
  return false;
}
