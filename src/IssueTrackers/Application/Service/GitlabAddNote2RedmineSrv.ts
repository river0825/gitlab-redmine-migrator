import {UserJSONRepo} from "../../../App/Infra/UserJSONRepo";
import {RedmineRepo} from "../../Redmine/Repo/RedmineRepo";
import {MigrateRecordRepo} from "../../../App/Infra/MigrateRecordRepo";
import {EventData, NoteEvent} from "node-gitlab-webhook/interfaces";
import {RedmineTranslator} from "../../Redmine/Translator/RedmineTranslator";
import {Gitlab2Redmine} from "../../DomainService/Gitlab2Redmine";
import {MigrateAddNoteSrv} from "../../../Migrate/Application/Service/MigrateAddNoteSrv";
import {GitlabNoteEventTranslator} from "../../Gitlab/Translator/GitlabNoteEventTranslator";

interface GitlabAddNote2RedmineSrvOptions {
    Gitlab2Redmine?: Gitlab2Redmine
}

export class GitlabAddNote2RedmineSrv {
    static async handle(event: EventData<NoteEvent>, options?: GitlabAddNote2RedmineSrvOptions) {
        const gitlabTranslator = new GitlabNoteEventTranslator();
        const redmineTranslator = new RedmineTranslator();

        /**
         * In case set set the redmine issue creator, we have to get api token from userRepo
         */
        const userRepo = new UserJSONRepo();
        const user = await userRepo.get({GitlabUserId: event.payload.object_attributes.author_id.toString()});
        if (!user) {
            throw Error(`user not found: ${event.payload.object_attributes.author_id}`);
        }

        const toIssueRepo = new RedmineRepo(user ? user.RedmineToken : undefined);
        toIssueRepo.setTranslator(redmineTranslator);

        /**
         * Prepare migrate service
         */
        const migrateRepo = new MigrateRecordRepo();
        const addNoteSrv = new MigrateAddNoteSrv(toIssueRepo, migrateRepo);
        const gitlab2Redmine = (options ? options!.Gitlab2Redmine : undefined) || new Gitlab2Redmine();

        /**
         * All material prepared, execute it!!
         */
        await gitlab2Redmine.addGitlabNote2Redmine(addNoteSrv, gitlabTranslator, event.payload);
    }
}