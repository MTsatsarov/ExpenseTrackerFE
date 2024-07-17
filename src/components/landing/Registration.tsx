import {
    Typography,
    Select,
    MenuItem,
    FormControl,
    Tooltip,
    IconButton,
    InputAdornment,
    InputLabel,
    ListItem,
    List,
    FormHelperText,
} from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import instance from '../../axios/axios';
import { apiUrl, apiRoutes } from '../../apiConfig';
import Toaster from '../utils/Toaster/Toaster';
import { useNavigate } from 'react-router-dom';
import Loader from '../utils/Loader/Loader';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';

import React from 'react';
import AppButton from '../guidlines/button/AppButton';
import { ColorTypes } from '../types/common-types';
import AppTextField from '../guidlines/textfield/AppTextField';
export interface IBaseRegistrationFields {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    isValidUsername: boolean;
    isValidFirstName: boolean;
    isValidLastName: boolean;
    isValidPassword: boolean;
    isValidEmail: boolean;
    isValidConfirmPassword: boolean;
    isTouchedUsername: boolean;
    isTouchedFirstName: boolean;
    isTouchedLastName: boolean;
    isTouchedPassword: boolean;
    isTouchedEmail: boolean;
    isTouchedConfirmPassword: boolean;
}
interface IRegistrationfields extends IBaseRegistrationFields {
    organization: string;
    currency: ICurrency | undefined;
    isValidOrganization: boolean;
    isValidCurrency: boolean;
    isTouchedOrganization: boolean;
    isTouchedCurrency: boolean;
}
interface ICurrency {
    currency: string;
    abbreviation: string;
    symbol: string;
}

