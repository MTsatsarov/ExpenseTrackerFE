const apiUrl = "https://localhost:7017/api"


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
	getTransactionDetails:'transaction/details'
}


export { apiUrl,apiRoutes }