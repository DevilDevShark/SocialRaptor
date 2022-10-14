import {SexeEnum} from "../enum/SexeEnum";

export class User {

  name: string | undefined;

  firstname: string | undefined;

  email: string | undefined ;

  password: string | undefined;

  age: number = 0;

  dateOfbirth: Date | undefined;

  sexe: SexeEnum | undefined;

  friends: User[] | undefined;
}
