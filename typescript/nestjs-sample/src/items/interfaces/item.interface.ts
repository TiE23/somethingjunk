export interface Item {
  id?: string; // Optional because the DB provides it.
  name: string;
  description?: string;
  qty: number;
}
