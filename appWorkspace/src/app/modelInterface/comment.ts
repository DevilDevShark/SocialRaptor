import {User} from "./user";

export interface Comment {
  user: User | undefined;
  textComment: string | undefined;

  // if moderator
  archived: boolean;

}
