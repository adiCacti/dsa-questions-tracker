import React, { useState } from "react";
import { Box, Divider, LinearProgress, Typography } from "@mui/material";

interface BannerProps {
  totalProgress: number;
  totalQuestionsCompleted: number;
}

const Banner = ({ totalProgress, totalQuestionsCompleted }: BannerProps) => {
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
      <Typography variant='h2' component='div'>
        DSA Questions Tracker 🏆
      </Typography>

      <Divider sx={{ color: "black", height: "10px", width: "200px" }} />

      <Typography variant='h6' component='div' sx={{ m: 2 }}>
        Your Gateway to crack DSA
      </Typography>

      <Typography variant='h4' component='div' gutterBottom>
        Total Questions Solved : {totalQuestionsCompleted} ({totalProgress}%
        Done)
      </Typography>

      <Box sx={{ width: "80%" }}>
        <LinearProgress
          variant='determinate'
          value={totalProgress}
          color='success'
          sx={{
            height: "20px",
            borderRadius: "100px",
          }}
        />
      </Box>
    </Box>
  );
};

export default Banner;
