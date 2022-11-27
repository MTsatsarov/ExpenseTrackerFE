import "./App.css";
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Landing from "./components/Landing";
import ClientPortal from "./components/pages/ClientPortal";
import { CssBaseline, PaletteMode, ThemeProvider } from "@mui/material";
import { getDesignTokens } from "./components/utils/AppTheme/AppTheme";
import { createTheme } from "@mui/material/styles";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { setMode } from "./features/Theme/ThemeSlice";
function App() {

	var dispatch = useAppDispatch();
	const [myMode, setMyMode] = useState<PaletteMode>("light")
	const colorMode = React.useMemo(
		() => ({
			// The dark mode switch would invoke this method
			toggleColorMode: () => {
				dispatch(setMode((prevMode: PaletteMode) =>
					prevMode === 'light' ? 'dark' : 'light',
				));
			},
		}),
		[],
	);

	const getTheme = (theme: PaletteMode) => {
		dispatch(setMode(theme))
		setMyMode(theme)
	}
	const theme = React.useMemo(() => createTheme(getDesignTokens(myMode)), [myMode]);
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<div className="App">
				<Routes>
					<Route path="/portal/user/*" element={<ClientPortal getTheme={getTheme} />} />
					<Route path="/*" element={<Landing />} />
				</Routes>
			</div>
		</ThemeProvider>
	);
}

export default App;
