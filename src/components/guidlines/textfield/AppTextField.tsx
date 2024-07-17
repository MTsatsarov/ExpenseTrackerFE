import { TextField } from '@mui/material';
import { ColorTypes } from '../../types/common-types';
interface IAppTextField {
    type?: string;
    name: string;
    label: string;
    color?: ColorTypes;
    error?: boolean;
    focused: boolean;
    onChange: (event: any) => void;
    onBlur: (event: any) => void;
    helperText?: string;
    style: {};

    inputProps?: {};
}
const AppTextField = (props: IAppTextField) => {
    const {
        type = 'text',
        name,
        label,
        color = ColorTypes.Primary,
        error,
        focused,
        onChange,
        onBlur,
        helperText = null,
        inputProps = {},
    } = props;
    return (
        <TextField
            type={type}
            name={name}
            label={label}
            sx={{ m: 1 }}
            error={error}
            color={color}
            focused={focused}
            onChange={onChange}
            onBlur={onBlur}
            helperText={helperText}
            InputProps={inputProps}
        />
    );
};

export default AppTextField;
