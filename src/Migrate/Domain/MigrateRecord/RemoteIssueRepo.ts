import {IssueId, IssueInfo} from "./IssueInfo";

export interface RemoteIssueRepo {
    addIssue(issue: IssueInfo): Promise<IssueId>;
    updateIssue(issue: IssueInfo): Promise<IssueId>;
    queryIssue(issue: IssueInfo): Promise<IssueInfo>;
    addNote(issueId: IssueId, note: string): Promise<void>;
}