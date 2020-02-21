/**
 * Module dependencies.
 */
import {Command} from 'commander';
import {AddUserSrv} from "../UserMap/Application/Service/AddUserSrv";
import {UserJSONRepo} from "./Infra/UserJSONRepo";

const commander = new Command();

commander.version('0.0.11');

commander.command("adduser <gitlabUserId> <gitlabUserEmail> <redmineToken> <redmineUserId>")
    .description("Add a user mapping to map to redmine user")
    .action(async (gitlabUserId, gitlabUserEmail, redmineToken, redmineUserId) => {
        const userRepo = new UserJSONRepo();
        const srv = new AddUserSrv(userRepo);
        await srv.handle({
            GitlabUserEmail: gitlabUserEmail,
            GitlabUserId: gitlabUserId,
            RedmineToken: redmineToken,
            RedmineUserId: redmineUserId
        });
        console.log("User add successfully.")
    });

commander.command("listuser <gitlabUserId>")
    .description("Add a user mapping to map to redmine user")
    .action(async (gitlabUserId) => {
        const userRepo = new UserJSONRepo();
        const user = await userRepo.get({
            GitlabUserId: gitlabUserId
        });
        console.log(user)
    });


commander.command("deluser <gitlabUserId>")
    .description("Add a user mapping to map to redmine user")
    .action(async (gitlabUserId) => {
        const userRepo = new UserJSONRepo();
        try {
            await userRepo.del({
                GitlabUserId: gitlabUserId
            });
            console.log("User delete successfully")
        } catch (e) {
            console.error(e);
        }
    });

commander.parse(process.argv);
