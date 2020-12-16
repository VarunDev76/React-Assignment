import { toast } from 'react-toastify';

const config = {
	position: toast.POSITION.TOP_RIGHT,
	autoClose: 1500
};

/**
 * Show Success Notification
 * 
 * @param {String} message [message to show]
 */
export const showSuccessMsg = msg => {
	toast.success(msg, config);
}

/**
 * Show Error Notification
 * 
 * @param {String} message [message to show]
 */
export const showErrorMsg = msg => {
	toast.error(msg, config);
}

/**
 * Show Warning Notification
 * 
 * @param {String} message [message to show]
 */
export const showWarningMsg = msg => {
	toast.warn(msg, config);
}