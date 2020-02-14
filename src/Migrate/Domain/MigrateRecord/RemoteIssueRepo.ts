import {IssueId, IssueInfo} from "./IssueInfo";

export interface RemoteIssueRepo<TRANSLATE_FROM, TRANSLATE_TO> {
    // setTranslator(translator: Translator<TRANSLATE_FROM, TRANSLATE_TO>):void;
    addIssue(issue: IssueInfo): Promise<IssueId>;
    updateIssue(issue: IssueInfo): Promise<IssueId>;
    queryIssue(issue: IssueInfo): Promise<IssueInfo>;
    addNote(issueId: IssueId, note: string): Promise<void>;
}