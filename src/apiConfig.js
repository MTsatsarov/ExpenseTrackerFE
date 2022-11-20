const apiUrl = "https://localhost:44305/api"


const apiRoutes = {

	//Account
	signIn: 'account/signIn',
	signUp: 'account/signUp',
	logOut: 'account/logOut',
	changePass: 'account/changePassword',
	updateUser: 'account/updateUser',
	getCurrentUser: 'account/current',

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

	//Organization
	addEmployee: 'organization/addEmployee',
	getEmployees:'organization/getEmployees',
	getCurrencies:'organization/currencies',
}


export { apiUrl,apiRoutes }