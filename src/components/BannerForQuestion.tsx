import React, { useEffect, useState } from "react";
// libraries
import { Box, Divider, Typography } from "@mui/material";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import Link from "next/link";

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant='determinate' {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography sx={{ fontSize: "25px" }}>{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}
interface BannerForQuestionProps {
  topicData: any;
  totalQuestionsPresentPerTopic: number;
  totalQuestionsCompletedPerTopic: number;
}

const BannerForQuestion = ({
  topicData,
  totalQuestionsPresentPerTopic,
  totalQuestionsCompletedPerTopic,
}: BannerForQuestionProps) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        mb: 4,
      }}
    >
      <Typography
        variant='h5'
        component='div'
        sx={{ m: 2, textTransform: "capitalize" }}
      >
        <Link href='/'>
          <a>Topics</a>
        </Link>
        /{topicData?.topicName.replaceAll("_", " ")}
      </Typography>

      <Box sx={{ width: "80%" }}>
        <LinearProgressWithLabel
          variant='determinate'
          value={
            (totalQuestionsCompletedPerTopic / totalQuestionsPresentPerTopic) *
            100
          }
          color='success'
          sx={{
            height: "30px",
            margin: "35px",
            borderRadius: "20px",
            backgroundColor: "#f9f9f9",
          }}
        />
      </Box>
    </Box>
  );
};

export default BannerForQuestion;
