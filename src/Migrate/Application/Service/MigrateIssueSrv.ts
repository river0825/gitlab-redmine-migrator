import {IssueInfo, Issuer} from "../../Domain/MigrateRecord/IssueInfo";
import {MigrateRepo} from "../../Domain/MigrateRecord/MigrateRepo";
import {RemoteIssueRepo} from "../../Domain/MigrateRecord/RemoteIssueRepo";
import {MigrateRecord} from "../../Domain/MigrateRecord/MigrateRecord";

export class MigrateIssueSrv {
    private migrateRepo: MigrateRepo;
    private toIssueRepo: RemoteIssueRepo;

    constructor( toIssueRepo: RemoteIssueRepo, migrateRepo: MigrateRepo) {
        this.toIssueRepo = toIssueRepo;
        this.migrateRepo = migrateRepo;
    }

    async handle(fromIssue: IssueInfo) {
        let record = await this.migrateRepo.getRecord(fromIssue);
        if (!record) {
            record = new MigrateRecord(
                {id: fromIssue.props.id!.id, issuer: fromIssue.props.id!.issuer},
                {
                    fromIssueId: fromIssue.props.id,
                    issueInfo: fromIssue
                },
                this.migrateRepo
            );
        }


        record.migrate(fromIssue, this.toIssueRepo);
    }
}