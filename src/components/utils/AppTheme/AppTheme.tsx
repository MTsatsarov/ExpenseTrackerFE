import { createTheme } from '@mui/material/styles';

export const appTheme = createTheme({
	palette: {
		primary: {
			main: '#2196F3'

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
		}
	},
});