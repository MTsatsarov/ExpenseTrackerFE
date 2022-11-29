const apiUrl = "https://localhost:44305/api"


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

	//Storage
	getStorage:'storage/storage',
	updateStorage:'storage/update',
	addNewStore:'storage/add',
}


export { apiUrl,apiRoutes }