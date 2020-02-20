import {Translator} from "../../../Migrate/Domain/Translator/Translator";
import {Issue, IssueEvent, NoteEvent} from "node-gitlab-webhook/interfaces";
import {IssueId, IssueInfo, Issuer, IssueState} from "../../../Migrate/Domain/MigrateRecord/IssueInfo";

export class GitlabIssueEvnetTranslator implements Translator<IssueEvent, Issue> {
    fromIssueInfo(issueInfo: IssueInfo): Promise<Issue> {
        return new Promise<Issue>((resolve, reject) => {
            reject("not implement yet");
        });
    }


    fromIssueIdToAddNote(issueId: IssueId, note: string): Promise<Issue> {
        return new Promise<Issue>((_, reject) => {
            reject("not implement yet");
        });
    }

    toIssueInfo(issueEvent: IssueEvent): Promise<IssueInfo> {
        return new Promise<IssueInfo>((resolve) => {
            const labelArr = issueEvent.labels.map<string>((label) => {
                return label.title
            });

            const issueInfo = new IssueInfo({
                id: {id: issueEvent.object_attributes.id.toString(), issuer: Issuer.Gitlab},
                title: issueEvent.object_attributes.title,
                assignee: issueEvent.assignee ? issueEvent.assignee.name : "",
                author: issueEvent.user.name,
                projectId: issueEvent.project.id!.toString(),
                createdAt: new Date(issueEvent.object_attributes.created_at),
                updatedAt: new Date(issueEvent.object_attributes.updated_at),
                description: issueEvent.object_attributes.description,
                // milestone: issueEvent.project..milestone!.title,
                state: issueEvent.object_attributes.state.toLowerCase() === 'open' ? IssueState.Open : IssueState.InProgress,
                url: issueEvent.object_attributes.url,
                labels: labelArr
            });

            resolve(issueInfo);
        });

    }

    static fromNoteEventToNote(event: NoteEvent): string {
        return `${event.user.name}: ${event.object_attributes.note} > ${event.object_attributes.url}`
    }
}
