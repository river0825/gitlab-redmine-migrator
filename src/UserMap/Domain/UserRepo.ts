import {User} from "./User";

export interface UserRepo {
    save(user: User): Promise<void>;

    get(user: User): Promise<User>;
}