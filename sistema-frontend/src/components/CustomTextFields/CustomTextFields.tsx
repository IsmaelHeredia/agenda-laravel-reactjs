import React, { forwardRef } from 'react';
import { styled } from '@mui/material/styles';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';
import Select, { SelectProps } from '@mui/material/Select';
import Button, { ButtonProps } from '@mui/material/Button';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Chip, { ChipProps } from '@mui/material/Chip';
import { Categoria } from '@/types/app/categorias';
import { Checkbox, CheckboxProps, InputAdornment, useTheme } from '@mui/material';
import LoadingButton, { LoadingButtonProps } from '@mui/lab/LoadingButton';
import { DateRangeIcon } from '@mui/x-date-pickers/icons';

import { DatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Dayjs } from 'dayjs';

const StyledSearchNameTextField = styled(TextField)(({ theme }) => {
    const isDarkMode = theme.palette.mode === 'dark';
    const color = theme.palette.text.primary;
    const borderColor = theme.palette.customTextField?.borderColor;
    const iconColor = theme.palette.customTextField?.icon;
    const borderWidth = isDarkMode ? '1px' : '2px';
    const focusedBorderWidth = isDarkMode ? '2px' : '3px';

    return {
        width: 200,
        backgroundColor: theme.palette.background.paper,
        borderRadius: '8px',

        '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            minHeight: '40px',
            border: `1px solid ${borderColor}`,
            '& fieldset': {
                border: `${borderWidth} solid ${borderColor}`,
            },
            '&:hover fieldset': {
                borderColor: borderColor,
            },
            '&.Mui-focused fieldset': {
                border: `${focusedBorderWidth} solid ${borderColor}`,
            },
            '&.Mui-focused': {
                border: `1px solid ${borderColor}`,
            },
        },
        '& .MuiOutlinedInput-input': {
            padding: '8px 12px',
            color: color,
            '&::placeholder': {
                color: color,
                opacity: 1,
            },
        },
        '& .MuiSvgIcon-root': {
            color: iconColor,
        },
    };
});

export const SearchNameTextField = React.forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
    return (
        <StyledSearchNameTextField
            {...props}
            ref={ref}
        />
    );
});

const StyledFormTextField = styled(TextField)(({ theme }) => {

    const colorText = theme.palette.customTextField?.colorText;
    const colorLabel = theme.palette.customTextField?.colorLabel;
    const borderColor = theme.palette.customTextField?.borderColor;
    const borderFocusColor = theme.palette.customTextField?.borderFocusColor;
    const borderHoverColor = theme.palette.customTextField?.borderHoverColor;
    const icon = theme.palette.customTextField?.icon;

    return {
        '& .MuiOutlinedInput-root': {
            minHeight: '56px',
            '& fieldset': {
                border: `2px solid ${borderColor}`,
            },
            '&:hover fieldset': {
                borderColor: borderHoverColor,
            },
            '&.Mui-focused fieldset': {
                border: `3px solid ${borderFocusColor}`,
            },
        },
        '& .MuiInputLabel-root': {
            color: colorLabel,
            fontSize: '21px',
            fontWeight: 500,
            '&.MuiInputLabel-shrink': {
                transform: 'translate(14px, -9px) scale(0.75)',
            },
        },
        '& .MuiInputLabel-root.Mui-focused': {
            color: borderFocusColor,
            fontWeight: 500,
        },
        '& .MuiOutlinedInput-input': {
            color: colorText,
            padding: '14px 14px',
        },
        '& .MuiSvgIcon-root': {
            color: icon,
        },
    };
});

export const SearchCategoryAutocomplete = styled(
    Autocomplete<Categoria, true, false, false>
)<AutocompleteProps<Categoria, true, false, false>>(({ theme }) => {
    return {
        borderRadius: '8px',
    };
});

export const FormTextField = React.memo(StyledFormTextField);

const StyledFormSelect = styled(Select)<SelectProps>(({ theme }) => {
    const color = theme.palette.customTextField?.borderColor;
    const icon = theme.palette.customTextField?.icon;

    return {
        '& .MuiOutlinedInput-root': {
            minHeight: '56px',
            alignItems: 'center',
            padding: '0',
        },
        '& .MuiOutlinedInput-notchedOutline': {
            border: `2px solid ${color}`,
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: color,
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: `3px solid ${color}`,
        },
        '& .MuiInputLabel-root': {
            color: color,
            fontSize: '21px',
            fontWeight: 500,
            '&.MuiInputLabel-shrink': {
                transform: 'translate(14px, -9px) scale(0.75)',
            },
        },
        '& .MuiInputLabel-root.Mui-focused': {
            color: color,
            fontWeight: 500,
        },
        '& .MuiSelect-select': {
            display: 'flex',
            alignItems: 'center',
            padding: '14px 14px',
            height: 'auto',
            '& .MuiInputAdornment-root': {
                height: 'auto',
                marginRight: '8px',
            },
        },
        '& .MuiSvgIcon-root': {
            color: icon,
        },
    };
});

