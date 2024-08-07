import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import CategoryIcon from "@mui/icons-material/Category";
import NoteIcon from "@mui/icons-material/Note";
import HomeIcon from "@mui/icons-material/Home";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

import Chart from "@components/Chart";
import Account from "@components/Account";
import About from "@components/About";

import { useNavigate } from "react-router-dom";
import PageTitle from "@components/PageTitle";

import { RootState } from "@customTypes/redux/global";
import { useSelector, useDispatch } from "react-redux";
import { changeMode } from "@store/reducers/themesSlice";
import { setAuth } from "@store/reducers/authSlice";

import { theme as light_gruvbox } from "@skins/light_gruvbox";
import { theme as dark_gruvbox } from "@skins/dark_gruvbox";

const LayoutAdmin = ({ children }: { children: React.ReactNode }) => {

    const navigate = useNavigate();

    const handleClickLogOut = () => {

        toast.success("La sesión fue cerrada", {autoClose: Number(import.meta.env.VITE_TIMEOUT_TOAST)});
    
        dispatch(setAuth({
            "token": "",
            "username": ""
        }));
    
        setTimeout(() => {
            navigate("/ingreso");
        }, Number(import.meta.env.VITE_TIMEOUT_REDIRECT));

    }

    const mode = useSelector((state: RootState) => state.themes.mode);
    
    const dispatch = useDispatch();

    const handleClickSetLight = () => {
        dispatch(changeMode({ mode: "light"}));
    };

    const handleClickSetDark = () => {
        dispatch(changeMode({ mode: "dark"}));
    };

    return(
        <>
            <PageTitle title="Agenda Fénix" />
            <ThemeProvider theme={(mode == "light" ? light_gruvbox : dark_gruvbox)}>
                <CssBaseline />
                <AppBar position="fixed" enableColorOnDark>

                    <Toolbar color="primary">

                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={() => navigate("/") }
                        >
                            <MenuIcon />
                        </IconButton>

                        <Typography 
                            variant={
                                (mode == "light") ? "h6" : "h5"
                            } 
                            component="div"
                            sx={{
                                flexGrow: 1,
                                color: (mode == "light") ? "#253600" : "#DDC7A1" 
                            }}
                            >
                            Agenda Fénix
                        </Typography>

                        <IconButton onClick={() => navigate("/") }>
                            <Tooltip title="Ir a inicio">
                                <HomeIcon />
                            </Tooltip>
                        </IconButton>

                        <IconButton onClick={() => navigate("/categorias") }>
                            <Tooltip title="Ir a categorías">
                                <CategoryIcon />
                            </Tooltip>
                        </IconButton>

                        <IconButton onClick={() => navigate("/notas") }>
                            <Tooltip title="Ir a notas">
                                <NoteIcon />
                            </Tooltip>
                        </IconButton>

                        <Chart />

                        <About />

                        <Account />

                        <IconButton onClick={ handleClickLogOut }>
                            <Tooltip title="Salir">
                                <LogoutIcon />
                            </Tooltip>
                        </IconButton>
                        
                    </Toolbar>

                </AppBar>
                {children}
                <div className="botones-theme">
                    {mode == "dark" &&
                        <IconButton onClick={ handleClickSetLight }>
                            <Tooltip title="Cambiar a modo claro">
                                <WbSunnyIcon />
                            </Tooltip>
                        </IconButton>
                    }
                    {
                    mode == "light" &&
                        <IconButton onClick={ handleClickSetDark }>
                            <Tooltip title="Cambiar a modo oscuro">
                                <DarkModeIcon />
                            </Tooltip>
                        </IconButton>
                    }
                </div>
                <div style={{ marginTop: "15px" }}>
                    <ToastContainer
                        position="bottom-center"
                        autoClose={2000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme= { mode == "light" ? "light" : "dark" }
                    />
                </div>
            </ThemeProvider>
        </>
    );

};

export default LayoutAdmin;
