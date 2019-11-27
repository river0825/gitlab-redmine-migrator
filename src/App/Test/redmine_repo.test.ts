import {RedmineRepo} from "../Infra/RedmineRepo";
import {IssueInfo, Issuer} from "../../Migrate/Domain/MigrateRecord/IssueInfo";

describe("redmine repo", () => {
    let issueId  = "0" ;
    test("Issue should be create correctly", async () => {
        const redmineRepo = new RedmineRepo();
        const result = await redmineRepo.addIssue(new IssueInfo({
            id: {id: "1", issuer: Issuer.Redmine},
            title: "this is a test title",
            assignee: "assignee is me",
            author: "author is river",
            createdAt: new Date(),
            updatedAt: new Date,
            description: "this is my description"
        }));

        issueId = result.id;
        console.log(result);
    });

    test("Issue should update note", async () => {
        const redmineRepo = new RedmineRepo();
        await redmineRepo.addNote({id: issueId, issuer: Issuer.Redmine},
            "this is a note from river");
    });


    test("Issue should update content", async () => {
        jest.setTimeout(30000);
        const redmineRepo = new RedmineRepo();
        const result = await redmineRepo.updateIssue(new IssueInfo({
            toIssueId: {id: "849143", issuer: Issuer.Redmine},
            id: {id: "0", issuer: Issuer.Redmine},
            title: "this is a test title",
            assignee: "assignee is me",
            author: "author is river",
            createdAt: new Date(),
            updatedAt: new Date,
            description: "this is my description"
        }));

        console.log(result);
    });
});