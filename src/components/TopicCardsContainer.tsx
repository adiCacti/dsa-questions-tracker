// libraries
import { Grid } from "@mui/material";
// components
import TopicCard from "./TopicCard";

const TopicCardsContainer = ({ topics }: any) => {
  return (
    <Grid
      container
      display='flex'
      justifyContent='space-around'
      alignItems='center'
      sx={{ width: "100%", maxWidth: "1650px", p: 1 }}
    >
      {topics?.map(
        ({
          topicName,
          started,
          totalQuestions,
          position,
          doneQuestions,
        }: any) => {
          return (
            <Grid item key={position} sx={{ m: 2 }}>
              <TopicCard
                topicName={topicName}
                started={started}
                totalQuestions={totalQuestions}
                doneQuestions={doneQuestions}
              />
            </Grid>
          );
        }
      )}
    </Grid>
  );
};

export default TopicCardsContainer;
