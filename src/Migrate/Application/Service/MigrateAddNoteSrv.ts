import {IssueInfo} from "../../Domain/MigrateRecord/IssueInfo";
import {MigrateRepo} from "../../Domain/MigrateRecord/MigrateRepo";
import {RemoteIssueRepo} from "../../Domain/MigrateRecord/RemoteIssueRepo";

export class MigrateAddNoteSrv {
    private readonly migrateRepo: MigrateRepo;
    private readonly toIssueRepo: RemoteIssueRepo;

    constructor(toIssueRepo: RemoteIssueRepo, migrateRepo: MigrateRepo) {
        this.toIssueRepo = toIssueRepo;
        this.migrateRepo = migrateRepo;
    }

    async handle(fromIssue: IssueInfo, note: string) {
        const record = await this.migrateRepo.getRecord(fromIssue);
        if (!record) {
            throw Error(`There is no record to comment. IssueId: ${fromIssue.props.id!.id}`)
        }
        console.log(["before add note", record]);

        await this.toIssueRepo.addNote(record.toIssueId, note);
    }
}