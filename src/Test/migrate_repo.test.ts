import {IssueInfo, Issuer} from "../Migrate/Domain/MigrateRecord/IssueInfo";
import {MigrateRecordRepo} from "../App/Infra/MigrateRecordRepo";
import {MigrateRecord} from "../Migrate/Domain/MigrateRecord/MigrateRecord";

describe("migrate repo", () => {
    test("Issue should be create correctly", async () => {
        const mRepo = new MigrateRecordRepo();
        mRepo.save(new MigrateRecord({id: '001', issuer: Issuer.Gitlab},
            {
                issueInfo: new IssueInfo({
                    id: {id: "001", issuer: Issuer.Gitlab},
                    title: "the subject",
                    description: "the desc"
                })
            },
            mRepo
        ));
    });

    test("Issue should update note", async () => {
        // jest.setTimeout(30000);
        // const redmineRepo = new RedmineRepo();
        // await redmineRepo.addNote({id: issueId, issuer: Issuer.Redmine},
        //     "this is a note from river");
    });
});