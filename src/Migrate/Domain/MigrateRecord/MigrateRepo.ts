import {IssueInfo} from "./IssueInfo";
import {MigrateRecord} from "./MigrateRecord";

export interface MigrateRepo{
    save(record: MigrateRecord): Promise<void>;
    getRecord(fromIssue: IssueInfo): Promise<MigrateRecord>;
}