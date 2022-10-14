import {User} from "./user";

export class Comment {
  user: User | undefined;
  textComment: string | undefined;

  // if moderator
  archived: boolean = false;

}
