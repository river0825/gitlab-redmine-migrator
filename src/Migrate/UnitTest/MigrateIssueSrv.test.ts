import {IssueInfo, Issuer} from "../Domain/MigrateRecord/IssueInfo";

describe("Test of MigrateIssueSrv", () => {
    test("issue info . tostring", async () => {


        // const srv = new MigrateIssueSrv<Issue, IssueData>(mocks.remoteIssueRepo(), mocks.migrateRepo());

        const issueInfo = new IssueInfo({
            id: {id: "id", issuer: Issuer.Redmine},
            projectId: '100',
            projectName: "projectName"
        });

        expect(issueInfo.toString()).toBe(`${issueInfo.props.id}: ${issueInfo.props.title}`);
    });

});