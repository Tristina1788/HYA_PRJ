import { Page } from "@playwright/test";

const apiKey = process.env.FIREBASE_API_KEY+'';

const dbName = "firebaseLocalStorageDb";
const dbVersion = 1;

const storeName = "firebaseLocalStorage";
const keyPath = "fbase_key";

const domError = (error: DOMException | null): string => {
  if (error === null) {
    return "undefined";
  }
  return `${error.name}: ${error.message}`;
};

// Call within globalSetup to capture auth from signed-in page
export const captureAuthFrom = async (page: Page) => {
  try {
    const result = await page.evaluate(evalReadAuthUser, {
      dbName,
      dbVersion,
      storeName,
      apiKey
    });
    if (!result) {
      throw "Is not auth user result";
    }
    process.env.FIREBASE_AUTH_IDB = JSON.stringify(result);
  } catch (error) {
    console.error("Unable to get auth user from IndexedDb", error);
  }
};

let authUserResult: any | undefined;

// Call with beforeEach to reuse stored auth
export const addAuthTo = async (page: Page) => {
  if (authUserResult === undefined) {
    const authUserResultString = process.env.FIREBASE_AUTH_IDB;
    if (authUserResultString === undefined) {
      return;
    }
    if (!authUserResultString) {
      return;
    }
    const authUserResultParsed: unknown = JSON.parse(authUserResultString);
    authUserResult = authUserResultParsed;
  }

  // Blackhole routes so we can load a page (and avoid a roundtrip with the server),
  // which provides a context for IndexedDB to run, which will otherwise fail.
  const allRoutes = "**/*";
  await page.route(allRoutes, (route) => {
    void route.fulfill({ body: "" });
  });

  // // Route name doesn't matter
  // await page.goto("/void");

  try {
    await page.evaluate(evalSetAuthUser, {
      dbName,
      dbVersion,
      storeName,
      keyPath,
      authUserResult
    });
  } catch (error) {
    console.error("Unable to set auth user in IndexedDb", error);
  }

  // Un-blackhole routes
  await page.unroute(allRoutes);
};

// Read Firebase auth user from IndexedDB (run within page.evaluate)
type EvalReadAuthUserArgs = {
  dbName: string;
  dbVersion: number;
  storeName: string;
  apiKey: string;
};
const evalReadAuthUser = async ({
  dbName,
  dbVersion,
  storeName,
  apiKey
}: EvalReadAuthUserArgs): Promise<unknown> => {
  return new Promise<unknown>((resolve, reject) => {
    const openReq = indexedDB.open(dbName, dbVersion);

    openReq.onerror = () => {
      reject(
        new Error(
          `Error opening IndexedDB database: ${domError(openReq.error)}`
        )
      );
    };

    openReq.onsuccess = () => {
      const db = openReq.result;

      db.onerror = () => {
        reject(new Error("Database error"));
      };

      const readTxn = db.transaction(storeName, "readonly");
      const objStore = readTxn.objectStore(storeName);

      const objName = `firebase:authUser:${apiKey}:[DEFAULT]`;
      const getRequest = objStore.get(objName);

      getRequest.onerror = () => {
        reject(new Error(`Error getting data: ${domError(getRequest.error)}`));
      };

      getRequest.onsuccess = () => {
        resolve(getRequest.result);
        return;
      };
    };
  });
};

// Sets Firebase auth user in IndexedDB (run within page.evaluate)
type EvalSetAuthUserArgs = {
  dbName: string;
  dbVersion: number;
  storeName: string;
  keyPath: string;
  authUserResult: any;
};
const evalSetAuthUser = async ({
  dbName,
  dbVersion,
  storeName,
  keyPath,
  authUserResult
}: EvalSetAuthUserArgs): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    const openReq = indexedDB.open(dbName, dbVersion);

    openReq.onerror = () => {
      reject(
        new Error(
          `Error opening IndexedDB database: ${domError(openReq.error)}`
        )
      );
    };

    openReq.onupgradeneeded = () => {
      const db = openReq.result;
      db.createObjectStore(storeName, { keyPath });
    };

    openReq.onsuccess = () => {
      const db = openReq.result;

      db.onerror = () => {
        reject(new Error("Database error"));
      };

      const addTxn = db.transaction(storeName, "readwrite");

      addTxn.onerror = () => {
        reject(new Error(`add transaction error: ${domError(addTxn.error)}`));
      };

      addTxn.oncomplete = () => {
        resolve();
      };

      const objStore = addTxn.objectStore(storeName);
      const addReq = objStore.add(authUserResult);

      addReq.onerror = () => {
        reject(new Error(`Error adding auth user: ${domError(addReq.error)}`));
      };

      addReq.onsuccess = () => {
        console.log("Successfully added request");
      };
    };
  });
};
