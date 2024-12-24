export interface ClockTime {
  clockIn: string | null;
  clockOut: string | null;
}

export interface User {
  username: string;
  password: string;
  role: "user" | "admin";
  clockTimes: ClockTime[];
}

export interface Data {
  users: Map<string, User>; // Key is username
}
