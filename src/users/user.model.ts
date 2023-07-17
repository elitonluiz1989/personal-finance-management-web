import { mapFrom } from "@/app/helpers/helpers";
import { IIndexable } from "@/app/types";
import { UserRoleEnum } from "./enuns/user-role.enum";

export class User {
  public id = 0;
  public userName = "";
  public name = "";
  public email = "";
  public role = UserRoleEnum;

  public static createFrom<TData extends IIndexable<any>>(data: TData): User {
    const user = new User();

    mapFrom(data, user);

    return user;
  }
}
