import {UserRepo} from "../../Domain/UserRepo";
import {User} from "../../Domain/User";

export class AddUserSrv {
    private userRepo: UserRepo;

    constructor(userRepo: UserRepo) {
        this.userRepo = userRepo;
    }

    async handle(user: User) {
        this.userRepo.save(user)
    }

}