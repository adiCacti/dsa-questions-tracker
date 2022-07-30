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
  await localforage.dropInstance({
    name: "DSA_TRACKER_DB",
    storeName: "DSADatabase",
  });

  console.log("💧 Database Dropped");

  const topicKeysArray = topicQuestionData.map(({ topicName }) => {
    return topicName.replace(/\s+/g, "_").toLowerCase();
  });

  topicKeysArray.map((topicName, index) => {
    DSADatabase.setItem(topicName, topicQuestionData[index]);
  });

  console.log("🐬 DSADatabase is initialized");
};

export const resetDb = async () => {
  await localforage.dropInstance({
    name: "DSA_TRACKER_DB",
    storeName: "DSADatabase",
  });

  console.log("💧 Database Dropped");

  const topicKeysArray = topicQuestionData.map(({ topicName }) => {
    return topicName.replace(/\s+/g, "_").toLowerCase();
  });

  topicKeysArray.map((topicName, index) => {
    DSADatabase.setItem(topicName, topicQuestionData[index]);
  });

  console.log("📦 DSADatabase is re-initialized");
};

export const exportData = (data: any) => {
  const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
    JSON.stringify(data)
  )}`;
  const link = document.createElement("a");
  link.href = jsonString;
  link.download = "data.json";

  link.click();
};

export const importData = async (data: any) => {
  await localforage.dropInstance({
    name: "DSA_TRACKER_DB",
    storeName: "DSADatabase",
  });

  console.log("💧 Database Dropped");

  const topicKeysArray = data.map(({ topicName }: any) => {
    return topicName.replace(/\s+/g, "_").toLowerCase();
  });

  topicKeysArray.map((topicName: string, index: number) => {
    DSADatabase.setItem(topicName, data[index]);
  });

  console.log("🛎️ DSADatabase is imported and initialized");
};
