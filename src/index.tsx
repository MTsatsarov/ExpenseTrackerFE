import React from "react";
import { appTheme } from "../src/components/utils/AppTheme/AppTheme";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
const persistor = persistStore(store);
const container = document.getElementById("root")!;
const root = createRoot(container);
root.render(
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<BrowserRouter>
					<ThemeProvider theme={appTheme}>
					<CssBaseline />
						<App />
					</ThemeProvider>
				</BrowserRouter>
			</PersistGate>
		</Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
