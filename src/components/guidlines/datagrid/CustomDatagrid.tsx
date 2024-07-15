import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface ICustomDatagridProps {
    rows: any[];
    columns: GridColDef[];
    itemsPerPage: number;
    handlePageSizeChange: (e: any) => void;

    disableSelectionOnClick?: boolean;
}

const CustomDatagrid = (props: ICustomDatagridProps) => {
    return (
        <DataGrid
            rows={props.rows}
            columns={props.columns}
            pageSize={props.itemsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
            onPageSizeChange={props.handlePageSizeChange}
            disableSelectionOnClick={props.disableSelectionOnClick ?? true}
            experimentalFeatures={{ newEditingApi: true }}
        />
    );
};

export default CustomDatagrid;
