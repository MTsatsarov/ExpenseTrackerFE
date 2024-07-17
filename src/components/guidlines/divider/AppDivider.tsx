import { Divider } from '@mui/material';

interface IAppDividerProps {
    style?: {};
}

const AppDivider = (props: IAppDividerProps) => {
    const { style } = props;
    return <Divider style={style} />;
};

export default AppDivider;
