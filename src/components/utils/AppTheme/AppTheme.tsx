import { createTheme } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';

export const appTheme = createTheme({
	palette: {
		primary: {
			main: '#2196F3'
		},
		secondary: {
			main: green[500],
		},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					fontSize: '1rem',
				},
			},
		},
	},
	//  typography: {
	//    primary: {
	//      main: '#2196F3'
	//    },
	//    secondary: {
	//      main: green[500],
	//    },
	//  },
});