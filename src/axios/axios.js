import axios from 'axios'
import { apiUrl,apiRoutes } from "../apiConfig.js"
import { store } from '../app/store.js';
import BrowserHistory from '../components/utils/BrowserHistory/BrowserHistory.js';
import Toaster from "../components/utils/Toaster/Toaster";
import { logOutUser } from '../features/User/userSlice.js';

const instance = axios.create({
	baseURL: window.location.protocol + "//" + window.location.host,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json"
	}
})


instance.interceptors.request.use(
	config => {
		const token = localStorage.getItem("access_token")
		if (token) {
			config.headers["Authorization"] = `Bearer ${token}`
		}

		return config;
	},
	error => {
		Promise.reject(error);
	}
);

instance.interceptors.response.use(
	response => {
		return response
	},

	function (error) {
		var location = window.location;
		var locationPathname = location.pathname.replace(process.env.PUBLIC_URL,"");
		var originalRequest = error.config
		console.log(originalRequest)
		originalRequest._retry = false;
		var responseStatus = error.response.status;
		if (error.response && responseStatus === 401) {
			const refreshToken = localStorage.getItem("refresh_token")
			var state = store.getState();
			if (refreshToken) {
				return instance
					.post(`${apiUrl}/${apiRoutes.refreshToken}`,{
						refreshToken: refreshToken,
						userId: state.user.id
					}).then(res => {

						if (res.status === 201 || res.status === 200) {
							localStorage.setItem("access_token",res.data.token)
							localStorage.setItem("refresh_token",res.data.accessToken)

						}
						else {
							store.dispatch(logOutUser())
							BrowserHistory.push({ pathname: "/signIn",state: { redirectPath: null } })
							Promise.reject({});
						}
					}).catch((error) => {
						store.dispatch(logOutUser())
						BrowserHistory.go({ pathname: "/signIn",state: { redirectPath: null } })
						Promise.reject({});
					})
			}

			else {
				BrowserHistory.push({ pathname: "/signIn",state: { redirectPath: null } })
				BrowserHistory.go({ pathname: "/signIn",state: { redirectPath: null } })
				Promise.reject({});
			}
		}

		if (error.response) {
			var errors = error.response && (
				error.response.data.message || error.response.data || error.response.statusText
			)
			errors.split(/\r?\n/).forEach((message) => {
				//setLoading(false)
				Toaster.show('error','',message)
			})
		}
		Promise.reject({});
	})

export default instance

