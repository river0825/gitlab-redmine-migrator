import {IssueInfo} from "../../Domain/MigrateRecord/IssueInfo";
import {MigrateRepo} from "../../Domain/MigrateRecord/MigrateRepo";
import {RemoteIssueRepo} from "../../Domain/MigrateRecord/RemoteIssueRepo";
import {MigrateRecordFactory} from "../../DomainService/MigrateRecordFactory";
import {Translator} from "../../Domain/Translator/Translator";

export class MigrateIssueSrv {
    private migrateRepo: MigrateRepo;
    private toIssueRepo: RemoteIssueRepo;

    constructor(toIssueRepo: RemoteIssueRepo, migrateRepo: MigrateRepo) {
        this.toIssueRepo = toIssueRepo;
        this.migrateRepo = migrateRepo;
    }

    async handle(fromIssue: IssueInfo) {
        let record = await this.migrateRepo.getRecord(fromIssue);
        if (!record) {
            record = MigrateRecordFactory.getMigrateRecord(fromIssue, this.migrateRepo);
            record.migrate(fromIssue, this.toIssueRepo);
        } else {
            const fi = fromIssue.setToIssueId(record.toIssueId);
            record.migrate(fi, this.toIssueRepo);
        }
    }

    async handleWithTranslator<T, R>(payload: T, translator: Translator<T, R>) {
        const fromIssue: IssueInfo = await translator.toIssueInfo(payload);
        this.handle(fromIssue);
    }
}