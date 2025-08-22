import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PageTitle from "@/components/PageTitle/PageTitle";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";

import { useSelector, useDispatch } from "react-redux";
import { changeMode, selectTheme } from "@store/reducers/themesSlice";
import { RootState } from "@/store/store";

const Layout = ({ children }: { children: React.ReactNode }) => {

    const mode = useSelector((state: RootState) => state.themes.mode);
    const theme = useSelector(selectTheme);

    const dispatch = useDispatch();

    return (
        <>
            <PageTitle title="Ingreso" />
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="ingreso">
                    {children}
                </div>
                <div className="botones-theme">
                    <IconButton sx={{ color: "text.primary" }} onClick={() => dispatch(changeMode({ mode: mode === "light" ? "dark" : "light" }))}>
                        <Tooltip title={mode === "light" ? "Modo oscuro" : "Modo claro"}>
                            {mode === "light" ? <DarkModeIcon /> : <WbSunnyIcon />}
                        </Tooltip>
                    </IconButton>
                </div>
                <div>
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
        </>
    );

};

export default Layout;