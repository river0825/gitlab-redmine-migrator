import {IssueId, IssueInfo, Issuer} from "../../Migrate/Domain/MigrateRecord/IssueInfo";
import {MigrateRecordRepo} from "../Infra/MigrateRecordRepo";
import {MigrateRecord} from "../../Migrate/Domain/MigrateRecord/MigrateRecord";

describe("migrate repo", () => {
    test("Issue should be create correctly", async () => {
        const mRepo = new MigrateRecordRepo();
        const issueInfo = new IssueInfo({
            id: {id: "001", issuer: Issuer.Gitlab},
            title: "the subject",
            description: "the desc"
        });

        await mRepo.save(new MigrateRecord({id: '001', issuer: Issuer.Gitlab},
            {
                issueInfo
            },
            mRepo
        ));

        const mr = await mRepo.getRecord(issueInfo);
        expect(mr.issueInfo.props.id).toStrictEqual(issueInfo.props.id as IssueId);
        expect(mr.issueInfo.props.title).toBe(issueInfo.props.title);
        expect(mr.issueInfo.props.description).toBe(issueInfo.props.description);


        /**
         * update data to check if all the data saved
         */
        const issueInfo2 = new IssueInfo({
            id: {id: "001", issuer: Issuer.Gitlab},
            title: "the new subject",
            description: "the new desc"
        });

        await mRepo.save(new MigrateRecord({id: '001', issuer: Issuer.Gitlab},
            {
                issueInfo: issueInfo2
            },
            mRepo
        ));

        const mr2 = await mRepo.getRecord(issueInfo);
        expect(mr2.issueInfo.props.title).not.toBe(issueInfo.props.title);
        expect(mr2.issueInfo.props.description).not.toBe(issueInfo.props.description);

        expect(mr2.issueInfo.props.id).toStrictEqual(issueInfo2.props.id as IssueId);
        expect(mr2.issueInfo.props.title).toBe(issueInfo2.props.title);
        expect(mr2.issueInfo.props.description).toBe(issueInfo2.props.description);
    });
});