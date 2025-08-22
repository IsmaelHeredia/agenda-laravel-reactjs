import React from 'react';
import {
    Modal,
    Box,
    Typography,
    Tabs,
    Tab,
    Avatar,
    InputAdornment,
    styled,
    useTheme,
    IconButton,
} from '@mui/material';
import { Controller, FieldErrors, Control } from 'react-hook-form';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import CloseIcon from '@mui/icons-material/Close';
import CancelIcon from '@mui/icons-material/Cancel';
import LoadingButton from '@mui/lab/LoadingButton';

import {
    FormTextField,
    GeneralButton,
    GeneralIconButton
} from '@/components/CustomTextFields/CustomTextFields';

export interface UserProfileFormFields {
    username: string;
    currentPassword: string;
}

export interface PasswordFormInputs {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}

interface AccountModalPresentationalProps {
    open: boolean;
    handleCancel: () => void;
    tabValue: number;
    handleTabChange: (event: React.SyntheticEvent, newValue: number) => void;
    profileImagePreview: string;
    handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
    userControl: Control<UserProfileFormFields>;
    userErrors: FieldErrors<UserProfileFormFields>;
    showCurrentPassword: boolean;
    setShowCurrentPassword: (show: boolean) => void;
    passwordControl: Control<PasswordFormInputs>;
    passwordErrors: FieldErrors<PasswordFormInputs>;
    showNewPassword: boolean;
    setShowNewPassword: (show: boolean) => void;
    showConfirmNewPassword: boolean;
    setShowConfirmNewPassword: (show: boolean) => void;
    loading: boolean;
    handleSave: () => void;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', sm: 600 },
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
};

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
            style={{ width: '100%' }}
        >
            {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const AccountModalPresentational: React.FC<AccountModalPresentationalProps> = ({
    open,
    handleCancel,
    tabValue,
    handleTabChange,
    profileImagePreview,
    handleImageUpload,
    userControl,
    userErrors,
    showCurrentPassword,
    setShowCurrentPassword,
    passwordControl,
    passwordErrors,
    showNewPassword,
    setShowNewPassword,
    showConfirmNewPassword,
    setShowConfirmNewPassword,
    loading,
    handleSave,
}) => {
    const theme = useTheme();

    return (
        <Modal
            open={open}
            onClose={handleCancel}
            aria-labelledby="profile-settings-modal-title"
            aria-describedby="profile-settings-modal-description"
        >
            <Box sx={style}>
                <Box sx={{
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mb: 2,
                    width: '100%',
                    minHeight: '48px'
                }}>
                    <Typography
                        id="profile-settings-modal-title"
                        variant="h5"
                        component="h2"
                        gutterBottom
                        sx={{
                            fontWeight: 'bold',
                            color: 'primary.main',
                            mt: 3,
                            textAlign: 'center',
                            flexGrow: 1,
                            mr: 5
                        }}
                    >
                        Ajustes de Perfil
                    </Typography>

                    <GeneralIconButton
                        aria-label="close"
                        onClick={handleCancel}
                        sx={{
                            position: 'absolute',
                            right: 0,
                            top: 0,
                            mt: 1,
                            mr: 1
                        }}
                    >
                        <CloseIcon />
                    </GeneralIconButton>
                </Box>

                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={tabValue} onChange={handleTabChange} aria-label="profile settings tabs" centered>
                        <Tab label="Información General" icon={<PersonIcon />} iconPosition="start" {...a11yProps(0)} />
                        <Tab label="Contraseña" icon={<LockIcon />} iconPosition="start" {...a11yProps(1)} />
                    </Tabs>
                </Box>

                <TabPanel value={tabValue} index={0}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                        <Box sx={{ position: 'relative', width: 100, height: 100 }}>
                            <Avatar sx={{ width: '100%', height: '100%', bgcolor: 'grey.300' }}>
                                {profileImagePreview ? (
                                    <img
                                        src={profileImagePreview}
                                        alt={"User Avatar"}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                ) : (
                                    <PersonIcon sx={{ fontSize: 60, color: 'grey.600' }} />
                                )}
                            </Avatar>
                            <IconButton
                                component="label"
                                sx={{
                                    position: 'absolute',
                                    bottom: 0,
                                    right: 0,
                                    backgroundColor: 'primary.main',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: 'primary.dark',
                                    },
                                }}
                            >
                                <PhotoCameraIcon />
                                <VisuallyHiddenInput type="file" accept="image/*" onChange={handleImageUpload} />
                            </IconButton>
                        </Box>

                        <Controller
                            name="username"
                            control={userControl}
                            render={({ field }) => (
                                <FormTextField
                                    {...field}
                                    label="Nombre de Usuario"
                                    variant="outlined"
                                    fullWidth
                                    error={!!userErrors.username}
                                    helperText={userErrors.username?.message}
                                />
                            )}
                        />

                        <Controller
                            name="currentPassword"
                            control={userControl}
                            render={({ field }) => (
                                <FormTextField
                                    {...field}
                                    label="Contraseña Actual"
                                    type={showCurrentPassword ? 'text' : 'password'}
                                    variant="outlined"
                                    fullWidth
                                    error={!!userErrors.currentPassword}
                                    helperText={userErrors.currentPassword?.message}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <GeneralIconButton
                                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                                    edge="end"
                                                >
                                                    {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                                                </GeneralIconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            )}
                        />
                    </Box>
                </TabPanel>

                <TabPanel value={tabValue} index={1}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                        <Controller
                            name="currentPassword"
                            control={passwordControl}
                            render={({ field }) => (
                                <FormTextField
                                    {...field}
                                    label="Contraseña Actual"
                                    type={showCurrentPassword ? 'text' : 'password'}
                                    variant="outlined"
                                    fullWidth
                                    error={!!passwordErrors.currentPassword}
                                    helperText={passwordErrors.currentPassword?.message}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <GeneralIconButton
                                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                                    edge="end"
                                                >
                                                    {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                                                </GeneralIconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            )}
                        />
                        <Controller
                            name="newPassword"
                            control={passwordControl}
                            render={({ field }) => (
                                <FormTextField
                                    {...field}
                                    label="Nueva Contraseña"
                                    type={showNewPassword ? 'text' : 'password'}
                                    variant="outlined"
                                    fullWidth
                                    error={!!passwordErrors.newPassword}
                                    helperText={passwordErrors.newPassword?.message}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <GeneralIconButton
                                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                                    edge="end"
                                                >
                                                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                                </GeneralIconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            )}
                        />
                        <Controller
                            name="confirmNewPassword"
                            control={passwordControl}
                            render={({ field }) => (
                                <FormTextField
                                    {...field}
                                    label="Confirmar Nueva Contraseña"
                                    type={showConfirmNewPassword ? 'text' : 'password'}
                                    variant="outlined"
                                    fullWidth
                                    error={!!passwordErrors.confirmNewPassword}
                                    helperText={passwordErrors.confirmNewPassword?.message}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <GeneralIconButton
                                                    onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                                                    edge="end"
                                                >
                                                    {showConfirmNewPassword ? <VisibilityOff /> : <Visibility />}
                                                </GeneralIconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            )}
                        />
                    </Box>
                </TabPanel>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3, width: '100%' }}>
                    <GeneralButton
                        variant="outlined"
                        onClick={handleCancel}
                        disabled={loading}
                        startIcon={<CancelIcon />}
                        sx={{
                            borderColor: theme.palette.grey[400],
                            color: theme.palette.text.primary,
                            '&:hover': {
                                borderColor: theme.palette.grey[600],
                                backgroundColor: theme.palette.action.hover,
                            },
                        }}
                    >
                        Cancelar
                    </GeneralButton>
                    <LoadingButton
                        onClick={handleSave}
                        variant="contained"
                        color="primary"
                        loading={loading}
                        disabled={loading}
                        loadingPosition="start"
                        startIcon={<LockIcon />}
                    >
                        Guardar Cambios
                    </LoadingButton>
                </Box>
            </Box>
        </Modal>
    );
};

export default AccountModalPresentational;