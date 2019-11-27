import {IssueInfo, Issuer, IssueState} from "../../Migrate/Domain/MigrateRecord/IssueInfo";
import {IssueEvent, NoteEvent} from "node-gitlab-webhook/interfaces";

export class GitlabTranslator {
    static fromIssueEvent(issueEvent: IssueEvent): IssueInfo {
        return new IssueInfo({
            id: {id: issueEvent.object_attributes.id.toString(), issuer: Issuer.Gitlab},
            title: issueEvent.object_attributes.title,
            assignee: issueEvent.assignee.name,
            author: issueEvent.user.name,
            projectId: issueEvent.project.id,
            createdAt: new Date(issueEvent.object_attributes.created_at),
            updatedAt: new Date(issueEvent.object_attributes.updated_at),
            description: issueEvent.object_attributes.description,
            // milestone: issueEvent.project..milestone!.title,
            state: issueEvent.object_attributes.state.toLowerCase() === 'open' ? IssueState.Open : IssueState.InProgress,
            url: issueEvent.object_attributes.url,

        });
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