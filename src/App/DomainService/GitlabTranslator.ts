import {IssueInfo, Issuer, IssueState} from "../../Migrate/Domain/MigrateRecord/IssueInfo";
import {Issue, IssueEvent, NoteEvent} from "node-gitlab-webhook/interfaces";
import {IssueInfoStatusMapper} from "./IssueInfoStatusMapper";
import {Translator} from "../../Migrate/Domain/Translator/Translator";
import {MigrateRecord} from "../../Migrate/Domain/MigrateRecord/MigrateRecord";

export class GitlabIssueEvnetTranslator implements Translator<IssueEvent, Issue> {
    private issueMapper: IssueInfoStatusMapper<IssueEvent>;

    constructor(issueMapper: IssueInfoStatusMapper<IssueEvent>) {
        this.issueMapper = issueMapper;
    }

    fromIssueInfo(issueInfo: IssueInfo, migrateRecord: MigrateRecord): Promise<Issue> {
        return new Promise<Issue>((resolve, reject) => {
            reject("not implement yet");
        });
    }

    toIssueInfo(issueEvent: IssueEvent, migrateRecord?: MigrateRecord): Promise<IssueInfo> {
        return new Promise<IssueInfo>((resolve) => {
            const labelArr = issueEvent.labels.map<string>((label) => {
                return label.title
            });

            const issueInfo = new IssueInfo({
                id: {id: issueEvent.object_attributes.id.toString(), issuer: Issuer.Gitlab},
                title: issueEvent.object_attributes.title,
                assignee: issueEvent.assignee ? issueEvent.assignee.name : "",
                author: issueEvent.user.name,
                projectId: issueEvent.project.id,
                createdAt: new Date(issueEvent.object_attributes.created_at),
                updatedAt: new Date(issueEvent.object_attributes.updated_at),
                description: issueEvent.object_attributes.description,
                // milestone: issueEvent.project..milestone!.title,
                state: issueEvent.object_attributes.state.toLowerCase() === 'open' ? IssueState.Open : IssueState.InProgress,
                url: issueEvent.object_attributes.url,
                labels: labelArr
            });

            console.log(JSON.stringify(issueInfo));

            resolve(issueInfo);
        });

    }

}

export class GitlabTranslator {
    // static issueInfoStatusMapper: IssueInfoStatusMapper;

    static fromIssueEvent(issueEvent: IssueEvent): IssueInfo {
        const labelArr = issueEvent.labels.map<string>((label) => {
            return label.title
        });

        const issueInfo = new IssueInfo({
            id: {id: issueEvent.object_attributes.id.toString(), issuer: Issuer.Gitlab},
            title: issueEvent.object_attributes.title,
            assignee: issueEvent.assignee ? issueEvent.assignee.name : "",
            author: issueEvent.user.name,
            projectId: issueEvent.project.id,
            createdAt: new Date(issueEvent.object_attributes.created_at),
            updatedAt: new Date(issueEvent.object_attributes.updated_at),
            description: issueEvent.object_attributes.description,
            // milestone: issueEvent.project..milestone!.title,
            state: issueEvent.object_attributes.state.toLowerCase() === 'open' ? IssueState.Open : IssueState.InProgress,
            url: issueEvent.object_attributes.url,
            labels: labelArr
        });

        console.log(JSON.stringify(issueInfo));

        return issueInfo;
    }

    static fromNoteEvent(event: NoteEvent): IssueInfo {
        return new IssueInfo({
            id: {id: event.issue!.id.toString(), issuer: Issuer.Gitlab},
            projectId: event.project.id,
            updatedAt: new Date(event.object_attributes.updated_at),

            title: event.issue!.title,
            // assignee: event.issue.assignee_id.name,
            author: event.user.name,
            createdAt: new Date(event.issue!.created_at),
            description: event.issue!.description,
            // milestone: issueEvent.project..milestone!.title,
            state: event.issue!.state.toLowerCase() === 'open' ? IssueState.Open : IssueState.InProgress,
            url: event.object_attributes.url,
        });
    }

    static fromNoteEventToNote(event: NoteEvent): string {
        return `${event.user.name}: ${event.object_attributes.note} > ${event.object_attributes.url}`
    }
}