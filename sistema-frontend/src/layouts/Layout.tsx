import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PageTitle from "@components/PageTitle";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";

import { RootState } from "@customTypes/redux/global";
import { useSelector, useDispatch } from "react-redux";
import { changeMode } from "@store/reducers/themesSlice";

import { theme as light_gruvbox } from "@skins/light_gruvbox";
import { theme as dark_gruvbox } from "@skins/dark_gruvbox";

const Layout = ({ children }: { children: React.ReactNode }) => {
 
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
            <PageTitle title="Ingreso" />
            <ThemeProvider theme={(mode == "light" ? light_gruvbox : dark_gruvbox)}>
                <CssBaseline />
                <div className="ingreso">
                    {children}
                </div>
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
                    theme= { mode == "light" ? "light" : "dark" }
                  />
                </div>
            </ThemeProvider>
        </>
    );

};

export default Layout;