import { Box, Radio, Slide, Button, TablePagination } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from "react"
import { apiRoutes, apiUrl } from "../../../../apiConfig"
import instance from "../../../../axios/axios"
import { appTheme } from "../../../utils/AppTheme/AppTheme"
import Toaster from "../../../utils/Toaster/Toaster"
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditStorage from "./EditStorage/EditStorage";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Loader from "../../../utils/Loader/Loader";
import NewStorage from "./NewStorage/NewStorage";
import FiberNewIcon from '@mui/icons-material/FiberNew';
import { useAppSelector } from "../../../../app/hooks";

interface IBaseStorage {
	page: number,

	count: number,
	products: Array<IStorage>
}
export interface IStorage {
	id: string,
	product: string,
	quantity: number,
	lastUpdate: string,
	updatedBy: string,
}
const Storage = () => {

	const defaultPage = 1;
	const [storage, setStorage] = useState<Array<IStorage>>([])
	const [selectedRow, setSelectedRow] = useState<IStorage>({} as IStorage)
	const [canEdit, setCanEdit] = useState<boolean>(false)
	const [editModel, setEditModel] = useState<IStorage>({} as IStorage)
	const [isNew, setIsNew] = useState<boolean>(false)
	const [loading, setLoading] = useState<boolean>(false)
	const [newStorageModel, setNewStorageModel] = useState<IStorage>({} as IStorage)
	const [rowsPerPage, setRowsPerPage] = useState<number>(10);
	const [page, setPage] = useState<number>(1);
	const [count, setCount] = useState<number>(0);

	var user = useAppSelector((state) => state.user);

	useEffect(() => {

		getStorage(defaultPage,rowsPerPage);
	}, [])
	const getStorage = async (page:number,rowsPerPage:number) => {
		setLoading(true)
		instance.get(`${apiUrl}/${apiRoutes.getStorage}?page=${page}&itemsPerPage=${rowsPerPage}`).then((response) => {
			setStorage(response.data.products as Array<IStorage>)
			setCount(response.data.count)
		}).catch(function (error) {
			if (error.response) {
				var errors =
					error.response &&
					(error.response.data.message ||
						error.response.data ||
						error.response.statusText);
				errors.split(/\r?\n/).forEach((message: string) => {
					Toaster.show("error", "", message);
				})
			}
		}).finally(() => {
			setLoading(false)
		});
	}
	const onRowChange = (e: any) => {
		var selected = storage.find(x => x.id === e.target.value) ? storage.find(x => x.id === e.target.value) : null
		if (selected) {
			setSelectedRow(selected)
		}
	}

	const editRow = (e: any) => {
		setCanEdit(true)
	}

	const onCancelAction = () => {
		setCanEdit(false)
		setIsNew(false);
		setSelectedRow({} as IStorage)
	}
	const changeEditModel = (model: IStorage) => {
		setEditModel(model)
	}

	const editStorage = async () => {
		await instance.patch(`${apiUrl}/${apiRoutes.updateStorage}`, editModel).then((response) => {
			getStorage(1,rowsPerPage);
			onCancelAction();
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

	const showNewStorage = () => {
		onCancelAction();
		setIsNew(true);
	}

	const updateNewStorageModel = (e: any) => {
		var product = newStorageModel.product;
		var quantity = newStorageModel.quantity;
		if (e.target.name === 'product') {
			product = e.target.value
		}

		if (e.target.name === 'quantity') {
			quantity = e.target.value;
		}

		setNewStorageModel(prevState => ({
			...prevState,
			product: product,
			quantity: quantity,
		}))
	}

	const add = async () => {
		var model = {
			product: newStorageModel.product,
			quantity: newStorageModel.quantity,
			email: user.email
		}
		await instance.post(`${apiUrl}/${apiRoutes.addNewStore}`, model).then((response) => {
			setLoading(true)
			getStorage(1,rowsPerPage);
			onCancelAction();
			Toaster.show("success", "", `Succesfully added ${model.product}`);
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
		}).finally(() => {
			setLoading(false)
		});
	}
	const handleChangePage = async (
		event: React.MouseEvent<HTMLButtonElement> | null,
		newPage: number,
	) => {
		setPage(newPage+1);
		await getStorage(newPage+1,rowsPerPage)
	};
	const handleChangeRowsPerPage = async (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setRowsPerPage(parseInt(event.target.value,));
		await getStorage(page,parseInt(event.target.value,))
	};
	return (
		<>
			{loading ? <Loader /> :
				<Slide direction="left" in mountOnEnter unmountOnExit timeout={400}>
					<Box sx={{ padding: '2rem', width: '99%', margin: 'auto', mt: 4, background: appTheme.palette.primary.light, boxShadow: 3, }} >
						<Box className="d-flex justify-content-around text-capitalize" sx={{ maxWidth: '18%', marginLeft: '3rem' }}>
							{(!canEdit && !isNew) ?
								<>
									<span>
										<Button
											onClick={editRow}
											sx={{ height: '2.2rem', borderRadius: '2rem', fontSize: '0.9rem' }}
											variant="contained"
											disabled={!selectedRow.id}>
											Edit
										</Button>
									</span>
									<span>
										<Button onClick={showNewStorage}
											sx={{ height: '2.2rem', borderRadius: '2rem', fontSize: '0.9rem' }}
											variant="contained" >
											<AddBoxIcon fontSize="small" />
											Add
										</Button>
									</span>
									<span>
										<Button sx={{ height: '2.2rem', borderRadius: '2rem', fontSize: '0.9rem' }} color='error' variant="contained" disabled={!selectedRow.id}><DeleteIcon fontSize="small" />Delete</Button>
									</span>
								</>
								:
								<div>
									<span>
										<Button
											sx={{ height: '2.2rem', borderRadius: '2rem', fontSize: '0.9rem' }}
											color="error"
											variant="contained"
											disabled={!selectedRow}
											onClick={onCancelAction}>
											<CloseIcon fontSize="small" />
											Cancel
										</Button>
									</span>
									<span>
										<Button
											sx={{ height: '2.2rem', borderRadius: '2rem', fontSize: '0.9rem' }}
											variant="contained"
											color="success" onClick={canEdit ? editStorage : add}>
											<CheckIcon fontSize="small" />
											Confirm
										</Button>
									</span>
								</div>
							}
						</Box>
						<Box className="mt-1 d-flex flex-row align-items-center text-uppercase text-center" >
							<div
								style={{ flex: '0' }}
								className="mt-4 d-flex flex-row align-items-center w-100 text-uppercase text-center">
								<span style={{ width: '3.5rem' }} className="'px=1 mr-4 text-center"></span>
							</div>
							<Box style={{ background: appTheme.palette.primary.main, color: 'white', width: '31.2%', paddingRight: '1rem', borderRadius: '5px 5px 0 0', padding: '0.4rem' }} sx={{ boxShadow: 1 }}>
								<strong>Product</strong>
							</Box>
							<Box style={{ background: appTheme.palette.primary.main, color: 'white', position: 'relative', width: '21.1%', borderRadius: '5px 5px 0 0', padding: '0.4rem' }} className="mx-2">
								<strong>Quantity</strong>
							</Box>
							<Box style={{ background: appTheme.palette.primary.main, color: 'white', position: 'relative', width: '21.1%', borderRadius: '5px 5px 0 0', padding: '0.4rem' }}>
								<strong>Last Update</strong>
							</Box>
							<Box style={{ background: appTheme.palette.primary.main, color: 'white', position: 'relative', width: '21.1%', borderRadius: '5px 5px 0 0', padding: '0.4rem' }} className="mx-2">
								<strong>Updated By</strong>
							</Box>
						</Box>
						{isNew &&
							<div className="d-flex flex-row align-items-center text-center" >
								<span style={{ width: '3.5rem' }} className="py-4 px-1 mr-4 text-center">
									<FiberNewIcon color="primary" />
								</span>
								<NewStorage onChange={updateNewStorageModel} />
							</div>}
						{
							storage.map(s =>
								<div key={s.id} className="d-flex flex-row align-items-center text-center" >
									<span style={{ width: '3.5rem' }} className="py-4 px-1 mr-4 text-center">
										<Radio disabled={canEdit && selectedRow.id !== s.id} value={s.id} checked={selectedRow.id === s.id && true} onChange={(e) => onRowChange(e)} />
									</span>
									<EditStorage model={s} changeEditModel={changeEditModel} canEdit={canEdit && selectedRow.id === s.id} />
								</div>)
						}
						<TablePagination
							component="div"
							count={count}
							page={page-1}
							onPageChange={handleChangePage}
							rowsPerPage={rowsPerPage}
							rowsPerPageOptions={[5, 10, 25]}
							onRowsPerPageChange={handleChangeRowsPerPage}
						/>
					</Box >
				</Slide>}
		</>
	)
}

export default Storage