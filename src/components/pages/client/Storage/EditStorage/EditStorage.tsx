import { Card, CardContent, TextField, FormControl } from "@mui/material"
import { useState, useEffect } from "react"
import { IStorage } from "../Storage"

interface IEditStorageProps {
	model: IStorage,
	canEdit: boolean,
	changeEditModel: Function,
}

const EditStorage = (props: IEditStorageProps) => {
	const [editedModel, setEditedModel] = useState<IStorage>(props.model)

	const onChangeModel = (e: any) => {
		var quantity = editedModel.quantity;
		switch (e.target.name) {
			case "quantity":
				quantity = e.target.value
				break;
		}
		setEditedModel(prevState => ({ ...prevState, quantity: quantity }))
	}
	useEffect(() => {
		props.changeEditModel(editedModel)
	}, [editedModel])

	return (
		<>
			<Card style={{ width: '31.2%', height: '3.5rem', marginRight: '0.4Rem', marginTop: '1rem', background: props.canEdit ? "#bee6fa" : 'white' }}>
				<CardContent className='d-flex flex-row align-items-center p-0 w-100' >
					<span className="flex-2 mx-2">
						<FormControl className="w-400">
							<TextField
								sx={{ minWidth: '30rem', p: 1 }}
								variant="standard"
								value={props.model.product}
								disabled={true}
								name="product" />
						</FormControl>
					</span>
				</CardContent>
			</Card>
			<Card style={{ width: '21.1%', height: '3.5rem', marginRight: '0.4Rem', marginTop: '1rem', background: props.canEdit ? "#bee6fa" : 'white' }}>
				<CardContent className='d-flex flex-row align-items-center p-0 w-100' >
					<span className="flex-2 mx-2">
						<FormControl className="w-200">
							<TextField
								sx={{ minWidth: '20rem', p: 1 }}
								variant="standard"
								name="quantity"
								value={props.canEdit ? editedModel.quantity : props.model.quantity}
								disabled={!props.canEdit}
								error={props.canEdit ? editedModel.quantity < 0 : props.model.quantity < 0}
								onChange={onChangeModel}
								type="number"
								InputProps={{ inputProps: { min: 0,step:0.01 } }}
							/>
						</FormControl>
					</span>
				</CardContent>
			</Card>
			<Card style={{ width: '21.1%', height: "3.5rem", marginRight: '0.4Rem', marginTop: '1rem', background: props.canEdit ? "#bee6fa" : 'white' }}>
				<CardContent className='d-flex flex-row align-items-center p-0 w-100' >
					<span className="flex-2 mx-2">
						<FormControl className="w-200">
							<TextField
								sx={{ minWidth: '20rem', p: 1 }}
								variant="standard"
								value={props.model.lastUpdate}
								disabled={true}

							/>
						</FormControl>
					</span>
				</CardContent>
			</Card>
			<Card style={{ width: '21.1%', height: "3.5rem", marginRight: '0.4Rem', marginTop: '1rem', background: props.canEdit ? "#bee6fa" : 'white' }}>
				<CardContent className='d-flex flex-row align-items-center p-0 w-400' >
					<span className="mx-2">
						<FormControl className="w-300" >
							<TextField sx={{ minWidth: '20rem', p: 1 }} variant="standard" value={props.model.updatedBy} disabled={true} ></TextField>
						</FormControl>
					</span>
				</CardContent>
			</Card></>
	)
}

export default EditStorage