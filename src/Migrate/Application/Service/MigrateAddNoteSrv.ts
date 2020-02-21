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

    handle(fromIssue: IssueInfo, note: string): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            const record = await this.migrateRepo.getRecord(fromIssue);
            if (!record) {
                reject(`There is no record to comment. IssueId: ${fromIssue.props.id!.id}`)
            }
            await this.toIssueRepo.addNote(record.toIssueId, note);
            resolve();
        })

    }
}