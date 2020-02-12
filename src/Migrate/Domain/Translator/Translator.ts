import {MigrateRecord} from "../MigrateRecord/MigrateRecord";
import {IssueInfo} from "../MigrateRecord/IssueInfo";


export interface Translator<T, R> {
    toIssueInfo(payload: T, migrateRecord?: MigrateRecord): Promise<IssueInfo>;

    fromIssueInfo(issueInfo: IssueInfo, migrateRecord: MigrateRecord): Promise<R>;
}