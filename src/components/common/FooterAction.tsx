import React, { useCallback, useState } from "react";
// libraries
import { Button, Container, Box, Typography, Modal } from "@mui/material";
// styles

import styles from "../../styles/FooterAction.module.scss";
import { exportData, resetDb, importData } from "../../services/dbServices";
import useTopicData from "../../hooks/useTopicData";
import FileDropzone from "./FileDropzone";
import { toast } from "react-toastify";

const Footer = () => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("");

  const [fileToImport, setFileToImport] = useState<any>();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { topicsArray } = useTopicData();

  const handleConfirmResetBtnClick = useCallback(async () => {
    setType("");
    await resetDb();
    handleClose();
    toast.dismiss();
    toast.info("📦 DSADatabase is re-initialized, please reload");
  }, []);

  const handleExportBtnClick = useCallback(() => {
    setType("");
    exportData(topicsArray);
    handleClose();
    toast.dismiss();
    toast.info("📁 File can be downloaded now");
  }, [topicsArray]);

  const handleImportBtnClick = useCallback(async () => {
    setType("");
    await importData(fileToImport);
    handleClose();
    toast.dismiss();
    toast.info("🛎️ DSADatabase is imported and initialized, please reload");
  }, [fileToImport]);

  return (
    <Container
      maxWidth={false}
      sx={{
        p: 4,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box
          className={styles.modal}
          sx={{ minWidth: 480, minHeight: 210, p: 3 }}
        >
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            {type === "reset" && "Reset Database"}
            {type === "export" && "Export Database"}
            {type === "import" && "Import Database"}
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            {type === "reset" && "Are you sure you want to reset db ?"}
            {type === "export" && "Export your progress in a json file"}
            {type === "import" &&
              "Visit github repo link for this project and go to -> src/data/topic_question_data.json file to see the structure of data needs to be uploaded"}
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "space-around" }}>
            {/* reset logic */}
            {type === "reset" && (
              <>
                <Button
                  variant='contained'
                  sx={{ textTransform: "capitalize" }}
                  className={styles.confirmBtn}
                  onClick={handleConfirmResetBtnClick}
                >
                  Confirm
                </Button>

                <Button
                  variant='contained'
                  sx={{ textTransform: "capitalize" }}
                  className={styles.rejectBtn}
                  onClick={() => {
                    setType("");
                    handleClose();
                  }}
                >
                  Reject
                </Button>
              </>
            )}

            {type === "export" && (
              <>
                <Button
                  variant='contained'
                  sx={{ textTransform: "capitalize" }}
                  className={styles.rejectBtn}
                  onClick={handleExportBtnClick}
                >
                  Export
                </Button>
              </>
            )}

            {type === "import" && (
              <Box display='flex' flexDirection={"column"} sx={{ m: 1.5 }}>
                <FileDropzone setFileToImport={setFileToImport} />
                {fileToImport && (
                  <Button
                    variant='contained'
                    sx={{ textTransform: "capitalize" }}
                    className={styles.confirmBtn}
                    onClick={handleImportBtnClick}
                  >
                    Import
                  </Button>
                )}
              </Box>
            )}
          </Box>
        </Box>
      </Modal>

      {/* reset btn */}
      <Button
        variant='contained'
        sx={{ textTransform: "capitalize" }}
        className={styles.resetProgress}
        onClick={() => {
          setType("reset");
          handleOpen();
        }}
      >
        Reset Progress
      </Button>

      <Button
        variant='contained'
        sx={{ textTransform: "capitalize" }}
        className={styles.exportProgress}
        onClick={() => {
          setType("export");
          handleOpen();
        }}
      >
        Export Progress
      </Button>

      <Button
        variant='contained'
        sx={{ textTransform: "capitalize" }}
        className={styles.importProgress}
        onClick={() => {
          setType("import");
          handleOpen();
        }}
      >
        Import Progress
      </Button>
    </Container>
  );
};

export default Footer;
