export interface Publication {
  name: string | undefined;
  description: string | undefined;
  date: Date | undefined;
  pathImg: string | undefined; // can be change
  like: number | undefined;
  comment: Comment[] | undefined;
}
