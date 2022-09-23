import { createTheme } from "@mui/material/styles";

export const appTheme = createTheme({
	palette: {
		primary: {
			main: '#2196F3',
			dark:'#1C272C'

		},
		secondary: {
			main: '#393838',
		},

	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					fontSize: '1rem',
					//'&:hover': {
					//	backgroundColor: 'white'
					//}
				},
			},
		},

		MuiListItem: {
			styleOverrides: {
				root: {
					'&.Mui-selected': {
						backgroundColor: '#2196F3'
					}
				}
			}
		},
	},
});