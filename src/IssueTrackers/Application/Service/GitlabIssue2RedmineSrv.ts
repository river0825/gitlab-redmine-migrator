import {UserJSONRepo} from "../../../App/Infra/UserJSONRepo";
import {RedmineRepo} from "../../Redmine/Repo/RedmineRepo";
import {MigrateIssueSrv} from "../../../Migrate/Application/Service/MigrateIssueSrv";
import {MigrateRecordRepo} from "../../../App/Infra/MigrateRecordRepo";
import {GitlabIssueEvnetTranslator} from "../../Gitlab/Translator/GitlabTranslator";
import {EventData, IssueEvent} from "node-gitlab-webhook/interfaces";
import {Gitlab2Redmine} from "../../DomainService/Gitlab2Redmine";
import {RedmineTranslator} from "../../Redmine/Translator/RedmineTranslator";

interface GitlabIssue2RedmineSrvOptions {
    Gitlab2Redmine?: Gitlab2Redmine
}

/**
 * Prepare data
 */
export class GitlabIssue2RedmineSrv {
    static async handle(event: EventData<IssueEvent>, options?: GitlabIssue2RedmineSrvOptions) {
        const gitlabTranslator = new GitlabIssueEvnetTranslator();
        const redmineTranslator = new RedmineTranslator();

        /**
         * In case set set the redmine issue creator, we have to get api token from userRepo
         */
        const userRepo = new UserJSONRepo();
        const user = await userRepo.get({GitlabUserId: event.payload.object_attributes.author_id.toString()});
        const toIssueRepo = new RedmineRepo(user ? user.RedmineToken : undefined);
        toIssueRepo.setTranslator(redmineTranslator);

        /**
         * Prepare migrate service
         */
        const migrateRepo = new MigrateRecordRepo();
        const migrateSrv = new MigrateIssueSrv(toIssueRepo, migrateRepo);
        const gitlab2Redmine = (options ? options!.Gitlab2Redmine : undefined) || new Gitlab2Redmine(migrateSrv, gitlabTranslator);

        /**
         * All material prepared, execute it!!
         */
        await gitlab2Redmine.migrateGitlabIssue2Redmine(event.payload);
    }
}