import { ReactNode, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useDispatch, useSelector } from "react-redux";
import { changeMode, selectTheme } from "@store/reducers/themesSlice";
import {
    AppBar,
    Toolbar,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Tooltip,
    Typography,
} from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import CategoryIcon from "@mui/icons-material/Category";
import NoteIcon from "@mui/icons-material/Note";
import HomeIcon from "@mui/icons-material/Home";
import PageTitle from "@components/PageTitle";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setAuth } from "@/store/reducers/authSlice";
import { RootState } from "@/store/store";

import About from "@components/About";
import Chart from "@components/Chart";
import Account from "@components/Account";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { toastRedirect } from "@utils/toastRedirect";

const drawerWidth = 240;

interface LayoutAdminProps {
    children: ReactNode;
}

const LayoutAdmin = ({ children }: LayoutAdminProps) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const mode = useSelector((state: RootState) => state.themes.mode);
    const theme = useSelector(selectTheme);
    const [open, setOpen] = useState(false);

    const handleClickLogOut = () => {

        dispatch(setAuth({
            "token": "",
            "username": ""
        }));

        toastRedirect("La sesión fue cerrada", navigate, "/ingreso", "success", Number(import.meta.env.VITE_TIMEOUT_REDIRECT));

    }

    const toggleDrawer = () => setOpen(!open);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <PageTitle title="Agenda Fénix" />

            <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <IconButton color="inherit" edge="start" onClick={toggleDrawer}>
                        <MenuIcon />
                    </IconButton>

                    <Typography
                        variant={mode === "light" ? "h6" : "h5"}
                        component="div"
                        sx={{
                            marginLeft: 1,
                            color: mode === "light" ? "#253600" : "#DDC7A1",
                        }}
                    >
                        Agenda Fénix
                    </Typography>

                    <div style={{ flexGrow: 1 }} />

                    <IconButton sx={{ color: "text.primary" }} onClick={() => dispatch(changeMode({ mode: mode === "light" ? "dark" : "light" }))}>
                        <Tooltip title={mode === "light" ? "Modo oscuro" : "Modo claro"}>
                            {mode === "light" ? <DarkModeIcon /> : <WbSunnyIcon />}
                        </Tooltip>
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Drawer
                variant="permanent"
                sx={{
                    width: open ? drawerWidth : 60,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: open ? drawerWidth : 60,
                        transition: "width 0.3s",
                        overflowX: "hidden",
                        backgroundColor: theme.palette.background.default,
                        color: theme.palette.text.primary,
                    },
                }}
            >
                <Toolbar />
                <List>
                    {[{ url: "/", text: "Inicio", icon: <HomeIcon /> },
                    { url: "/categorias", text: "Categorias", icon: <CategoryIcon /> },
                    { url: "/notas", text: "Notas", icon: <NoteIcon /> }].map((item, index) => (
                        <ListItem
                            button
                            component="a"
                            href={item.url}
                            key={index}
                            sx={{
                                backgroundColor: location.pathname === item.url ? theme.palette.action.selected : "inherit",
                                "&:hover": { backgroundColor: theme.palette.action.hover },
                            }}
                        >
                            <ListItemIcon sx={{ color: "text.primary" }}>{item.icon}</ListItemIcon>
                            {open && <ListItemText primary={item.text} sx={{ color: "text.primary" }} />}
                        </ListItem>
                    ))}
                    <Chart />
                    <Account />
                    <About />
                    <ListItem
                        button
                        sx={{
                            backgroundColor: "inherit",
                            "&:hover": { backgroundColor: theme.palette.action.hover },
                        }}
                        onClick={() => handleClickLogOut()}
                    >
                        <ListItemIcon sx={{ color: "text.primary" }}>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary="Salir" sx={{ color: "text.primary" }} />
                    </ListItem>
                </List>
            </Drawer>

            <main style={{ marginLeft: open ? drawerWidth : 60, padding: "20px", transition: "margin-left 0.3s", overflowX: "hidden" }}>
                <Toolbar />
                {children}
            </main>

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
                    theme={mode == "light" ? "light" : "dark"}
                />
            </div>

        </ThemeProvider>
    );
};

export default LayoutAdmin;