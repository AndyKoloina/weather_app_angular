export interface Weather {
  city: string;
  temp: number;
  condition: string;
  icon: string;
  forecast: { date: string; temp: number }[];
}