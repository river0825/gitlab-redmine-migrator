import {IssueEvent} from "node-gitlab-webhook/interfaces";
import {GitlabIssueEvnetTranslator} from "../Gitlab/Translator/GitlabTranslator";
import {MigrateIssueSrv} from "../../Migrate/Application/Service/MigrateIssueSrv";
import {IssueInfo} from "../../Migrate/Domain/MigrateRecord/IssueInfo";
import {RedmineTranslator} from "../Redmine/Translator/RedmineTranslator";

export class Gitlab2Redmine {
    private gitlabTranslator: GitlabIssueEvnetTranslator;
    private migrateSrv: MigrateIssueSrv;
    private redmineTranslator: RedmineTranslator;

    constructor(migrateSrv: MigrateIssueSrv, gitlabTranslator?: GitlabIssueEvnetTranslator, redmineTranslator?: RedmineTranslator) {
        this.migrateSrv = migrateSrv;
        this.gitlabTranslator = gitlabTranslator || new GitlabIssueEvnetTranslator();
        this.redmineTranslator = redmineTranslator || new RedmineTranslator();
    }

    async migrateGitlabIssue2Redmine(payload: IssueEvent) {
        const fromIssue: IssueInfo = await this.gitlabTranslator.toIssueInfo(payload);
        await this.migrateSrv.handle(fromIssue);
    }
}