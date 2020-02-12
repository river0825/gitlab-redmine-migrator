import {RemoteIssueRepo} from "../../Migrate/Domain/MigrateRecord/RemoteIssueRepo";
import {IssueId, IssueInfo, Issuer} from "../../Migrate/Domain/MigrateRecord/IssueInfo";
// It will import the redmine interface from the @type
// It define the interface of all the redmine api
// this module if different from the next one below
import {Issue} from "node-redmine";
import {RedmineTranslator} from "../DomainService/RedmineTranslator";

// It will import from the real node_module
// and can be called easily
// tslint:disable-next-line:variable-name
const Redmine = require("node-redmine");


export class RedmineRepo implements RemoteIssueRepo {
    // tslint:disable-next-line:ban-ts-ignore
    // @ts-ignore
    private redmineWithProject: Redmine;
    // tslint:disable-next-line:ban-ts-ignore
    // @ts-ignore
    private redmine: Redmine;

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

        this.redmine = new Redmine(hostname, config);
        this.redmineWithProject = new Redmine(hostWithProject, config);
    }

    addIssue(issue: IssueInfo): Promise<IssueId> {
        const translator = new RedmineTranslator();
        const redmineIssue = translator.fromIssueInfoToIssueData(issue);
        return new Promise<IssueId>((resolve, reject) => {
            // tslint:disable-next-line:ban-ts-ignore no-any
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
        })
    }


    addNote(issueId: IssueId, note: string): Promise<void> {
        const translator = new RedmineTranslator();
        const redmineIssue = translator.fromNoteToIssueData(issueId, note);

        return new Promise<void>((resolve, reject) => {
            // tslint:disable-next-line:ban-ts-ignore no-any
            this.redmine.update_issue(Number.parseInt(issueId.id, 10), redmineIssue, (err: any) => {
                if (err) {
                    return reject(err);
                }
                resolve();
            })
        })
    }

    queryIssue(issue: IssueInfo): Promise<IssueInfo> {
        return new Promise<IssueInfo>(() => {
        })
    }

    updateIssue(issue: IssueInfo): Promise<IssueId> {
        const translator = new RedmineTranslator();
        const redmineIssue = translator.fromIssueInfoToIssueData(issue);
        console.log(['to redmine issue', redmineIssue]);
        return new Promise<IssueId>((resolve, reject) => {
            // tslint:disable-next-line:ban-ts-ignore no-any
            this.redmine.update_issue(Number.parseInt(issue.props.toIssueId!.id, 10), redmineIssue, (err: any) => {
                if (err) {
                    return reject(err);
                }
                resolve(issue.props.toIssueId);
            })
        })
    }
}