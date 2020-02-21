import {IssueEvent, NoteEvent} from "node-gitlab-webhook/interfaces";
import {MigrateIssueSrv} from "../../Migrate/Application/Service/MigrateIssueSrv";
import {IssueInfo} from "../../Migrate/Domain/MigrateRecord/IssueInfo";
import {RedmineTranslator} from "../Redmine/Translator/RedmineTranslator";
import {MigrateAddNoteSrv} from "../../Migrate/Application/Service/MigrateAddNoteSrv";
import {GitlabIssueEvnetTranslator} from "../Gitlab/Translator/GitlabIssueEvnetTranslator";
import {GitlabNoteEventTranslator} from "../Gitlab/Translator/GitlabNoteEventTranslator";

export class Gitlab2Redmine {
    private redmineTranslator: RedmineTranslator;

    constructor(redmineTranslator?: RedmineTranslator) {
        this.redmineTranslator = redmineTranslator || new RedmineTranslator();
    }

    async migrateGitlabIssue2Redmine(migrateSrv: MigrateIssueSrv, gitlabTranslator: GitlabIssueEvnetTranslator, payload: IssueEvent) {
        const fromIssue: IssueInfo = await gitlabTranslator.toIssueInfo(payload);
        await migrateSrv.handle(fromIssue);
    }

    async addGitlabNote2Redmine(addNoteSrv: MigrateAddNoteSrv, gitlabTranslator: GitlabNoteEventTranslator, payload: NoteEvent) {
        const issueInfo = await gitlabTranslator.toIssueInfo(payload);
        const note = gitlabTranslator.fromNoteEventToNote(payload);
        await addNoteSrv.handle(issueInfo, note);
    }
}