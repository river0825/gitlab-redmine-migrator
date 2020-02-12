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


describe("redmine repo with another user", () => {
    let issueId = "0";
    test("Issue should be create correctly", async () => {
        const redmineRepo = new RedmineRepo("5483a35ebc7b278c0aadd602f27a56433a78f9a8");
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
        const redmineRepo = new RedmineRepo("5483a35ebc7b278c0aadd602f27a56433a78f9a8");
        await redmineRepo.addNote({id: issueId, issuer: Issuer.Redmine},
            "this is a note from river");
    });


    test("Issue should update content", async () => {
        jest.setTimeout(30000);
        const redmineRepo = new RedmineRepo("5483a35ebc7b278c0aadd602f27a56433a78f9a8");
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