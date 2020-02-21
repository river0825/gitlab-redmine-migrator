import {UserRepo} from "../../Domain/UserRepo";
import {User} from "../../Domain/User";
import {AddUserSpec} from "../../Spec/AddUserSpec";

export class AddUserSrv {
    private userRepo: UserRepo;

    constructor(userRepo: UserRepo) {
        this.userRepo = userRepo;
    }

    async handle(user: User) {
        AddUserSpec.check(user);
        await this.userRepo.save(user)
    }
}