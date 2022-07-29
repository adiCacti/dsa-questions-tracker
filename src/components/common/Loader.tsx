import { Box, Container } from "@mui/material";
import React from "react";
import styles from "../../styles/Loader.module.scss";

const Loader = () => {
  return (
    <Container
      maxWidth={false}
      disableGutters={true}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#d3d3d3",
        height: "100vh",
      }}
    >
      <Box className={styles.loader} component='div' display='inline'></Box>
    </Container>
  );
};

export default Loader;
