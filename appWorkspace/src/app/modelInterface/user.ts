import {SexeEnum} from "../enum/SexeEnum";

export interface User {

  name: string | undefined;

  firstname: string | undefined;

  email: string | undefined ;

  password: string | undefined;

  age: number;

  dateOfbirth: Date | undefined;

  sexe: SexeEnum | undefined;

  friends: User[] | undefined;
}
