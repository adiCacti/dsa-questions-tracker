import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Container } from "@mui/material";
import QuestionsTable from "../components/QuestionsTable";
import Head from "next/head";
import Loader from "../components/common/Loader";

const Index = () => {
  const router = useRouter();

  const { topicname } = router.query;

  if (!topicname) {
    return <Loader />;
  }

  return (
    <Container maxWidth={false} disableGutters={true}>
      <Head>
        <title>
          {topicname[0].toUpperCase() + topicname.slice(1)} Questions
        </title>
      </Head>
      <QuestionsTable topicName={router.query.topicname as string} />
    </Container>
  );
};

export default Index;
