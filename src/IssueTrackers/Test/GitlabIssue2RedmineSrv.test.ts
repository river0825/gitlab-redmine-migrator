import {GitlabIssue2RedmineSrv} from "../Application/Service/GitlabIssue2RedmineSrv";
import {IssueEvent} from "node-gitlab-webhook/interfaces";
import * as fs from "fs";
import {Gitlab2Redmine} from "../DomainService/Gitlab2Redmine";

describe("Test GitlabIssue2Redmine Service", () => {


    test("Issue should be create correctly", async () => {
        const mockGitlab2Redmine = jest.genMockFromModule("../DomainService/Gitlab2Redmine") as Gitlab2Redmine;
        mockGitlab2Redmine.migrateGitlabIssue2Redmine = jest.fn().mockResolvedValue(undefined);

        const str = fs.readFileSync("./tests/curl-data/issue.json", {encoding: "utf8", flag: ''});
        const payloadExt = JSON.parse(str) as IssueEvent;

        const event = {
            event: "string",
            payload: payloadExt,
            protocol: "string",
            host: "string",
            url: "string",
            path: "string",
        };

        /**
         *
         */
        await GitlabIssue2RedmineSrv.handle(event,
            {
                Gitlab2Redmine: mockGitlab2Redmine
            }
        );


        expect(mockGitlab2Redmine.migrateGitlabIssue2Redmine).toBeCalled();
    });
});