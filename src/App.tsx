import "./App.css";
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Landing from "./components/Landing";
import ClientPortal from "./components/pages/ClientPortal";
import { CssBaseline, PaletteMode, ThemeProvider } from "@mui/material";
import { getDesignTokens } from "./components/utils/AppTheme/AppTheme";
import { createTheme } from "@mui/material/styles";
import React, { useState } from "react";
import {useAppSelector } from "./app/hooks";
import AdminPortal from "./components/pages/admin/AdminPortal"
function App() {

	var mode = useAppSelector(store => store.user.themeMode)
	const [myMode, setMyMode] = useState<PaletteMode>(mode)

	const getTheme = (theme: PaletteMode) => {
		setMyMode(theme)
	}

	const theme = React.useMemo(() => createTheme(getDesignTokens(myMode)), [myMode]);
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<div className="App">
				<Routes>
					<Route path="/portal/user/*" element={<ClientPortal getTheme={getTheme} />} />
					<Route path="/portal/admin/*" element={<AdminPortal getTheme={getTheme}  />} />
					<Route path="/*" element={<Landing />} />
				</Routes>
			</div>
		</ThemeProvider>
	);
}

export default App;
