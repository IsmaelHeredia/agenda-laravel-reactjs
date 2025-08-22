import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface LoadingOverlayProps {
    open: boolean;
    message?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ open, message = "Cargando..." }) => {
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
        >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <CircularProgress color="inherit" />
                <Typography variant="h6" component="p" sx={{ color: 'white' }}>
                    {message}
                </Typography>
            </Box>
        </Backdrop>
    );
};

export default LoadingOverlay;