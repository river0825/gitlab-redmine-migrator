import {IssueInfo} from "../../Domain/MigrateRecord/IssueInfo";
import {MigrateRepo} from "../../Domain/MigrateRecord/MigrateRepo";
import {RemoteIssueRepo} from "../../Domain/MigrateRecord/RemoteIssueRepo";
import {MigrateRecord} from "../../Domain/MigrateRecord/MigrateRecord";

export class AddNoteSrv {
    private readonly migrateRepo: MigrateRepo;
    private toIssueRepo: RemoteIssueRepo;

    constructor( toIssueRepo: RemoteIssueRepo, migrateRepo: MigrateRepo) {
        this.toIssueRepo = toIssueRepo;
        this.migrateRepo = migrateRepo;
    }

    async handle(fromIssue: IssueInfo, note:string) {
        let record = await this.migrateRepo.getRecord(fromIssue);
        if (!record) {

            const toIssueId = await this.toIssueRepo.addIssue(fromIssue);
            record = new MigrateRecord(
                {id: fromIssue.props.id!.id, issuer: fromIssue.props.id!.issuer},
                {
                    fromIssueId: fromIssue.props.id,
                    toIssueId,
                    issueInfo: fromIssue
                },
                this.migrateRepo
            );

            await this.migrateRepo.save(record);
        }else{
            await this.toIssueRepo.updateIssue(fromIssue);
        }
    }
}