import localforage from "localforage";
import topicQuestionData from "../data/topic_question_data.json";

export const DSADatabase = localforage.createInstance({
  driver: localforage.INDEXEDDB,
  name: "DSA_TRACKER_DB",
  version: 1.0,
  storeName: "DSADatabase",
  description: "This db has the progress status for your DSA adventure.",
});

export const checkIfDbExist = async () => {
  const dbName = "DSA_TRACKER_DB";
  const isExisting = (await window.indexedDB.databases())
    .map((db) => db.name)
    .includes(dbName);
  return isExisting;
};

export const dbInitialize = async () => {
  const topicKeysArray = topicQuestionData.map(({ topicName }) => {
    return topicName.replace(/\s+/g, "_").toLowerCase();
  });

  topicKeysArray.map((topicName, index) => {
    DSADatabase.setItem(topicName, topicQuestionData[index]);
  });

  console.log("🐬 DSADatabase is initialized");
};

export const resetDb = async () => {
  const topicKeysArray = topicQuestionData.map(({ topicName }) => {
    return topicName.replace(/\s+/g, "_").toLowerCase();
  });

  topicKeysArray.map((topicName, index) => {
    DSADatabase.setItem(topicName, topicQuestionData[index]);
  });

  console.log("DSADatabase is re-initialized");
};
