import { Card, CardContent, TextField, FormControl } from "@mui/material"
import { useAppSelector } from "../../../../../app/hooks"

interface INewStorageProps {
	onChange: Function
}
const NewStorage = (props: INewStorageProps) => {
	var mode = useAppSelector(store => store.user.themeMode)
	return (
		<>
			<Card style={{ width: '31.2%', height: '3.5rem', marginRight: '0.4Rem', marginTop: '1rem', background: `${mode}` === 'light' ? '#bee6fa' : '#212121' }}>
				<CardContent className='d-flex flex-row align-items-center p-0 w-100' >
					<span className="flex-2 mx-2">
						<FormControl className="w-400">
							<TextField
								sx={{ minWidth: '30rem', p: 1 }}
								variant="standard"
								name="product"
								onChange={(e) => props.onChange(e)}
							/>
						</FormControl>
					</span>
				</CardContent>
			</Card>
			<Card style={{ width: '21.1%', height: '3.5rem', marginRight: '0.4Rem', marginTop: '1rem', background: `${mode}` === 'light' ? '#bee6fa' : '#212121'  }}>
				<CardContent className='d-flex flex-row align-items-center p-0 w-100' >
					<span className="flex-2 mx-2">
						<FormControl className="w-200">
							<TextField
								sx={{ minWidth: '20rem', p: 1 }}
								variant="standard"
								name="quantity"
								type="number"
								InputProps={{ inputProps: { min: 0.01, step: 0.01 } }}
								onChange={(e) => props.onChange(e)} />
						</FormControl>
					</span>
				</CardContent>
			</Card>
			<Card style={{ width: '21.1%', height: "3.5rem", marginRight: '0.4Rem', marginTop: '1rem', background: `${mode}` === 'light' ? '#bee6fa' : '#212121' }}>
				<CardContent className='d-flex flex-row align-items-center p-0 w-100' >
					<span className="flex-2 mx-2">
						<FormControl className="w-200">
							<TextField
								sx={{ minWidth: '20rem', p: 1 }}
								variant="standard"
								disabled={true}
							/>
						</FormControl>
					</span>
				</CardContent>
			</Card>
			<Card style={{ width: '21.1%', height: "3.5rem", marginRight: '0.4Rem', marginTop: '1rem', background: `${mode}` === 'light' ? '#bee6fa' : '#212121' }}>
				<CardContent className='d-flex flex-row align-items-center p-0 w-400' >
					<span className="mx-2">
						<FormControl className="w-300" >
							<TextField sx={{ minWidth: '20rem', p: 1 }} variant="standard" disabled={true} ></TextField>
						</FormControl>
					</span>
				</CardContent>
			</Card></>
	)
}

export default NewStorage