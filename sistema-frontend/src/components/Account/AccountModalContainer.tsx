import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler, Control, FieldErrors } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useTheme } from '@mui/material/styles';

import AccountModalPresentational from './AccountModalPresentational';

import { useActualizarCuentaMutation, useValidarTokenQuery } from "@store/api/apiSlices";
import { toastRedirect } from '@/utils/toastRedirect';
import { useDispatch } from 'react-redux';

export interface UserFormInputs {
    username: string;
}

export interface PasswordFormInputs {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}

interface UserProfileFormFields {
    username: string;
    currentPassword: string;
}

const passwordSchema = yup.object().shape({
    currentPassword: yup.string().required('La contraseña actual es obligatoria.'),
    newPassword: yup
        .string()
        .min(6, 'La nueva contraseña debe tener al menos 6 caracteres.')
        .required('La nueva contraseña es obligatoria.'),
    confirmNewPassword: yup
        .string()
        .oneOf([yup.ref('newPassword')], 'Las contraseñas no coinciden.')
        .required('La confirmación de la nueva contraseña es obligatoria.'),
});

const userSchema = yup.object().shape({
    username: yup.string().required('El nombre de usuario es obligatorio.'),
    currentPassword: yup.string().required('La contraseña actual es obligatoria para guardar cambios.'),
});

const AccountModalContainer: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const dispatch = useDispatch();

    const [tabValue, setTabValue] = useState<number>(0);
    const [profileImagePreview, setProfileImagePreview] = useState<string>('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(false);
    const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const { data: userData, refetch: refetchUserData } = useValidarTokenQuery();

    const [actualizarCuenta] = useActualizarCuentaMutation();

    const getProfileImageUrl = (imageFileName?: string | null): string => {
        if (!imageFileName || imageFileName === 'null') {
            return "https://placehold.co/48x48/cccccc/000000?text=User";
        }
        const timestamp = new Date().getTime();
        console.log('url', `${import.meta.env.VITE_IMAGES_URL}/${imageFileName}?t=${timestamp}`);
        return `${import.meta.env.VITE_IMAGES_URL}/${imageFileName}?t=${timestamp}`;
    };

    const {
        control: userControl,
        handleSubmit: handleUserSubmit,
        formState: { errors: userErrors },
        reset: resetUserForm,
        setValue: setUserFormValue,
    } = useForm<UserProfileFormFields>({
        defaultValues: {
            username: userData?.user?.name || '',
            currentPassword: '',
        },
        resolver: yupResolver(userSchema),
    });

    const {
        control: passwordControl,
        handleSubmit: handlePasswordSubmit,
        formState: { errors: passwordErrors },
        reset: resetPasswordForm,
    } = useForm<PasswordFormInputs>({
        resolver: yupResolver(passwordSchema),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: '',
        },
    });

    useEffect(() => {
        if (open && userData?.user) {
            setUserFormValue('username', userData.user.name || '');
            setProfileImagePreview(getProfileImageUrl(userData.user.avatar));
            setSelectedFile(null);
            resetUserForm({
                username: userData.user.name || '',
                currentPassword: '',
            });
            resetPasswordForm();
        }
    }, [open, userData, setUserFormValue, resetUserForm, resetPasswordForm]);


    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    setProfileImagePreview(reader.result);
                }
            };
            reader.readAsDataURL(file);
        } else {
            setSelectedFile(null);
            setProfileImagePreview(getProfileImageUrl(userData?.user?.avatar));
        }
    };

    const handleSaveUsername: SubmitHandler<UserProfileFormFields> = async (data) => {
        setLoading(true);
        try {
            const hasUsernameChanged = data.username !== (userData?.user?.name || '');
            const hasImageChanged = selectedFile !== null;

            if (!hasUsernameChanged && !hasImageChanged) {
                toast.info('No hay cambios para guardar', {
                    autoClose: 3000,
                });
                onClose();
                return;
            }

            const payload: {
                nuevo_nombre?: string;
                clave_actual: string;
                avatar?: File | null;
            } = {
                clave_actual: data.currentPassword,
            };

            if (hasUsernameChanged) {
                payload.nuevo_nombre = data.username;
            }

            if (hasImageChanged) {
                payload.avatar = selectedFile;
            }

            const result = await actualizarCuenta(payload).unwrap();

            toast.success("Perfil actualizado con éxito", {
                autoClose: 3000,
            });

            refetchUserData();

            onClose();

        } catch (error: any) {
            console.error('Error al guardar el perfil:', error);
            toast.error(error.data?.message || 'Error al actualizar el perfil. Verifica tu contraseña actual', {
                autoClose: 3000,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSavePassword: SubmitHandler<PasswordFormInputs> = async (data) => {
        setLoading(true);
        try {
            const payload: {
                nueva_clave: string;
                clave_actual: string;
            } = {
                nueva_clave: data.newPassword,
                clave_actual: data.currentPassword,
            };

            await actualizarCuenta(payload).unwrap();

            sessionStorage.removeItem('token');

            toastRedirect("Contraseña actualizada con éxito. Por seguridad, se cerrará la sesión.", navigate, "/ingreso", "success", 3000);

            onClose();

        } catch (error: any) {
            console.error('Error al guardar contraseña:', error);
            toast.error(error.data?.message || 'Error al actualizar la contraseña. Verifica tu contraseña actual', {
                autoClose: 3000,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        onClose();
    };

    const handleSave = () => {
        if (tabValue === 0) {
            handleUserSubmit(handleSaveUsername)();
        } else {
            handlePasswordSubmit(handleSavePassword)();
        }
    };

    return (
        <AccountModalPresentational
            open={open}
            handleCancel={handleCancel}
            tabValue={tabValue}
            handleTabChange={handleTabChange}
            profileImagePreview={profileImagePreview}
            handleImageUpload={handleImageUpload}
            userControl={userControl as Control<UserProfileFormFields>}
            userErrors={userErrors as FieldErrors<UserProfileFormFields>}
            showCurrentPassword={showCurrentPassword}
            setShowCurrentPassword={setShowCurrentPassword}
            passwordControl={passwordControl as Control<PasswordFormInputs>}
            passwordErrors={passwordErrors as FieldErrors<PasswordFormInputs>}
            showNewPassword={showNewPassword}
            setShowNewPassword={setShowNewPassword}
            showConfirmNewPassword={showConfirmNewPassword}
            setShowConfirmNewPassword={setShowConfirmNewPassword}
            loading={loading}
            handleSave={handleSave}
        />
    );
};

export default AccountModalContainer;