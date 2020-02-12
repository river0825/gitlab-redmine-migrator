import {MigrateRecord, MigrateRecordProp} from "../Domain/MigrateRecord/MigrateRecord";
import {IssueInfo, Issuer, IssueState} from "../Domain/MigrateRecord/IssueInfo";

describe("Migrate Record", () => {

    const prepareProps = (): MigrateRecordProp => {
        return {
            issueInfo: new IssueInfo({
                id: {id: "1301", issuer: Issuer.Gitlab},
                projectId: 5,
                updatedAt: new Date("2015-05-17T17:06:40.000Z"),
                title: "test",
                author: "Administrator",
                createdAt: new Date("2015-04-12T14:53:17.000Z"),
                description: "test",
                state: IssueState.InProgress,
                url: "http://example.com/gitlab-org/gitlab-test/issues/17#note_1241"
            }),
            fromIssueId: {id: "1301", issuer: Issuer.Gitlab},
            toIssueId: {id: "1301", issuer: Issuer.Redmine}
        };
    };

    const migrateRepo = () => {
        return {
            save: jest.fn().mockResolvedValue(undefined),
            getRecord: jest.fn().mockResolvedValue(undefined)
        }
    };

    const remoteIssueRepo = () => {
        return {
            addIssue: jest.fn().mockResolvedValue(undefined),
            updateIssue: jest.fn().mockResolvedValue(undefined),
            queryIssue: jest.fn().mockResolvedValue(undefined),
            addNote: jest.fn().mockResolvedValue(undefined)
        }
    };

    test("migrate add", async () => {
        const props: MigrateRecordProp = prepareProps();
        props.toIssueId = undefined;

        const mRepo = migrateRepo();
        const rmRepo = remoteIssueRepo();

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
        const props: MigrateRecordProp = prepareProps();
        const mRepo = migrateRepo();
        const rmRepo = remoteIssueRepo();

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