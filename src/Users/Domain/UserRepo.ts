import {User} from "./User";

export interface UserRepo {
    save(user: User): void;

    get(user: User): Promise<User>;
}