import * as React from "react";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Account from "@mui/icons-material/AccountCircleOutlined";
import Notifications from "@mui/icons-material/Notifications";
import Logo from "./logo";
const pages = ["Home", "Estadísticas", "Contactos"];

function AppbarComponent() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [activePage, setActivePage] = useState<string>("");

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handlePage = (p: string) => {
    setActivePage(p);
  };

  return (
    <AppBar position="static" style={{ backgroundColor: "#1A53AD" }}>
      <Container maxWidth="xl" style={{ paddingLeft: 40, paddingRight: 40 }}>
        <Toolbar disableGutters>
          <Logo />
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none", justifyContent: "end" },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography
                    textAlign="center"
                    style={{ textTransform: "none" }}
                  >
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex", justifyContent: "end" },
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handlePage(page)}
                sx={{ my: 2, px: 3.5, mx: 2, color: "white", display: "block" }}
                style={{
                  textTransform: "none",
                  backgroundColor:
                    activePage === page ? "white" : "transparent",
                  color: activePage === page ? "#1A53AD" : "white",
                  fontFamily: "Noto Sans",
                  // fontFamily: "'Noto Sans', sans-serif",
                  fontWeight: 600,
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
            <IconButton
              sx={{ p: 0 }}
              style={{ marginLeft: 20, marginRight: 20 }}
            >
              <Notifications fontSize="large" style={{ color: "white" }} />
            </IconButton>

            <IconButton
              sx={{ p: 0 }}
              style={{ marginLeft: 20, marginRight: 20 }}
            >
              <Account fontSize="large" style={{ color: "white" }} />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default AppbarComponent;
