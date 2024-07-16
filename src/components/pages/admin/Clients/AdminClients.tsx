import { AppBar, Box, Button, Menu, MenuItem } from "@mui/material"
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useEffect, useState } from "react";
import { apiRoutes, apiUrl } from "../../../../apiConfig";
import instance from "../../../../axios/axios";
import Toaster from "../../../utils/Toaster/Toaster";
import UserInfo from "./UserInfo/UserInfo";
import CustomDatagrid from "../../../guidlines/datagrid/CustomDatagrid";
import AppButton from "../../../guidlines/button/AppButton";

interface IClientList {
	id: string,
	email: string,
	firstName: string,
	lastName: string,
	organization: string,
	createdOn: string,
	totalTransactions: number,
	anchorEl: any | null
}
const AdminClients = () => {

	const [clients, setClients] = useState<Array<IClientList>>([])
	const [count, setCount] = useState<number>(0)
	const [itemsPerPage, setItemsPerPage] = useState<number>(5)
	const [showUserInfoModal, setShowUserInfoModal] = useState<boolean>(false)
	const [selectedUser, setSelectedUser] = useState<string>('')
	useEffect(() => {
		getClients();
	}, [])

	const pageSizeChange = (e: any) => {
		setItemsPerPage(e)
	}

	const handleClick = (e: any, id: string) => {
		var filteredClients = clients.map(x => {
			if (x.id === id) {
				return { ...x, anchorEl: e.currentTarget }
			}
			return { ...x, anchorEl: null }
		})
		setClients(filteredClients)
	}

	const handleCLose = (e: any, id: string) => {
		var filteredClients = clients.map(c => c.id === id ? { ...c, anchorEl: null } : c)
		setClients(filteredClients)
	}

const showUserInfo = (userId:string) => {
	setShowUserInfoModal(true);
	setSelectedUser(userId)
}

	const setDataGridActions = (params: any) => {
		let clientData = params.row;
		let action = (
			<div key={clientData?.id}>
				<AppButton
					variant="contained"
					inlineCss={{ width: "100px", }}
					onClick={(e) => handleClick(e, clientData.id)}
				>
					Actions
				</AppButton>

				<Menu
					anchorEl={clientData?.anchorEl}
					open={(clientData?.anchorEl) ? true : false}
					onClose={(e) => handleCLose(e, clientData?.id)}

				>
					<MenuItem onClick={()=>showUserInfo(clientData?.id)}>User info</MenuItem>
					<MenuItem>User transactions</MenuItem>
				</Menu>
			</div>

		)

		return action;
	}

	const getClients = async () => {
		await instance.get(`${apiUrl}/${apiRoutes.getAllClients}`).then((response) => {
			if (response.status === 200 || response.status === 201) {
				setCount(response.data.count)
				setClients(response.data.clients as Array<IClientList>)
			}
		}).catch(function (error) {
			if (error.response) {
				var errors =
					error.response &&
					(error.response.data.message ||
						error.response.data ||
						error.response.statusText);
				errors.split(/\r?\n/).forEach((message: string) => {
					Toaster.show("error", "", message);
				});
			}
		});
	}

	const columns: GridColDef[] = [
		{ field: 'id', headerName: 'ID', width: 300 },
		{
			field: 'email',
			headerName: 'Email',
			width: 200,
			editable: true,
		},
		{
			field: 'firstName',
			headerName: 'First Name',
			width: 150,
			editable: true,
		},
		{
			field: 'lastName',
			headerName: 'Last name',
			width: 110,
			editable: true,
		},
		{
			field: 'organization',
			headerName: 'Organization',
			sortable: false,
			width: 160,
		},
		{
			field: 'totalTransactions',
			headerName: 'Transactions count',
			description: 'This is the total number of transactions created by the user.',

			width: 110,
			editable: true,
		},
		{
			field: 'createdOn',
			headerName: 'Registration date',
			width: 230,
			editable: true,
		},
		{
			field: 'actions',
			headerName: 'Actions',
			width: 110,
			editable: true,
			renderCell: setDataGridActions
		},
	];

	const closeModal = () => {
		setShowUserInfoModal(false);
	}
	return (
		<Box sx={{ mt: 10, height: 800, p: 8 }}>
			<CustomDatagrid
				rows={clients}
				columns={columns}
				itemsPerPage={itemsPerPage}
				handlePageSizeChange={pageSizeChange}
				disableSelectionOnClick
			/>
			{showUserInfoModal && <UserInfo id={selectedUser} onClose={closeModal} />}
		</Box>
	)
}
export default AdminClients