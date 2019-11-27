import {IssueInfo, Issuer} from "../Domain/MigrateRecord/IssueInfo";

describe("Issue Info. ToString", () => {
    test("issue info . tostring", async () => {
        const issueInfo = new IssueInfo({
            id: {id: "id", issuer: Issuer.Redmine},
            projectId: 100,
            projectName: "projectName"
        });

        expect(issueInfo.toString()).toBe(`${issueInfo.props.id}: ${issueInfo.props.title}`);
    });

});