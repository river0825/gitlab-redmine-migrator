import {RemoteIssueRepo} from "../../Migrate/Domain/MigrateRecord/RemoteIssueRepo";
import {IssueId, IssueInfo, Issuer} from "../../Migrate/Domain/MigrateRecord/IssueInfo";
import {Issue} from "node-redmine";
import {RedmineTranslator} from "../DomainService/RedmineTranslator";

// tslint:disable-next-line:variable-name
const Redmine = require("node-redmine");

export class RedmineRepo implements RemoteIssueRepo {
    // tslint:disable-next-line:ban-ts-ignore
    // @ts-ignore
    private redmineWithProject: Redmine;
    // tslint:disable-next-line:ban-ts-ignore
    // @ts-ignore
    private redmine: Redmine;

    constructor() {
        const hostname = process.env.REDMINE_HOST || 'http://www.hostedredmine.com/';
        const hostWithProject = (process.env.REDMINE_HOST!.toString() + process.env.REDMINE_PROJECT_PATH!.toString()) || 'http://www.hostedredmine.com/projects/test-credit-system';

        const config = {
            apiKey: process.env.REDMINE_APIKEY || '77327f8a54450266a4853d015cb286f445f80590',
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
            this.redmine.update_issue(Number.parseInt(issueId.id, 10), redmineIssue, (err: any, data: Issue) => {
                if (err) {
                    return reject(err);
                }
                resolve();
            })
        })
    }

    queryIssue(issue: IssueInfo): Promise<IssueInfo> {
        return new Promise<IssueInfo>((resolve, reject) => {
        })
    }

    updateIssue(issue: IssueInfo): Promise<IssueId> {
        const translator = new RedmineTranslator();
        const redmineIssue = translator.fromIssueInfoToIssueData(issue);
        return new Promise<IssueId>((resolve, reject) => {
            // tslint:disable-next-line:ban-ts-ignore no-any
            this.redmine.update_issue(Number.parseInt(issue.props.toIssueId!.id, 10), redmineIssue, (err: any, data: Issue) => {
                if (err) {
                    return reject(err);
                }
                resolve(issue.props.toIssueId);
            })
        })
    }
}