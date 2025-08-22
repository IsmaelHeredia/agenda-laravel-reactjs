import { ReactNode, useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  Typography,
  Tooltip,
  Avatar,
  Box,
} from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import BarChartIcon from "@mui/icons-material/BarChart";
import InfoIcon from "@mui/icons-material/Info";
import SearchIcon from "@mui/icons-material/Search";
import DescriptionIcon from '@mui/icons-material/Description';
import NoteIcon from "@mui/icons-material/Note";

import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import {
  changeMode,
  selectTheme,
} from "@/store/reducers/themesSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import DrawerMenuItem from "@/components/DrawerMenuItem/DrawerMenuItem";

import { toastRedirect } from "@utils/toastRedirect";

import AboutModal from "@/components/About/Modal";
import ChartContainer from "@/components/Chart/ChartContainer";
import AccountModalContainer from "@/components/Account/AccountModalContainer";
import SearchModal from "@/components/Search/Modal";

import { useValidarTokenQuery } from "@store/api/apiSlices";
import PageTitle from "@/components/PageTitle/PageTitle";

const drawerWidth = 240;

interface LayoutAdminProps {
  children: ReactNode;
}

const LayoutAdmin = ({ children }: LayoutAdminProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const isDashboard = location.pathname === '/notas';

  const { data: userData, isLoading: isLoadingUser } = useValidarTokenQuery();

  const user = userData?.user || { name: "Usuario", avatar: null };

  const mode = useSelector((state: RootState) => state.themes.mode);
  const theme = useSelector(selectTheme);

  const [open, setOpen] = useState(false);
  const toggleDrawer = () => setOpen(!open);

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [openAbout, setOpenAbout] = useState(false);
  const [openReporteCategorias, setOpenReporteCategorias] = useState(false);
  const [openSearchModal, setOpenSearchModal] = useState(false);

  const handleOpenProfileModal = () => setIsProfileModalOpen(true);
  const handleCloseProfileModal = () => setIsProfileModalOpen(false);

  const handleOpenAbout = () => setOpenAbout(true);
  const handleCloseAbout = () => setOpenAbout(false);

  const handleOpenReporteCategorias = () => setOpenReporteCategorias(true);
  const handleCloseReporteCategorias = () => setOpenReporteCategorias(false);

  const handleOpenSearchModal = () => setOpenSearchModal(true);
  const handleCloseSearchModal = () => setOpenSearchModal(false);

  const getProfileImageUrl = (imageFileName?: string | null): string => {
    if (!imageFileName || imageFileName === 'null') {
      return "https://placehold.co/32x32/cccccc/000000?text=User";
    }
    const timestamp = new Date().getTime();
    console.log('url', `${import.meta.env.VITE_IMAGES_URL}/${imageFileName}?t=${timestamp}`);
    return `${import.meta.env.VITE_IMAGES_URL}/${imageFileName}?t=${timestamp}`;
  };

  const handleClickLogOut = () => {
    sessionStorage.removeItem('token');
    toastRedirect("La sesión fue cerrada", navigate, "/ingreso", "success", 2000);
  };

  return (
    <>
      <PageTitle title="Agenda Fénix" />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div
          style={{
            position: "fixed",
            top: 0,
            left: open ? drawerWidth : 60,
            right: 0,
            height: 64,
            zIndex: theme.zIndex.drawer + 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            transition: "left 0.3s",
            backgroundColor: theme.palette.customNavbar?.background,
          }}
        >
          <Toolbar
            sx={{
              justifyContent: "space-between",
              pr: 0,
              height: "100%",
              width: "100%",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 0 }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                edge="start"
                sx={{
                  mr: 2,
                  color: theme.palette.customIconNavbar?.background,
                }}
              >
                <MenuIcon
                  sx={{
                    color: "customNavbar.icon",
                  }}
                />
              </IconButton>

              {isDashboard && (
                <Tooltip title="Búsqueda avanzada">
                  <IconButton
                    sx={{ color: "customNavbar.icon" }}
                    onClick={handleOpenSearchModal}
                  >
                    <SearchIcon />
                  </IconButton>
                </Tooltip>
              )}
            </Box>

            <Box sx={{ flexGrow: 1 }} />

            <Box sx={{ display: "flex", alignItems: "center", gap: 0 }}>
              <Tooltip title="Modo claro/oscuro">
                <IconButton
                  onClick={() =>
                    dispatch(
                      changeMode({ mode: mode === "light" ? "dark" : "light" })
                    )
                  }
                  sx={{
                    color: "customNavbar.icon",
                  }}
                >
                  {mode === "light" ? <DarkModeIcon /> : <WbSunnyIcon />}
                </IconButton>
              </Tooltip>

              <Tooltip title={user?.name || "Usuario"}>
                <IconButton onClick={handleOpenProfileModal}>
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      border: "3px solid",
                      borderColor: theme.palette.primary.main,
                    }}
                  >
                    {user?.avatar ? (
                      <img
                        src={getProfileImageUrl(user.avatar)}
                        alt={user?.name || "User Avatar"}
                        width={32}
                        height={32}
                        style={{ objectFit: "cover", borderRadius: "50%" }}
                      />
                    ) : (
                      <PersonIcon
                        fontSize="small"
                        sx={{
                          color: theme.palette.customIconNavbar?.background,
                        }}
                      />
                    )}
                  </Avatar>
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </div>

        <Drawer
          variant="permanent"
          sx={{
            width: open ? drawerWidth : 60,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: open ? drawerWidth : 60,
              transition: "width 0.3s",
              overflowX: "hidden",
              backgroundColor: theme.palette.customNavbar?.background,
              color: theme.palette.customNavbar?.color,
              border: "none",
            },
          }}
        >
          <List sx={{ mt: -1 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                px: open ? 2 : 1,
                width: "100%",
                justifyContent: open ? "flex-start" : "center",
                gap: open ? 1 : 0,
                height: 64,
              }}
            >
              <DescriptionIcon
                sx={{
                  color: theme.palette.customIconNavbar?.background,
                  fontSize: "2rem",
                  mr: open ? 1 : 1,
                }}
              />
              {open && (
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    color: "inherit",
                    fontSize: "1.5rem",
                  }}
                >
                  Agenda Fénix
                </Typography>
              )}
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: open ? "row" : "column",
                py: 2,
                px: open ? 2 : 1,
                gap: open ? 1 : 0.5,
                cursor: "pointer",
                justifyContent: open ? "flex-start" : "center",
                "&:hover": {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
              onClick={handleOpenProfileModal}
            >
              <Avatar
                sx={{
                  width: open ? 48 : 32,
                  height: open ? 48 : 32,
                  border: "2px solid",
                  borderColor: theme.palette.primary.main,
                  marginLeft: open ? "-5px" : "-10px",
                }}
              >
                {user?.avatar ? (
                  <img
                    src={getProfileImageUrl(user.avatar)}
                    alt={user?.name || "User Avatar"}
                    width={open ? 48 : 32}
                    height={open ? 48 : 32}
                    style={{ objectFit: "cover", borderRadius: "50%" }}
                  />
                ) : (
                  <PersonIcon
                    fontSize={open ? "large" : "small"}
                    sx={{
                      color: theme.palette.customIconNavbar?.background,
                    }}
                  />
                )}
              </Avatar>
              {open && (
                <Typography
                  variant="body1"
                  sx={{
                    color: theme.palette.customNavbar?.color,
                    fontWeight: "medium",
                    textAlign: "center",
                  }}
                >
                  {user?.name || "Usuario"}
                </Typography>
              )}
            </Box>

            {[
              { text: "Inicio", icon: <HomeIcon />, url: "/" },
              {
                text: "Notas",
                icon: <NoteIcon />,
                url: "/notas"
              },
              {
                text: "Estadísticas",
                icon: <BarChartIcon />,
                onClick: handleOpenReporteCategorias,
              },
              { text: "Información", icon: <InfoIcon />, onClick: handleOpenAbout },
            ].map((item, index) => (
              <DrawerMenuItem
                key={index}
                text={item.text}
                icon={item.icon}
                isOpen={open}
                onClick={item.onClick || (() => item.url && navigate(item.url))}
                url={item.url}
                active={location.pathname === item.url}
              />
            ))}

            <DrawerMenuItem
              text="Salir"
              icon={<LogoutIcon />}
              isOpen={open}
              onClick={handleClickLogOut}
            />
          </List>
        </Drawer>

        <main
          style={{
            marginLeft: open ? drawerWidth : 60,
            transition: "margin-left 0.3s",
            overflowX: "hidden",
          }}
        >
          <Toolbar />
          <div>
            {children}
            <AboutModal open={openAbout} handleClose={handleCloseAbout} />
            <ChartContainer open={openReporteCategorias} handleClose={handleCloseReporteCategorias} />
            <AccountModalContainer open={isProfileModalOpen} onClose={handleCloseProfileModal} />
            <SearchModal open={openSearchModal} onClose={handleCloseSearchModal} />
          </div>
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
    </>
  );
};

export default LayoutAdmin;
