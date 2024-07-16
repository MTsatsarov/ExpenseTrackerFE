import { Button, ButtonPropsVariantOverrides } from '@mui/material';

import { OverridableStringUnion } from '@mui/types';

export enum ButtonSizes {
    Small ='small',
    Medium ='medium',
    Large = 'large',
}

interface IButtonProps {
    type?: 'button' | 'reset' | 'submit';
    variant: ButtonVariant;
    children?: React.ReactNode;
    color?:
        | 'primary'
        | 'inherit'
        | 'secondary'
        | 'success'
        | 'error'
        | 'info'
        | 'warning';

    size?: ButtonSizes;

    disabled?: boolean;

    className?: string;

    inlineCss?: object;

    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

type ButtonVariant = OverridableStringUnion<
    'text' | 'contained' | 'outlined',
    ButtonPropsVariantOverrides
>;

const AppButton = (props: IButtonProps) => {
    const {
        variant = 'contained',
        children,
        color = 'primary',
        size = ButtonSizes.Small,
        disabled = false,
        className = '',
        inlineCss = {},
        type = 'submit',
        onClick,
    } = props;

    const handleClick = (e: any) => {
        if(onClick){
            onClick(e);
        }
    }

    return (
        <Button
            variant={variant}
            color={color}
            size={size}
            disabled={disabled}
            className={className}
            sx={inlineCss}
            type={type}
            onClick={(e) => handleClick(e)}
        >
            {children}
        </Button>
    );
};
export default AppButton;
