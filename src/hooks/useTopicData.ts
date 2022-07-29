import { useCallback, useEffect, useState } from "react";
// services
import { DSADatabase } from "../services/dbServices";
// hooks
import useDb from "./useDb";

interface ReturnType {
  totalQuestionsCompleted: number;
  totalQuestionsPresent: number;
  topicsArray: any[];
}
function useTopicData(defaultValue?: boolean): ReturnType {
  const { dbPresent, dbKeys } = useDb();

  const [totalQuestionsCompleted, setTotalQuestionCompleted] = useState(0);

  const [totalQuestionsPresent, setTotalQuestionsPresent] = useState(0);

  const [topicsArray, setTopicsArray] = useState<any[]>([]);

  const calculateProgress = useCallback(async () => {
    if (!topicsArray) return;

    const questionInfoArray = await Promise.all(
      topicsArray.map(async (topic) => {
        const { totalQuestions, doneQuestions }: any = topic;
        return { totalQuestions, doneQuestions };
      })
    );

    setTotalQuestionsPresent(
      questionInfoArray.reduce((acc, { totalQuestions }: any) => {
        return acc + totalQuestions;
      }, 0)
    );

    setTotalQuestionCompleted(
      questionInfoArray.reduce((acc, { doneQuestions }: any) => {
        return acc + doneQuestions;
      }, 0)
    );
  }, [topicsArray]);

  const getTopicArray = useCallback(async () => {
    if (!dbPresent) return;

    const itemsArray = await Promise.all(
      dbKeys.map(async (key) => {
        const item: any = await DSADatabase.getItem(key);
        return item;
      })
    );

    setTopicsArray(itemsArray);
  }, [dbKeys, dbPresent]);

  useEffect(() => {
    calculateProgress();
  }, [calculateProgress]);

  useEffect(() => {
    getTopicArray();
  }, [getTopicArray]);

  return { totalQuestionsCompleted, totalQuestionsPresent, topicsArray };
}

export default useTopicData;
