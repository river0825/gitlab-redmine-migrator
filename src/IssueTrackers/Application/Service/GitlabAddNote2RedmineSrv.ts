import {UserJSONRepo} from "../../../App/Infra/UserJSONRepo";
import {User} from "../../../UserMap/Domain/User";
import {RedmineRepo} from "../../Redmine/Repo/RedmineRepo";
import {MigrateIssueSrv} from "../../../Migrate/Application/Service/MigrateIssueSrv";
import {MigrateRecordRepo} from "../../../App/Infra/MigrateRecordRepo";
import {GitlabIssueEvnetTranslator} from "../../Gitlab/Translator/GitlabTranslator";
import {EventData, IssueEvent} from "node-gitlab-webhook/interfaces";

export class GitlabAddNote2RedmineSrv {
    handle(event: EventData<IssueEvent>) {
        console.log(
            'Received a issue event for repo "%s". Issue Name %s',
            event.payload.repository.name,
            event.payload.object_attributes.title,
        );

        // get mapers
        // get translator
        // get repo

        // save remote repo

        /**
         * get repo by user
         */
        const userRepo = new UserJSONRepo();
        userRepo.get({GitlabUserId: event.payload.object_attributes.author_id.toString()}).then((user?: User) => {
            const toIssueRepo = new RedmineRepo(user ? user.RedmineToken : undefined);
            /**
             *
             */
            const srv = new MigrateIssueSrv(toIssueRepo, new MigrateRecordRepo());
            srv.handleWithTranslator(event.payload, new GitlabIssueEvnetTranslator());
        });
    }
}