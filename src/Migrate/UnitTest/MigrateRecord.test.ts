import {MigrateRecord, MigrateRecordProp} from "../Domain/MigrateRecord/MigrateRecord";
import * as mocks from "./Mocks";

describe("Migrate Record", () => {
    test("migrate add", async () => {
        const props: MigrateRecordProp = mocks.prepareProps();
        props.toIssueId = undefined;

        const mRepo = mocks.migrateRepo();
        const rmRepo = mocks.remoteIssueRepo();

        const record = new MigrateRecord(props.fromIssueId!, props, mRepo);

        /**
         * toIssueId is null,
         * so remoteIssueRepo.updaetIssue should be called
         */
        await record.migrate(props.issueInfo, rmRepo);

        expect(rmRepo.addIssue).toBeCalled();
        expect(rmRepo.updateIssue).not.toBeCalled();
        expect(rmRepo.queryIssue).not.toBeCalled();
        expect(mRepo.save).toBeCalled();
    });

    test("migrate update", async () => {
        const props: MigrateRecordProp = mocks.prepareProps();
        const mRepo = mocks.migrateRepo();
        const rmRepo = mocks.remoteIssueRepo();

        const record = new MigrateRecord(props.fromIssueId!, props, mRepo);

        /**
         * toIssueId is not null, consider it has been generated
         * so remoteIssueRepo.updaetIssue should be called
         */
        await record.migrate(props.issueInfo, rmRepo);

        expect(rmRepo.updateIssue).toBeCalled();
        expect(mRepo.save).toBeCalled();
    })
});