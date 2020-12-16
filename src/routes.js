/**
 * Import Auth Components
 */

import StudentLogin from 'views/login/studentLogin.jsx';
import DashbaordComponent from 'views/dashboard/Index.jsx';
import AddEditComponent from 'views/dashboard/AddEditComponent.jsx';

var routes = [
	// Login Routes
	{
		path: '/login',
		name: 'Login Page',
		icon: 'ni ni-tv-2 text-primary',
		component: StudentLogin,
		layout: '/public',
	},
	{
		path: '/dashboard',
		name: 'Dashboard Page',
		icon: 'ni ni-tv-2 text-primary',
		component: DashbaordComponent,
		layout: '/user',
	},
	{
		path: '/add-task',
		name: 'Add Task',
		icon: 'ni ni-tv-2 text-primary',
		component: AddEditComponent,
		layout: '/user',
	},
	{
		path: '/edit/:id',
		name: 'Edit Task',
		icon: 'ni ni-tv-2 text-primary',
		component: AddEditComponent,
		layout: '/user',
	},
];

export default routes;