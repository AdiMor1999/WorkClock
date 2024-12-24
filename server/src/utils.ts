import fs from "fs";
import { Data, User } from "./types";

const DATA_FILE = "./data.json";

// Load data from file into memory
export function loadData(): Data {
  if (fs.existsSync(DATA_FILE)) {
    const fileContent = fs.readFileSync(DATA_FILE, "utf-8");
    const parsedData = JSON.parse(fileContent);

    const users = new Map<string, User>(Object.entries(parsedData.users));

    return { users };
  }
  return { users: new Map() };
}

// Save memory data to file
export function saveData(data: Data): void {
  const serializableData = {
    users: Object.fromEntries(data.users),
  };
  fs.writeFileSync(DATA_FILE, JSON.stringify(serializableData, null, 2));
}
