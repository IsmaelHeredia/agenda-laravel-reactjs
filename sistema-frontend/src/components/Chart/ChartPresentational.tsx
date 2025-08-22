import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { PieChart, Pie, Tooltip as RechartsTooltip, Legend } from "recharts";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface ChartPresentationalProps {
    open: boolean;
    handleClose: (event: any, reason: string) => void;
    datosGrafico: Array<any>;
    isSmallScreen: boolean;
    isLoading: boolean;
}

const ChartPresentational: React.FC<ChartPresentationalProps> = ({
    open,
    handleClose,
    datosGrafico,
    isSmallScreen,
    isLoading,
}) => {
    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                fullScreen={isSmallScreen}
                maxWidth="sm"
                TransitionComponent={Transition}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className="center"
                disableEscapeKeyDown
                sx={{ "& .MuiPaper-root": { borderRadius: isSmallScreen ? "0px" : "16px" } }}
            >
                <DialogTitle>
                    <Typography
                        variant={"h4"}
                        component="div"
                        sx={{
                            textAlign: 'center',
                            fontWeight: 'bold'
                        }}
                    >
                        Estadísticas
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    {isLoading ? (
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                            <Typography>Cargando datos...</Typography>
                        </div>
                    ) : (
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: isSmallScreen ? 250 : 400 }}>
                            <PieChart width={isSmallScreen ? 250 : 400} height={isSmallScreen ? 250 : 400}>
                                <Pie
                                    dataKey="value"
                                    data={datosGrafico}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={isSmallScreen ? 50 : 100}
                                    outerRadius={isSmallScreen ? 100 : 150}
                                    fill="#8884d8"
                                />
                                <RechartsTooltip />
                                <Legend />
                            </PieChart>
                        </div>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button startIcon={<CloseIcon />} color="secondary" onClick={() => handleClose({}, "custom")}>Cerrar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ChartPresentational;
