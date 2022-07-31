import { useState } from "react";
// libraries
import { Grid, Box, Card, CardContent, Typography } from "@mui/material";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
// hooks
import useQuestionData from "../hooks/useQuestionsData";
// styles
import styles from "../styles/TopicCard.module.scss";

interface TopicCardProps {
  topicName?: string;
  totalQuestions?: number;
  started?: boolean;
  doneQuestions?: number;
}

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant='determinate' {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant='body2' color='text.secondary'>{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function TopicCard({
  topicName = "Array",
  totalQuestions = 0,
  started = false,
  doneQuestions = 0,
}: TopicCardProps) {
  const router = useRouter();

  const {
    topicData,
    setTopicData,
    totalQuestionsCompletedPerTopic,
    totalQuestionsPresentPerTopic,
  } = useQuestionData(topicName.replaceAll(" ", "_").toLowerCase());

  const handleStartNowBtnClick = (id: string, topicData: any) => {
    if (!topicData) return;

    if (topicData?.started) return;

    const newTopicData = {
      ...topicData,
      started: true,
    };

    setTopicData(newTopicData);
  };

  return (
    <Card
      className={styles.card_container}
      sx={{ minWidth: 480, minHeight: 210, p: 1 }}
    >
      <CardContent>
        <Grid
          container
          direction='row'
          justifyContent='space-between'
          alignItems='flex-start'
        >
          <Typography
            gutterBottom
            variant='h6'
            component='div'
            sx={{ textTransform: "capitalize" }}
          >
            {topicName}
          </Typography>

          {started ? (
            <Button
              className={styles.solveNowBtn}
              variant='contained'
              sx={{
                backgroundColor: "#29A746",
                textTransform: "none",
                borderRadius: "20px",
              }}
              onClick={() =>
                router.push(`/${topicName.replaceAll(" ", "_").toLowerCase()}`)
              }
            >
              Solve Now
            </Button>
          ) : (
            <Button
              className={styles.startNowBtn}
              variant='contained'
              onClick={() => {
                handleStartNowBtnClick(topicData.id, topicData);

                router.push(`/${topicName.replaceAll(" ", "_").toLowerCase()}`);
              }}
            >
              Start Now
            </Button>
          )}
        </Grid>

        <Typography variant='subtitle1' component='div'>
          Total Question {totalQuestions}
        </Typography>

        {started ? (
          totalQuestions - doneQuestions === 0 ? (
            <Typography variant='subtitle1' component='div'>
              Completed
            </Typography>
          ) : (
            <Typography variant='subtitle1' component='div'>
              {totalQuestions - doneQuestions} More to go
            </Typography>
          )
        ) : (
          <Typography variant='subtitle1' component='div'>
            Not started yet
          </Typography>
        )}

        {started && (
          <Box sx={{ width: "100%", my: 1 }}>
            <LinearProgressWithLabel
              value={
                (totalQuestionsCompletedPerTopic /
                  totalQuestionsPresentPerTopic) *
                100
              }
              color='success'
              sx={{
                height: "20px",
                borderRadius: "100px",
              }}
            />
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
