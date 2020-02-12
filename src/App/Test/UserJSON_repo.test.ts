import {UserJSONRepo} from "../Infra/UserJSONRepo";
import {User} from "../../UserMap/Domain/User";

describe("user repo", () => {
    test("User should save", async () => {
        const userRepo = new UserJSONRepo();
        const user = {
            GitlabUserId: "GitlabUserId",
            GitlabUserEmail: "GitlabUserEmail",
            RedmineUserId: "RedmineUserId",
            RedmineToken: "RedmineToken",
        } as User;

        userRepo.save(user);

        const userFromRepo = await userRepo.get(user);
        expect(userFromRepo.RedmineToken).toBe(user.RedmineToken);


        user.RedmineUserId = user.RedmineUserId + "_this is new id";
        user.RedmineToken = user.RedmineToken + "_this is new token";
        userRepo.save(user);

        const userFromRepo2 = await userRepo.get(user);
        expect(userFromRepo2.RedmineToken).not.toBe(userFromRepo.RedmineToken);
        expect(userFromRepo2.RedmineToken).toBe(user.RedmineToken);
        expect(userFromRepo2.RedmineUserId).not.toBe(userFromRepo.RedmineUserId);
        expect(userFromRepo2.RedmineUserId).toBe(user.RedmineUserId);
    });


    test("Get User List", async () => {
        const userRepo = new UserJSONRepo();
        const user = {
            GitlabUserId: "GitlabUserId-" + Math.random(),
            GitlabUserEmail: "GitlabUserEmail",
            RedmineUserId: "RedmineUserId",
            RedmineToken: "RedmineToken",
        } as User;

        await userRepo.save(user);

        const list = await userRepo.getList();
        console.log(list);
        expect(list.length).toBeGreaterThan(0);
    })
});

