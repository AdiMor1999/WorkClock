export interface ClockTime {
  clockIn: string;
  clockOut: string;
}

export interface Report {
  username: string;
  clockTimes: ClockTime[];
}