export const FormSelect = React.memo(StyledFormSelect);

const AutocompleteWrapper = styled('div')(({ theme }) => {
    const color = theme.palette.customTextField?.colorText || '#000';
    const borderColor = theme.palette.customTextField?.borderColor || theme.palette.grey[500];
    const icon = theme.palette.customTextField?.icon || theme.palette.text.primary;

    return {
        '& .MuiOutlinedInput-root': {
            minHeight: '56px',
            alignItems: 'center',
            padding: '0',

            '& fieldset': {
                border: `2px solid ${borderColor}`,
            },
            '&:hover fieldset': {
                borderColor: borderColor,
            },
            '&.Mui-focused fieldset': {
                border: `3px solid ${borderColor}`,
            },
            '& .MuiInputAdornment-root': {
                height: 'auto',
                padding: '0 8px 0 14px',
                display: 'flex',
                alignItems: 'center',
            },
        },
        '& .MuiInputLabel-root': {
            color: color,
            fontSize: '21px',
            fontWeight: 500,
            '&.MuiInputLabel-shrink': {
                transform: 'translate(14px, -9px) scale(0.75)',
            },
        },
        '& .MuiInputLabel-root.Mui-focused': {
            color: color,
            fontWeight: 500,
        },
        '& .MuiAutocomplete-inputRoot': {
            padding: '0 !important',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            flexGrow: 1,
            paddingTop: '8.5px',
            paddingBottom: '8.5px',
        },
        '& input': {
            padding: '0',
            flexGrow: 1,
            color: color,
            minWidth: '30px',
        },
        '& .MuiChip-root': {
            margin: '4px 2px',
        },
        '& .MuiAutocomplete-endAdornment': {
            paddingRight: '14px',
            display: 'flex',
            alignItems: 'center',
        },
        '& .MuiSvgIcon-root': {
            color: icon,
        },
    };
});

export function FormAutocomplete<
    T,
    Multiple extends boolean = false,
    DisableClearable extends boolean = false,
    FreeSolo extends boolean = false
>(props: AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>) {
    return (
        <AutocompleteWrapper>
            <Autocomplete {...props} />
        </AutocompleteWrapper>
    );
}

const StyledButton = styled(Button)(({ theme }) => {
    return {
        borderRadius: "12px",
        '&.MuiButton-containedPrimary': {
            backgroundColor: theme.palette.customButton?.colorBackground,
            color: theme.palette.customButton?.colorText,
        },
    };
});

export const GeneralButton = React.memo(StyledButton);

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.customIconNavbar?.background,
  '&:hover': {
    color: theme.palette.primary.main,
  },
  '&.Mui-disabled': {
    color: theme.palette.divider, 
  },
}));

export const GeneralIconButton = React.memo(StyledIconButton);

const StyledChip = styled(Chip)(({ theme }) => {

    return {
        backgroundColor: theme.palette.customChip?.background,
        color: theme.palette.customChip?.color,
        padding: '2px 8px', 
        fontSize: '0.875rem',
        fontWeight: 600,
    };
});

export const GeneralChip = React.memo(StyledChip);

const StyledCheckbox = styled(Checkbox)<CheckboxProps>(({ theme }) => ({
  color: theme.palette.primary.main,
  '&.Mui-checked': {
    color: theme.palette.primary.main,
  },
}));

export const GeneralCheckbox = React.memo(StyledCheckbox);

const StyledLoadingButton = styled(LoadingButton)<LoadingButtonProps>(({ theme }) => {
    return {
        borderRadius: "12px",
        '&.MuiButton-containedPrimary': {
            backgroundColor: theme.palette.customButton?.colorBackground,
            color: theme.palette.customButton?.colorText,
        },
    };
});

export const GeneralLoadingButton = React.memo(StyledLoadingButton);

export const FormDatePicker = forwardRef<HTMLInputElement, DatePickerProps<Dayjs>>((props, ref) => {
    const theme = useTheme();

    const textFieldProps = {
        sx: {
            "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                "& fieldset": {
                    border: `2px solid ${theme.palette.customTextField?.borderColor}`,
                },
                "&:hover fieldset": {
                    borderColor: theme.palette.customTextField?.borderHoverColor,
                },
                "&.Mui-focused fieldset": {
                    border: `3px solid ${theme.palette.customTextField?.borderFocusColor}`,
                },
            },
            "& .MuiInputLabel-root": {
                color: theme.palette.customTextField?.colorLabel,
                fontSize: '21px',
                fontWeight: 500,
                '&.MuiInputLabel-shrink': {
                    transform: 'translate(14px, -9px) scale(0.75)',
                },
            },
        },
        InputProps: {
            startAdornment: (
                <InputAdornment position="start">
                    <DateRangeIcon color="primary" />
                </InputAdornment>
            ),
        },
        inputRef: ref,
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                {...props}
                slotProps={{
                    ...props.slotProps,
                    textField: textFieldProps,
                }}
            />
        </LocalizationProvider>
    );
});