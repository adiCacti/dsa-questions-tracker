import { useEffect, useState } from "react";

import {
  DSADatabase,
  dbInitialize,
  checkIfDbExist,
} from "../services/dbInitialize";

interface ReturnType {
  dbKeys: string[];
  dbPresent: boolean;
}
function useDb(defaultValue?: boolean): ReturnType {
  const [dbPresent, setDbPresent] = useState(false);

  const [dbKeys, setDbKeys] = useState<string[]>([]);

  useEffect(() => {
    const getDbStatus = async () => {
      const status = await checkIfDbExist();

      if (status) {
        console.log("🥨 DSADatabase is present");
      }

      if (!status) {
        console.log("⚔ DSADatabase is not present");

        dbInitialize();
      }

      setDbKeys(await DSADatabase.keys());
      setDbPresent(true);
    };

    getDbStatus();
  }, []);

  return { dbKeys, dbPresent };
}

export default useDb;
