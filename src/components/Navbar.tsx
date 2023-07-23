"use client";
import React from "react";
import { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Logout from "@mui/icons-material/Logout";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import LandscapeSharpIcon from "@mui/icons-material/LandscapeSharp";
import Badge from "@mui/material/Badge";
import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";
import Link from "next/link";
import { useRouter } from "next/navigation";

import useCart from "@/hooks/use-cart";
import { toast } from "react-hot-toast";

const pages = ["Products"];
const settings = ["Profile", "Logout"];
const pageName = "Everest";

function Navbar() {
  const [user, setUser] = React.useState({ token: "" });
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const cart = useCart();

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check if the code is running on the client-side
      const token = window.localStorage.getItem("token");
      if (token) {
        setUser({ token: token });
      }
    }
  }, []);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    console.log("user menu");
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#1976d2",
      },
      secondary: {
        // This is green.A700 as hex.
        main: "#11cb5f",
      },
      warning: {
        main: "#ff0000",
      },
      background: {
        default: "#fff",
        paper: "#121212",
      },
    },
  });

  const router = useRouter();

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <LandscapeSharpIcon
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              {pageName}
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <LandscapeSharpIcon
              sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
            />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              {pageName}
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  href={`/${page.toLowerCase()}`}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            {/* esto deberia salir si no esta logueado */}
            {!user.token ? (
              <div className="p-4">
                <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
                  <Stack spacing={3} direction="row">
                    {/* <ThemeProvider theme={theme}> */}
                    <Link href="/login">
                      <Button
                        variant="contained"
                        color="primary"
                        className="bg-blue-600 font-bold"
                      >
                        Log In
                      </Button>
                    </Link>
                    <Link href="/register">
                      <Button variant="outlined" className="font-bold">
                        Register
                      </Button>
                    </Link>
                    {/* </ThemeProvider> */}
                  </Stack>
                </Box>
              </div>
            ) : (
              <></>
            )}

            <Box>
              <Badge
                badgeContent={cart?.items?.length > 0 ? cart?.items?.length : 0}
                color="error"
                className="cursor-pointer hover:opacity-70"
                onClick={() => router.push("/cart")}
              >
                <ShoppingCartSharpIcon sx={{ mr: 1 }} />
              </Badge>
            </Box>

            {user.token ? (
              <Box sx={{ flexGrow: 0, marginLeft: 3 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Button
                      variant="contained"
                      startIcon={<Logout fontSize="small" />}
                      onClick={() => {
                        if (typeof window !== "undefined") {
                          window.localStorage.removeItem("token");
                        }
                        setUser({ token: "" });
                        toast.success("Logout successful!");
                        router.push("/");
                      }}
                    >
                      Logout
                    </Button>
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <></>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Navbar;
