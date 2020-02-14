import {MigrateRecordProp} from "../Domain/MigrateRecord/MigrateRecord";
import {IssueInfo, Issuer, IssueState} from "../Domain/MigrateRecord/IssueInfo";
import {RemoteIssueRepo} from "../Domain/MigrateRecord/RemoteIssueRepo";
// import {Issue, IssueData} from "node-redmine";

const prepareProps = (): MigrateRecordProp => {
    return {
        issueInfo: new IssueInfo({
            id: {id: "1301", issuer: Issuer.Gitlab},
            projectId: '5',
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

const remoteIssueRepo = (): RemoteIssueRepo<IssueInfo, IssueState> => {
    return {
        addIssue: jest.fn().mockResolvedValue(undefined),
        updateIssue: jest.fn().mockResolvedValue(undefined),
        queryIssue: jest.fn().mockResolvedValue(undefined),
        addNote: jest.fn().mockResolvedValue(undefined)
    }
};

export {prepareProps, migrateRepo, remoteIssueRepo};