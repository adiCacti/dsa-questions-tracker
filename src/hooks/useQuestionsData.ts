import { Dispatch, useCallback, useEffect, useState } from "react";
import { DSADatabase } from "../services/dbServices";

interface ReturnType {
  topicData: any;
  setTopicData: Dispatch<any>;
  totalQuestionsCompletedPerTopic: number;
  totalQuestionsPresentPerTopic: number;
}
function useQuestionsData(topicName?: string): ReturnType {
  const [topicData, setTopicData] = useState<any>();

  const [totalQuestionsCompletedPerTopic, setTotalQuestionCompletedPerTopic] =
    useState(0);

  const [totalQuestionsPresentPerTopic, setTotalQuestionsPresentPerTopic] =
    useState(0);

  const calculateProgress = useCallback(async () => {
    if (!topicData) return;

    setTotalQuestionsPresentPerTopic(topicData.totalQuestions);

    setTotalQuestionCompletedPerTopic(
      topicData.questions.reduce((acc: number, { status }: any) => {
        const temp = status ? 1 : 0;
        return acc + temp;
      }, 0)
    );
  }, [topicData]);

  const getTopicData = useCallback(async () => {
    if (!topicName) return;

    const temp = await DSADatabase.getItem(topicName);

    setTopicData(temp);
  }, [topicName]);

  const updateDSADatabase = useCallback(async () => {
    if (!topicData) return;

    DSADatabase.setItem(topicName as string, topicData);
  }, [topicData, topicName]);

  useEffect(() => {
    calculateProgress();
  }, [calculateProgress]);

  useEffect(() => {
    getTopicData();
  }, [getTopicData]);

  useEffect(() => {
    updateDSADatabase();
  }, [updateDSADatabase]);

  return {
    topicData,
    setTopicData,
    totalQuestionsCompletedPerTopic,
    totalQuestionsPresentPerTopic,
  };
}

export default useQuestionsData;
