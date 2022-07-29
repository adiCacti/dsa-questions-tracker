import React, { useEffect, useState } from "react";
// libraries
import { Box, Divider, Typography } from "@mui/material";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";

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
interface BannerForTopicsProps {
  totalQuestionsPresent: number;
  totalQuestionsCompleted: number;
}

const BannerForTopics = ({
  totalQuestionsPresent,
  totalQuestionsCompleted,
}: BannerForTopicsProps) => {
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
      <Typography variant='h6' component='div' sx={{ mt: 1 }}>
        Your Gateway to crack DSA 🔥
      </Typography>

      <Divider sx={{ color: "black", height: "10px", width: "200px" }} />

      <Box sx={{ width: "80%" }}>
        <LinearProgressWithLabel
          variant='determinate'
          value={(totalQuestionsCompleted / totalQuestionsPresent) * 100}
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

export default BannerForTopics;
