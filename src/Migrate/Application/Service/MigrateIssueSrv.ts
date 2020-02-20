import {IssueInfo} from "../../Domain/MigrateRecord/IssueInfo";
import {MigrateRepo} from "../../Domain/MigrateRecord/MigrateRepo";
import {RemoteIssueRepo} from "../../Domain/MigrateRecord/RemoteIssueRepo";
import {MigrateRecordFactory} from "../../DomainService/MigrateRecordFactory";

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
            record = MigrateRecordFactory.createMigrateRecord(fromIssue, this.migrateRepo);
            await record.migrate(fromIssue, this.toIssueRepo);
        } else {
            const fi = fromIssue.setToIssueId(record.toIssueId);
            await record.migrate(fi, this.toIssueRepo);
        }
    }

    /**
     * @deprecated use Gitlab2Redmine.migrateGitlabIssue2Redmine instead
     * @param payload
     * @param translator
     */
    // async handleWithTranslator<TRANSLATE_FROM, TRANSLATE_TO>(payload: TRANSLATE_FROM, translator: Translator<TRANSLATE_FROM, TRANSLATE_TO>) {
    //     const fromIssue: IssueInfo = await translator.toIssueInfo(payload);
    //     await this.handle(fromIssue);
    // }
}