const STORAGE_KEY = "bruno.storage.key";
export function getData() {
  let recordData;
  try {
    recordData = localStorage.getItem(STORAGE_KEY);
  } catch (error) {
    throw new error(
      "Sorry! can not acccess your data at the moment. Try again later",
      console.Error(Error),
    );
  }

  if (recordData === null) {
    return [];
  }
  let records;
  try {
    records = JSON.parse(storedValue);
  } catch (error) {
    throw new error("Oooops", console.error(Error));
  }
  return records;
}

export function saveData(records) {
  let data;
  if (!Array.isArray(records)) {
    throw new error("Data must be an array");
  }
   
  try {
    data = JSON.stringify(records);
    localStorage.setItem(STORAGE_KEY, data);
  } catch (error) {
    throw new error(console.error(error));
  }
}
