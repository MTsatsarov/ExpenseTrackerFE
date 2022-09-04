import {createBrowserHistory} from "history"

const BrowserHistory = createBrowserHistory({
	basename: process.env.PUBLIC_URL,
	forceRefresh:true
})

export default BrowserHistory