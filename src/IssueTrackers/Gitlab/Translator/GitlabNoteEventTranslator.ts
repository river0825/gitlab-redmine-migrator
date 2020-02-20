import {Issue, NoteEvent} from "node-gitlab-webhook/interfaces";
import {IssueInfo, Issuer} from "../../../Migrate/Domain/MigrateRecord/IssueInfo";
import {Translator} from "../../../Migrate/Domain/Translator/Translator";

export class GitlabNoteEventTranslator implements Translator<NoteEvent, Issue> {
    toIssueInfo(payload: NoteEvent): Promise<IssueInfo> {
        return new Promise<IssueInfo>((resolve, reject) => {
            if (payload.issue) {
                const issueInfo = this.createIssueInfoWithIssue(payload);
                resolve(issueInfo);
            } else {
                reject("Only support on Comment on Issue ")
            }
        });
    }

    private createIssueInfoWithIssue(payload: NoteEvent) {
        return new IssueInfo({
            id: {id: payload.issue!.id!.toString(), issuer: Issuer.Gitlab},
            author: payload.user.name,
            projectId: payload.project.id!.toString(),
            createdAt: new Date(payload.object_attributes.created_at),
            updatedAt: new Date(payload.object_attributes.updated_at),
            url: payload.object_attributes.url
        });
    }

    fromIssueInfo(issueInfo: IssueInfo): Promise<Issue> {
        throw new Error("Method not implemented.");
    }

    fromNoteEventToNote(event: NoteEvent): string {
        let note = `by ${event.user.name}\n\n  ${event.object_attributes.url} \n\n ${event.object_attributes.note} \n\n`;

        if (event.commit) {
            note += `commit by [${event.commit.author}]: ${event.commit.url} \n\n ${event.commit.message}`
        }
        return note;
    }
}