const Register = () => {
    var navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [fields, setFields] = useState<IRegistrationfields>({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        isValidUsername: false,
        isValidFirstName: false,
        isValidLastName: false,
        isValidPassword: false,
        isValidEmail: false,
        isValidConfirmPassword: false,
        isTouchedUsername: false,
        isTouchedFirstName: false,
        isTouchedLastName: false,
        isTouchedPassword: false,
        isTouchedEmail: false,
        isTouchedConfirmPassword: false,
        organization: '',
        isValidOrganization: false,
        isTouchedOrganization: false,
        currency: undefined,
        isValidCurrency: false,
        isTouchedCurrency: false,
    });
    const [canRegister, setCanRegister] = useState<boolean>(false);
    const [currencies, setCurrencies] = useState<Array<ICurrency>>([]);
    const [isPassVisible, setIsPassVisible] = useState<boolean>(false);
    const [isConfirmPassVisible, setConfirmIsPassVisible] =
        useState<boolean>(false);

    const [passWordInfo, setPasswordInfo] = useState({
        hasNumber: false,
        isLongEnough: false,
        hasCapitalLetter: false,
        hasSmallLetter: false,
        hasSpecialSymbol: false,
    });
    useEffect(() => {
        const getCurrencies = async () => {
            await instance
                .get(`${apiUrl}/${apiRoutes.getCurrencies}`)
                .then((response) => {
                    setCurrencies(response.data as Array<ICurrency>);
                })
                .catch(function (error) {
                    if (error.response) {
                        var errors =
                            error.response &&
                            (error.response.data.message ||
                                error.response.data ||
                                error.response.statusText);
                        errors.split(/\r?\n/).forEach((message: string) => {
                            setLoading(false);
                            Toaster.show('error', '', message);
                        });
                    }
                });
        };
        getCurrencies();
    }, []);
    useEffect(() => {
        validateForm();
    }, [fields]);

    const setVisibleField = (fieldName: string) => {
        if (fieldName === 'password') {
            setIsPassVisible(!isPassVisible);
        }
        if (fieldName === 'confirmPassword') {
            setConfirmIsPassVisible(!isConfirmPassVisible);
        }
    };

    const handleChange = (event: any) => {
        let { name, value } = event.target;
        validateField(name, value);
    };

    const validateField = (field: any, value: string) => {
        var validUsername = fields.isValidUsername;
        var validFirstName = fields.isValidFirstName;
        var validLastName = fields.isValidLastName;
        var validEmail = fields.isValidEmail;
        var ValidPassword = fields.isValidPassword;
        var validConfirmPassword = fields.isValidConfirmPassword;
        var username = fields.username;
        var firstName = fields.firstName;
        var lastName = fields.lastName;
        var email = fields.email;
        var password = fields.password;
        var confirmPassword = fields.confirmPassword;
        var isTouchedUsername = fields.isTouchedUsername;
        var isTouchedFirstName = fields.isTouchedFirstName;
        var isTouchedLastName = fields.isTouchedLastName;
        var isTouchedPassword = fields.isTouchedPassword;
        var isTouchedEmail = fields.isTouchedEmail;
        var isTouchedConfirmPassword = fields.isTouchedConfirmPassword;
        var organization = fields.organization;
        var validOrganization = fields.isValidOrganization;
        var isTouchedOrganization = fields.isTouchedOrganization;
        var currency = fields.currency;
        var isValidCurrency = fields.isValidCurrency;
        var isTouchedCurrency = fields.isTouchedCurrency;
        switch (field) {
            case 'username':
                validUsername = value.length > 5 && value.length <= 20;
                username = value;
                isTouchedUsername = true;
                break;
            case 'firstName':
                validFirstName = value.length >= 2 && value.length <= 20;
                firstName = value;
                isTouchedFirstName = true;
                break;
            case 'lastName':
                validLastName = value.length >= 2 && value.length <= 20;
                lastName = value;
                isTouchedLastName = true;
                break;
            case 'email':
                validEmail = value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i)
                    ? true
                    : false;
                email = value;
                isTouchedEmail = true;
                break;
            case 'password':
                ValidPassword = value.match(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i
                )
                    ? true
                    : false;
                password = value;
                isTouchedPassword = true;

                setPasswordInfo((prevState) => ({
                    ...prevState,
                    isLongEnough: value.length >= 8 ? true : false,
                    hasNumber: value.match('.*[0-9].*') ? true : false,
                    hasCapitalLetter: value.match('.*[A-Z].*') ? true : false,
                    hasSmallLetter: value.match('.*[a-z].*') ? true : false,
                    hasSpecialSymbol: value.match('.*[!@#$%^&*)(+=._-].*')
                        ? true
                        : false,
                }));
                break;
            case 'confirmPassword':
                validConfirmPassword = value.match(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i
                )
                    ? true
                    : false;
                confirmPassword = value;
                isTouchedConfirmPassword = true;
                break;
            case 'organization':
                validOrganization =
                    value.length >= 2 && value.length <= 50 ? true : false;
                organization = value;
                isTouchedOrganization = true;
                break;
            case 'currency':
                var isValid = currencies.find((x) => x.currency === value);
                isValidCurrency = isValid ? true : false;
                if (isValidCurrency) {
                    currency = isValid;
                }

                isTouchedCurrency = true;
                break;
            default:
                break;
        }
        setFields((oldState) => ({
            ...oldState,
            isValidUsername: validUsername,
            isValidFirstName: validFirstName,
            isValidLastName: validLastName,
            isValidEmail: validEmail,
            isValidPassword: ValidPassword,
            isValidConfirmPassword: validConfirmPassword,
            username: username,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
            isTouchedUsername: isTouchedUsername,
            isTouchedFirstName: isTouchedFirstName,
            isTouchedLastName: isTouchedLastName,
            isTouchedEmail: isTouchedEmail,
            isTouchedPassword: isTouchedPassword,
            isTouchedConfirmPassword: isTouchedConfirmPassword,
            organization: organization,
            isValidOrganization: validOrganization,
            isTouchedOrganization: isTouchedOrganization,
            currency: currency,
            isValidCurrency: isValidCurrency,
            isTouchedCurrency: isTouchedCurrency,
        }));

        validateForm();
    };
    const validateForm = () => {
        var isValidForm =
            fields.isValidUsername &&
            fields.isValidFirstName &&
            fields.isValidLastName &&
            fields.isValidEmail &&
            fields.isValidPassword &&
            fields.isValidConfirmPassword &&
            fields.isTouchedUsername &&
            fields.isTouchedFirstName &&
            fields.isTouchedLastName &&
            fields.isTouchedEmail &&
            fields.isTouchedPassword &&
            fields.isTouchedConfirmPassword &&
            fields.password === fields.confirmPassword &&
            fields.password.length >= 8 &&
            fields.isValidOrganization &&
            fields.isTouchedOrganization &&
            fields.isValidCurrency &&
            fields.isTouchedCurrency;
        setCanRegister(isValidForm);
    };

    async function onSubmit(e: any) {
        e.preventDefault();
        setLoading(true);
        validateForm();
        if (canRegister) {
            await instance
                .post(`${apiUrl}/${apiRoutes.signUp}`, {
                    firstName: fields.firstName,
                    userName: fields.username,
                    lastName: fields.lastName,
                    email: fields.email,
                    password: fields.password,
                    organization: fields.organization,
                    currency: fields.currency,
                })
                .then((response) => {
                    navigate('/', { replace: true });
                })
                .catch(function (error) {
                    if (error.response) {
                        var errors =
                            error.response &&
                            (error.response.data.message ||
                                error.response.data ||
                                error.response.statusText);
                        errors.split(/\r?\n/).forEach((message: string) => {
                            setLoading(false);
                            Toaster.show('error', '', message);
                        });
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }
    return (
        <Box sx={{ p: 3, width: '100%', alignSelf: 'center' }}>
            <Typography sx={{ mb: 4 }} variant="h3">
                Register
            </Typography>
            <form
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    margin: '0px auto',
                    maxWidth: '50%',
                }}
                onSubmit={onSubmit}
            >
                <AppTextField
                    type="text"
                    name="username"
                    label="Username"
                    style={{ m: 1 }}
                    error={!fields.isValidUsername && fields.isTouchedUsername}
                    color={
                        fields.isValidUsername && fields.isTouchedUsername
                            ? ColorTypes.Success
                            : ColorTypes.Primary
                    }
                    focused={
                        fields.isValidUsername && fields.isTouchedUsername
                            ? true
                            : false
                    }
                    onChange={handleChange}
                    onBlur={handleChange}
                    helperText={
                        !fields.isValidUsername && fields.isTouchedUsername
                            ? 'Username must be maximum 20 characters long and minimum 5 characters long.'
                            : undefined
                    }
                />
                <AppTextField
                    type="text"
                    name="firstName"
                    label="FirstName"
                    style={{ m: 1 }}
                    error={
                        !fields.isValidFirstName && fields.isTouchedFirstName
                    }
                    color={
                        fields.isValidFirstName && fields.isTouchedFirstName
                            ? ColorTypes.Success
                            : ColorTypes.Primary
                    }
                    focused={
                        fields.isValidFirstName && fields.isTouchedFirstName
                            ? true
                            : false
                    }
                    onChange={handleChange}
                    onBlur={handleChange}
                    helperText={
                        !fields.isValidFirstName && fields.isTouchedFirstName
                            ? 'First name must be maximum 20 characters long and minimum 2 characters long.'
                            : undefined
                    }
                />
                <AppTextField
                    type="text"
                    name="lastName"
                    label="LastName"
                    style={{ m: 1 }}
                    error={!fields.isValidLastName && fields.isTouchedLastName}
                    color={
                        fields.isValidLastName && fields.isTouchedLastName
                            ? ColorTypes.Success
                            : ColorTypes.Primary
                    }
                    focused={
                        fields.isValidLastName && fields.isTouchedLastName
                            ? true
                            : false
                    }
                    onChange={handleChange}
                    onBlur={handleChange}
                    helperText={
                        !fields.isValidLastName && fields.isTouchedLastName
                            ? 'Last name must be maximum 20 characters long and minimum 2 characters long.'
                            : undefined
                    }
                />
                <AppTextField
                    type="email"
                    name="email"
                    label="Email"
                    style={{ m: 1 }}
                    error={!fields.isValidEmail && fields.isTouchedEmail}
                    color={
                        fields.isValidEmail && fields.isTouchedEmail
                            ? ColorTypes.Success
                            : ColorTypes.Primary
                    }
                    focused={
                        fields.isValidEmail && fields.isTouchedEmail
                            ? true
                            : false
                    }
                    onChange={handleChange}
                    onBlur={handleChange}
                    helperText={
                        !fields.isValidEmail && fields.isTouchedEmail
                            ? 'The provided email is invalid.'
                            : undefined
                    }
                />
                <FormControl>
                    <AppTextField
                        type={isPassVisible ? 'text' : 'password'}
                        name="password"
                        label="Password"
                        style={{ m: 1 }}
                        error={
                            !fields.isValidPassword && fields.isTouchedPassword
                        }
                        color={
                            fields.isValidPassword && fields.isTouchedPassword
                                ? ColorTypes.Success
                                : ColorTypes.Primary
                        }
                        focused={
                            fields.isValidPassword && fields.isTouchedPassword
                                ? true
                                : false
                        }
                        onChange={handleChange}
                        onBlur={handleChange}
                        inputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => {
                                            setVisibleField('password');
                                        }}
                                    >
                                        {isPassVisible ? (
                                            <VisibilityIcon color="primary" />
                                        ) : (
                                            <VisibilityOffIcon />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Tooltip
                        sx={{
                            position: 'relative',
                            bottom: '50px',
                            left: '110%',
                            width: '50px',
                            m: 0,
                        }}
                        color="primary"
                        title={
                            <React.Fragment>
                                <List sx={{ p: 0 }}>
                                    <ListItem sx={{ p: 0 }}>
                                        {passWordInfo.hasCapitalLetter ? (
                                            <CheckCircleIcon
                                                sx={{ mr: 1, fontSize: '14px' }}
                                                color="success"
                                            />
                                        ) : (
                                            <DoNotDisturbOnIcon
                                                color="error"
                                                sx={{ mr: 1, fontSize: '14px' }}
                                            />
                                        )}
                                        Contain capital letter.
                                    </ListItem>
                                    <ListItem sx={{ p: 0 }}>
                                        {passWordInfo.hasSmallLetter ? (
                                            <CheckCircleIcon
                                                sx={{ mr: 1, fontSize: '14px' }}
                                                color="success"
                                            />
                                        ) : (
                                            <DoNotDisturbOnIcon
                                                color="error"
                                                sx={{ mr: 1, fontSize: '14px' }}
                                            />
                                        )}
                                        Contain small letter.
                                    </ListItem>
                                    <ListItem sx={{ p: 0 }}>
                                        {passWordInfo.hasNumber ? (
                                            <CheckCircleIcon
                                                sx={{ mr: 1, fontSize: '14px' }}
                                                color="success"
                                            />
                                        ) : (
                                            <DoNotDisturbOnIcon
                                                color="error"
                                                sx={{ mr: 1, fontSize: '14px' }}
                                            />
                                        )}
                                        Contain number.
                                    </ListItem>
                                    <ListItem sx={{ p: 0 }}>
                                        {passWordInfo.hasSpecialSymbol ? (
                                            <CheckCircleIcon
                                                sx={{ mr: 1, fontSize: '14px' }}
                                                color="success"
                                            />
                                        ) : (
                                            <DoNotDisturbOnIcon
                                                color="error"
                                                sx={{ mr: 1, fontSize: '14px' }}
                                            />
                                        )}
                                        Contain special symbol.
                                    </ListItem>
                                    <ListItem sx={{ p: 0 }}>
                                        {passWordInfo.isLongEnough ? (
                                            <CheckCircleIcon
                                                sx={{ mr: 1, fontSize: '14px' }}
                                                color="success"
                                            />
                                        ) : (
                                            <DoNotDisturbOnIcon
                                                color="error"
                                                sx={{ mr: 1, fontSize: '14px' }}
                                            />
                                        )}
                                        Length is at least 8 characters long.
                                    </ListItem>
                                </List>
                            </React.Fragment>
                        }
                    >
                        {!fields.isValidPassword ? (
                            <InfoIcon />
                        ) : (
                            <CheckCircleIcon color="success" />
                        )}
                    </Tooltip>
                </FormControl>
                <AppTextField
                    type={isConfirmPassVisible ? 'text' : 'password'}
                    name="confirmPassword"
                    label="ConfirmPassword"
                    style={{ m: 1 }}
                    error={
                        !fields.isValidConfirmPassword &&
                        fields.isTouchedConfirmPassword
                    }
                    color={
                        fields.isValidConfirmPassword &&
                        fields.isTouchedConfirmPassword
                            ? ColorTypes.Success
                            : ColorTypes.Primary
                    }
                    focused={
                        fields.isValidConfirmPassword &&
                        fields.isTouchedConfirmPassword
                            ? true
                            : false
                    }
                    inputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => {
                                        setVisibleField('confirmPassword');
                                    }}
                                >
                                    {isConfirmPassVisible ? (
                                        <VisibilityIcon color="primary" />
                                    ) : (
                                        <VisibilityOffIcon />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    onChange={handleChange}
                    onBlur={handleChange}
                    helperText={
                        !fields.isValidConfirmPassword &&
                        fields.isTouchedConfirmPassword
                            ? "Passwords don't match."
                            : undefined
                    }
                />
                <AppTextField
                    type="text"
                    name="organization"
                    label="Organization"
                    style={{ m: 1 }}
                    error={
                        !fields.isValidOrganization &&
                        fields.isTouchedOrganization
                    }
                    color={
                        fields.isValidOrganization &&
                        fields.isTouchedOrganization
                            ? ColorTypes.Success
                            : ColorTypes.Primary
                    }
                    focused={
                        fields.isValidOrganization &&
                        fields.isTouchedOrganization
                            ? true
                            : false
                    }
                    onChange={handleChange}
                    onBlur={handleChange}
                    helperText={
                        !fields.isValidOrganization &&
                        fields.isTouchedOrganization
                            ? 'Length must be between 2 and 50 characters long'
                            : undefined
                    }
                />
                <Tooltip
                    sx={{
                        position: 'relative',
                        bottom: '50px',
                        left: '110%',
                        p: 0,
                        width: '50px',
                    }}
                    color="warning"
                    title="This is the name of your organization. It will be created for you automatically once the registration is succesful."
                >
                    <IconButton>
                        <LightbulbIcon />
                    </IconButton>
                </Tooltip>
                <FormControl
                    sx={{ marginLeft: '5px' }}
                    error={
                        !fields.isValidCurrency &&
                        fields.isTouchedCurrency &&
                        true
                    }
                >
                    <InputLabel id="currency-label">Currency</InputLabel>
                    <Select
                        name="currency"
                        title="Currency"
                        labelId="currency-label"
                        label="Currency"
                        sx={{ width: '99%' }}
                        error={
                            !fields.isValidCurrency && fields.isTouchedCurrency
                        }
                        color={
                            fields.isValidCurrency && fields.isTouchedCurrency
                                ? 'success'
                                : 'primary'
                        }
                        onChange={handleChange}
                        onBlur={handleChange}
                    >
                        {currencies.map((x) => (
                            <MenuItem className="d-flex" value={x.currency}>
                                {x.currency}{' '}
                            </MenuItem>
                        ))}
                    </Select>
                    {!fields.isValidCurrency && fields.isTouchedCurrency && (
                        <FormHelperText color="error">
                            Currency is required
                        </FormHelperText>
                    )}
                </FormControl>
                <Tooltip
                    sx={{
                        position: 'relative',
                        bottom: '50px',
                        left: '110%',
                        width: '50px',
                    }}
                    color="warning"
                    title="Please choose any currency. This Currency will be used for all of your transactions and you will not be able to change it!"
                >
                    <IconButton>
                        <LightbulbIcon />
                    </IconButton>
                </Tooltip>

                <AppButton
                    type="submit"
                    disabled={!canRegister}
                    inlineCss={{ m: 1, borderRadius: '14px', fontSize: '18px' }}
                    variant="outlined"
                >
                    Sign up
                </AppButton>
            </form>
            <Link to="/signIn">Already have an account</Link>
            {loading && <Loader />}
        </Box>
    );
};

export default Register;
