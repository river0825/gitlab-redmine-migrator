import {IssueInfo} from "../MigrateRecord/IssueInfo";

export interface Translator<TRANSLATE_FROM, TRANSLATE_TO> {
    toIssueInfo(payload: TRANSLATE_FROM): Promise<IssueInfo>;
    fromIssueInfo(issueInfo: IssueInfo): Promise<TRANSLATE_TO>;
}