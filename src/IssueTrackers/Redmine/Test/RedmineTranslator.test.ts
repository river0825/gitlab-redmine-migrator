import {RedmineTranslator} from "../Translator/RedmineTranslator";
import {IssueInfo, Issuer, IssueState} from "../../../Migrate/Domain/MigrateRecord/IssueInfo";
import {IssueData} from "node-redmine";

describe("Test for redmine translator", () => {
    const getIssueInfo = () => {
        return new IssueInfo({
            id: {id: 'issue id', issuer: Issuer.Gitlab},
            title: "this is title",
            assignee: "river",
            author: "james",
            projectId: '2001',
            projectName: "project name",
            createdAt: new Date("2019-01-01"),
            updatedAt: new Date('2019-02-01'),
            description: "description",
            milestone: "mile stone",
            state: IssueState.InProgress,
            url: "https://www.hinet.net",
            toIssueId: {id: "redmine issue id", issuer: Issuer.Redmine},
            labels: ["ALL", "THE", "LABELS"]
        });
    };

    test("translate from no mapping", async () => {
        const issueInfo = getIssueInfo();
        const translator = new RedmineTranslator();
        const issue: IssueData = await translator.fromIssueInfo(issueInfo);

        expect(issue.issue.project_id).toBeUndefined();
        expect(issue.issue.description).toEqual(issueInfo.props.description);
        expect(issue.issue.subject).toEqual(issueInfo.props.title);
        expect(issue.issue.status_id).toEqual(2);
    });


    test("translate from with mapping", async () => {
        const issueInfo = getIssueInfo();
        const projectMapper: Record<string, string> = {
            [issueInfo.props.projectId!]: "11",
            ["990"]: "9901",
        };

        const userMapper: Record<string, string> = {
            [issueInfo.props.assignee!]: '90001',
            [issueInfo.props.author!]: '90002'
        };

        const statusMap: Record<IssueState, number> = {
            [IssueState.Open]: 1, //redmine:New
            [IssueState.InProgress]: 2, //redmine:InProgress
            [IssueState.Resolved]: 3, //redmine:InProgress
            [IssueState.Close]: 5 //redmine: Closed
        };

        const translator = new RedmineTranslator(projectMapper, userMapper, statusMap);
        const issue: IssueData = await translator.fromIssueInfo(issueInfo);

        expect(issue.issue.project_id).toEqual(11);
        expect(issue.issue.assigned_to_id).toEqual(90001);
    });


    test("issue add note", async () => {
        const translator = new RedmineTranslator();
        const note = "this is note";
        const result = await translator.fromIssueIdToAddNote({id: "id", issuer: Issuer.Redmine}, note);

        expect(result.issue.notes).toEqual(note);
    })
});