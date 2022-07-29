export const arrayToMakeLowerKeys = (input: any[]) => {
  let result = input.map(({ questions }) => {
    return questions.map((obj: any) => {
      return toLowerKeys(obj);
    });
  });
  return result;
};

function toLowerKeys(obj: any) {
  const entries = Object.entries(obj);

  return Object.fromEntries(
    entries.map(([key, value]) => {
      return [key.toLowerCase(), value];
    })
  );
}

export function formatTopicsArray(props: any) {
  const ans = props.topics.map(
    (topic: { topicName: any; questions: any[] }) => {
      props.questions.map((question: { topic: any; _id: any }) => {
        if (topic.topicName === question.topic) {
          console.log(
            topic.topicName === question.topic,
            topic.topicName,
            question.topic
          );
          if (!topic.questions.includes(question._id)) {
            topic.questions.push(question._id);
          }
        }
      });

      return topic;
    }
  );

  return ans;
}

// const exportData = () => {
//   const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
//     JSON.stringify(ans)
//   )}`;
//   const link = document.createElement("a");
//   link.href = jsonString;
//   link.download = "data.json";

//   link.click();
// };
