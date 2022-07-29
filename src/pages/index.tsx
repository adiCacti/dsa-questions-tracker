// libraries
import type { NextPage } from "next";
import Head from "next/head";
import { Container, Stack } from "@mui/material";
// components
import TopicCardsContainer from "../components/TopicCardsContainer";
import BannerForTopics from "../components/BannerForTopics";
import Loader from "../components/common/Loader";
// hooks
import useProgress from "../hooks/useTopicData";
import useDb from "../hooks/useDb";

const Home: NextPage = () => {
  const { totalQuestionsCompleted, totalQuestionsPresent, topicsArray } =
    useProgress();

  const { dbPresent } = useDb();

  if (!dbPresent) {
    return <Loader />;
  }

  return (
    <Container maxWidth={false} sx={{ p: 4 }}>
      <Head>
        <title>DSA Questions Tracker App</title>
      </Head>

      <Stack
        direction='column'
        justifyContent='center'
        alignItems='center'
        spacing={2}
      >
        <BannerForTopics
          totalQuestionsPresent={totalQuestionsPresent}
          totalQuestionsCompleted={totalQuestionsCompleted}
        />

        <TopicCardsContainer topics={topicsArray} />
      </Stack>
    </Container>
  );
};

export default Home;
