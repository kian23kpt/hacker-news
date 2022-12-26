export interface Item {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: number; //UnixTimestamp;
  title: string;
  type: string;
  url: string;
}