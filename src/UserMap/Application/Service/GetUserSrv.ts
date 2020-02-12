import {UserRepo} from "../../Domain/UserRepo";
import {User} from "../../Domain/User";

export class GetUserSrv {
    private userRepo: UserRepo;

    constructor(userRepo: UserRepo) {
        this.userRepo = userRepo;
    }

    async handle(user: User): Promise<User> {
        return this.userRepo.get(user)
    }
}