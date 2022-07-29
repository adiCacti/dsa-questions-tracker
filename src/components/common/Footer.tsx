import { Button, Container } from "@mui/material";
import React from "react";
import styles from "../../styles/Footer.module.scss";
const Footer = () => {
  return (
    <Container
      maxWidth={false}
      sx={{
        p: 4,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Button
        variant='contained'
        sx={{ textTransform: "capitalize" }}
        className={styles.resetProgress}
      >
        Reset Progress
      </Button>

      <Button
        variant='contained'
        sx={{ textTransform: "capitalize" }}
        className={styles.exportProgress}
      >
        Export Progress
      </Button>

      <Button
        variant='contained'
        sx={{ textTransform: "capitalize" }}
        className={styles.importProgress}
      >
        Import Progress
      </Button>
    </Container>
  );
};

export default Footer;
