import { PaletteMode } from "@mui/material";
import { deepOrange, grey } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export const appTheme = createTheme({
	palette: {
		primary: {
			main: '#2196F3',
			dark: '#1C272C',
			light: '#353a4821'

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

export const getDesignTokens = (mode: PaletteMode) => ({
	palette: {
		mode,
		primary: {
			main: '#2196F3',
			dark: '#1C272C',
			light: '#353a4821'

		},
		secondary: {
			main: '#393838',
		},
		background: {
			//paper: '#D45705'
		}
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
		MuiTable: {
			styleOverrides: {
				root: {
					'& .MuiTableCell-stickyHeader': {
						background: '#2196F3'
					}
				}
			}
		},
		MuiDrawer: {
			styleOverrides: {
				root: {
					background: '#2196F3'

				}
			}
		}

	},
});