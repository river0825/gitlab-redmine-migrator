import {RemoteIssueRepo} from "../../../Migrate/Domain/MigrateRecord/RemoteIssueRepo";
import {IssueId, IssueInfo, Issuer} from "../../../Migrate/Domain/MigrateRecord/IssueInfo";
import {Issue, IssueData, Redmine as RedmineClass} from "node-redmine";
import {Translator} from "../../../Migrate/Domain/Translator/Translator";
import {RedmineTranslator} from "../Translator/RedmineTranslator";

// tslint:disable-next-line:variable-name
const Redmine = require("node-redmine");

export class RedmineRepo implements RemoteIssueRepo {
    private redmineWithProject: RedmineClass;
    private redmine: RedmineClass;
    private _translator?: Translator<Issue, IssueData>;

    /**
     *
     * @param apiKey the api key from users
     */
    constructor(apiKey?: string) {
        const hostname = process.env.REDMINE_HOST || 'http://www.hostedredmine.com/';
        const projectPath = process.env.REDMINE_PROJECT_PATH || '/projects/gitlab-redmine-migrator';
        const hostWithProject = (hostname + projectPath) || 'http://www.hostedredmine.com/projects/test-credit-system';

        const config = {
            apiKey: apiKey || process.env.REDMINE_APIKEY || '77327f8a54450266a4853d015cb286f445f80590',
        };

        this.redmine = new Redmine(hostname, config, Number(process.env.REDMINE_PORT || '80'));
        this.redmineWithProject = new Redmine(hostWithProject, config, Number(process.env.REDMINE_PORT || '80'));
        this._translator = new RedmineTranslator();
        // this.translator = null;
    }

    setTranslator(translator: Translator<Issue, IssueData>): void {
        this._translator = translator;
    }

    addIssue(issue: IssueInfo): Promise<IssueId> {
        return new Promise<IssueId>((resolve, reject) => {

            this._translator!.fromIssueInfo(issue).then((redmineIssue: IssueData) => {
                // tslint:disable-next-line:no-any
                this.redmineWithProject.create_issue(redmineIssue, (err: any, data: Issue) => {
                    if (err) {
                        return reject(err);
                    }

                    console.log(["create_issue succ", data]);
                    resolve({
                        id: data.issue.id!.toString(),
                        issuer: Issuer.Redmine
                    });
                })
            });
        })
    }


    addNote(issueId: IssueId, note: string): Promise<void> {
        const translator = new RedmineTranslator();

        return new Promise<void>((resolve, reject) => {
            translator.fromIssueIdToAddNote(issueId, note).then((redmineIssue) => {
                // tslint:disable-next-line:ban-ts-ignore no-any
                this.redmine.update_issue(Number.parseInt(issueId.id, 10), redmineIssue, (err: any) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve();
                })
            });
        })
    }

    queryIssue(issue: IssueInfo): Promise<IssueInfo> {
        return new Promise<IssueInfo>(() => {
        })
    }

    updateIssue(issue: IssueInfo): Promise<IssueId> {
        const translator = new RedmineTranslator();
        return new Promise<IssueId>((resolve, reject) => {
            translator.fromIssueInfo(issue).then((redmineIssue) => {
                // tslint:disable-next-line:no-any
                this.redmine.update_issue(Number.parseInt(issue.props.toIssueId!.id, 10), redmineIssue, (err: any) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(issue.props.toIssueId);
                })
            });
        })
    }
}