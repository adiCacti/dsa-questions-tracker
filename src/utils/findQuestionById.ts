export const findQuestionById = (id: string, questionsArray: any) => {
  return questionsArray.find(
    (question: { _id: string }) => question._id === id
  );
};
