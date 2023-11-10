const apiUrl = `http://213.91.249.19:8082/api`


const apiRoutes = {

	//Account
	signIn: 'account/signIn',
	signUp: 'account/signUp',
	logOut: 'account/logOut',
	changePass: 'account/changePassword',
	updateUser: 'account/updateUser',
	getCurrentUser: 'account/current',
	refreshToken:'account/refreshToken',
	changeThemeMode:'account/changeThemeMode',
	confirmUserMail:"account/confirmUserEmail",

	//Clients
	getAllClients: 'client/all',
	getClient:'client/byId',
	 
	//Store
	getStores: 'store/getStores',

	//Products
	getProducts: 'product/getProducts',

	//Transactions
	createExpense: 'transaction/create',
	getTransactions: 'transaction/getTransactions',
	getTrransactionsByUser: 'transaction/getUserTransactions',
	getDashboard: 'transaction/getDashboardTransactions',
	getTransactionDetails: 'transaction/details',
	getCurrentDateTransactions:'transactions/today',
	getMonthlyTransactions:'transactions/monthly',
	getTransactionsByStore:'transactions/byStore',


	//Organization
	addEmployee: 'organization/addEmployee',
	getEmployees:'organization/getEmployees',
	getCurrencies:'organization/currencies',
	getEmployeesWithRoles:'organization/employeesWithRoles',

	//Storage
	getStorage:'storage/storage',
	updateStorage:'storage/update',
	addNewStore:'storage/add',
}


export { apiUrl,apiRoutes }