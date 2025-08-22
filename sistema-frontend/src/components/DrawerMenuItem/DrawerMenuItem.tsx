import React from 'react';
import {
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    useTheme,
} from '@mui/material';

interface DrawerMenuItemProps {
    text: string;
    icon: React.ReactNode;
    onClick: () => void;
    isOpen: boolean;
    url?: string;
    active?: boolean;
}

const DrawerMenuItem: React.FC<DrawerMenuItemProps> = ({
    text,
    icon,
    onClick,
    isOpen,
    active = false,
}) => {
    const theme = useTheme();

    return (
        <ListItem disablePadding>
            <ListItemButton
                onClick={onClick}
                sx={{
                    backgroundColor: active ? theme.palette.action.selected : 'inherit',
                    '&:hover': { backgroundColor: theme.palette.action.hover },
                    px: isOpen ? 2 : 1,
                    minHeight: 48,
                    justifyContent: isOpen ? 'initial' : 'center',
                }}
            >
                <ListItemIcon
                    sx={{
                        color: theme.palette.customIconNavbar?.background,
                        minWidth: 0,
                        mr: isOpen ? 2 : 'auto',
                        justifyContent: 'center',
                    }}
                >
                    {icon}
                </ListItemIcon>
                {isOpen && (
                    <ListItemText
                        primary={text}
                        sx={{
                            color: theme.palette.customNavbar?.menuTextColor,
                            '& .MuiListItemText-primary': {
                                color: theme.palette.customNavbar?.menuTextColor,
                            },
                        }}
                    />
                )}
            </ListItemButton>
        </ListItem>
    );
};

export default DrawerMenuItem;
