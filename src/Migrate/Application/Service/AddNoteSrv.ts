import {IssueInfo} from "../../Domain/MigrateRecord/IssueInfo";
import {MigrateRepo} from "../../Domain/MigrateRecord/MigrateRepo";
import {RemoteIssueRepo} from "../../Domain/MigrateRecord/RemoteIssueRepo";
import {MigrateRecordFactory} from "../../DomainService/MigrateRecordFactory";

export class AddNoteSrv<TRANSLATE_FROM, TRANSLATE_TO> {
    private readonly migrateRepo: MigrateRepo;
    private toIssueRepo: RemoteIssueRepo
    ;

    constructor(toIssueRepo: RemoteIssueRepo, migrateRepo: MigrateRepo) {
        this.toIssueRepo = toIssueRepo;
        this.migrateRepo = migrateRepo;
    }

    async handle(fromIssue: IssueInfo, note: string) {
        let record = await this.migrateRepo.getRecord(fromIssue);
        if (!record) {
            record = MigrateRecordFactory.getMigrateRecord(fromIssue, this.migrateRepo);
            await record.migrate(fromIssue, this.toIssueRepo);
        }
        console.log(["before add note", record]);

        await this.toIssueRepo.addNote(record.toIssueId, note);
    }
}