const apiUrl = "https://localhost:44305/api"


const apiRoutes = {
	signIn: 'account/signIn',
	signUp: 'account/signUp',
	logOut: 'account/logOut',
	createExpense: 'transaction/create',
	getTransactions: 'transaction/getTransactions',
	getTrransactionsByUser: 'transaction/getUserTransactions',
	getDashboard: 'transaction/getDashboardTransactions',
	getStores: 'store/getStores',
	getProducts: 'product/getProducts',
	getCurrentUser: 'account/current',
	getTransactionDetails:'transaction/details',
	changePass:'account/changePassword',
	updateUser:'account/updateUser'
}


export { apiUrl,apiRoutes }