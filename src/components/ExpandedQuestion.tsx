import React, { useState } from "react";
// libraries
import { Box, Button, Container, TextField } from "@mui/material";
import { ExpanderComponentProps } from "react-data-table-component";
import { toast } from "react-toastify";
// hooks
import useQuestionsData from "../hooks/useQuestionsData";
// styles
import styles from "../styles/ExpandedQuestion.module.scss";

type DataRow = {
  id: string;
  status: boolean;
  topic: string;
  question: string;
  bookmark: boolean;
  notes: string;
  attempts: number;
  url2: string;
  url3: string;
};

const ExpandedQuestion: React.FC<ExpanderComponentProps<DataRow>> = ({
  data,
}) => {
  const { topicData, setTopicData } = useQuestionsData(
    data?.topic.toLowerCase()
  );

  const [notesValue, setNotesValue] = useState(data?.notes);
  const [urlPlusValue, setUrlPlusValue] = useState(data?.url2);
  const [urlPlusPlusValue, setUrlPlusPlusValue] = useState(data?.url3);

  const handleNotesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNotesValue(event.target.value);
  };

  const handleUrlPlusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrlPlusValue(event.target.value);
  };

  const handleUrlPlusPlusChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUrlPlusPlusValue(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    try {
      const newQuestionsData = topicData?.questions.map((question: any) => {
        if (question.id === data.id) {
          return {
            ...question,
            notes: notesValue,
            url2: urlPlusValue,
            url3: urlPlusPlusValue,
          };
        }

        return question;
      });

      const newTopicData = {
        ...topicData,
        questions: newQuestionsData,
      };

      setTopicData(newTopicData);
      toast.dismiss();
      toast.info("Values updated ✍ ");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container maxWidth={false} disableGutters={true} sx={{ p: 3 }}>
      <Box
        component='form'
        sx={{
          "& .MuiTextField-root": { m: 1, width: "100%" },
        }}
        noValidate
        autoComplete='off'
        onSubmit={handleSubmit}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          <TextField
            id='outlined-multiline-static'
            label='Notes'
            multiline
            rows={4}
            color='success'
            value={notesValue}
            onChange={handleNotesChange}
            sx={{
              maxWidth: "60%",
            }}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              maxWidth: "20%",
            }}
          >
            <TextField
              id='outlined-multiline-static'
              label='URL++'
              multiline
              maxRows={1}
              color='success'
              value={urlPlusPlusValue}
              onChange={handleUrlPlusPlusChange}
            />
            <TextField
              id='outlined-multiline-static'
              label='URL+'
              multiline
              rows={1}
              color='success'
              value={urlPlusValue}
              onChange={handleUrlPlusChange}
            />
          </div>

          <Button
            type='submit'
            variant='contained'
            sx={{ mt: 1, textTransform: "capitalize", maxWidth: "15%" }}
            className={styles.submitBtn}
          >
            Submit
          </Button>
        </div>
      </Box>
    </Container>
  );
};

export default ExpandedQuestion;
