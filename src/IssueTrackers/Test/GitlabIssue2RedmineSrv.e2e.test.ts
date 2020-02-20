import {GitlabIssue2RedmineSrv} from "../Application/Service/GitlabIssue2RedmineSrv";
import {IssueEvent, NoteEvent} from "node-gitlab-webhook/interfaces";
import * as fs from "fs";
import {GitlabAddNote2RedmineSrv} from "../Application/Service/GitlabAddNote2RedmineSrv";

describe("Test GitlabIssue2Redmine Service", () => {
    test("Issue should be create correctly", async () => {
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
        await GitlabIssue2RedmineSrv.handle(event);
    });

    test("Comment shoule add correctly", async () => {
        const str = fs.readFileSync("./tests/curl-data/note-issue.json", {encoding: "utf8", flag: ''});
        const payloadExt = JSON.parse(str) as NoteEvent;

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
        await GitlabAddNote2RedmineSrv.handle(event);
    });
});