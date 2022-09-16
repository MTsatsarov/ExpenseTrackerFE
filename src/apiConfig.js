const apiUrl = "https://localhost:7017/api"


const apiRoutes = {
signIn:'account/signIn',
signUp:'account/signUp',
createExpense:'transaction/create',
getTransactions:'transaction/getTransactions',
getTrransactionsByUser:'transaction/getUserTransactions'
}


export {apiUrl,apiRoutes}