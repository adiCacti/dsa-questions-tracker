import * as React from "react";
// libraries
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FolderIcon from "@mui/icons-material/Folder";

const Header = () => {
  return (
    <AppBar position='static' sx={{ background: "white" }}>
      <Container maxWidth='xl'>
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography
            noWrap
            component='a'
            href='/'
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontSize: "50px",
              fontWeight: 700,
              letterSpacing: ".3rem",
              textDecoration: "none",
            }}
          >
            🚀
          </Typography>

          <Typography
            component='div'
            sx={{
              fontSize: "45px",
              color: "black",
            }}
          >
            DSA Questions Tracker
          </Typography>

          <Box>
            <Tooltip title='My Github'>
              <GitHubIcon
                sx={{
                  fontSize: "50px",
                  mr: 3,
                  color: "#4481eb",
                  transitions: "all .2s ease-in",
                  "&:hover": {
                    color: "#04befe",
                    transform: "scale(1.02)",
                  },
                  "&:active": {
                    transform: "scale(0.97)",
                  },
                }}
                onClick={() =>
                  window.open(`https://github.com/adiCacti`, "_blank")
                }
              />
            </Tooltip>

            <Tooltip title='My LinkedIn'>
              <LinkedInIcon
                sx={{
                  fontSize: "55px",
                  color: "#4481eb",
                  mr: 3,
                  transitions: "all .2s ease-in",
                  "&:hover": {
                    color: "#04befe",
                    transform: "scale(1.02)",
                  },
                  "&:active": {
                    transform: "scale(0.97)",
                  },
                  transform: "translateY(5px)",
                }}
                onClick={() =>
                  window.open(
                    `https://www.linkedin.com/in/adityap314/`,
                    "_blank"
                  )
                }
              />
            </Tooltip>

            <Tooltip title='Project Repo'>
              <FolderIcon
                sx={{
                  fontSize: "55px",
                  color: "#4481eb",
                  transitions: "all .2s ease-in",
                  "&:hover": {
                    color: "#04befe",
                    transform: "scale(1.02)",
                  },
                  "&:active": {
                    transform: "scale(0.97)",
                  },
                  transform: "translateY(5px)",
                }}
                onClick={() =>
                  window.open(
                    `https://github.com/adiCacti/dsa-questions-tracker`,
                    "_blank"
                  )
                }
              />
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
