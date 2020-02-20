import {IssueInfo} from "../Domain/MigrateRecord/IssueInfo";
import {MigrateRecord} from "../Domain/MigrateRecord/MigrateRecord";
import {MigrateRepo} from "../Domain/MigrateRecord/MigrateRepo";

export class MigrateRecordFactory {
    static createMigrateRecord(fromIssue: IssueInfo, migrateRepo: MigrateRepo) {
        return new MigrateRecord(
            {id: fromIssue.props.id!.id, issuer: fromIssue.props.id!.issuer},
            {
                fromIssueId: fromIssue.props.id,
                issueInfo: fromIssue
            },
            migrateRepo
        );
    }
}