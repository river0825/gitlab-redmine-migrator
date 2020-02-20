import {IssueEvent} from "node-gitlab-webhook/interfaces";
import {IssueInfo, Issuer, IssueState} from "../../../Migrate/Domain/MigrateRecord/IssueInfo";
import {GitlabIssueEvnetTranslator} from "../Translator/GitlabIssueEvnetTranslator";

describe("gitlab translator", () => {
    const getEvent = (): IssueEvent => {
        return JSON.parse(`{
      "object_kind": "issue",
      "user": {
        "name": "Administrator",
        "username": "root",
        "avatar_url": "http://www.gravatar.com/avatar/e64c7d89f26bd1972efa854d13d7dd61?s=40\u0026d=identicon"
      },
      "project": {
        "id": 1,
        "name":"Gitlab Test",
        "description":"Aut reprehenderit ut est.",
        "web_url":"http://example.com/gitlabhq/gitlab-test",
        "avatar_url":null,
        "git_ssh_url":"git@example.com:gitlabhq/gitlab-test.git",
        "git_http_url":"http://example.com/gitlabhq/gitlab-test.git",
        "namespace":"GitlabHQ",
        "visibility_level":20,
        "path_with_namespace":"gitlabhq/gitlab-test",
        "default_branch":"master",
        "homepage":"http://example.com/gitlabhq/gitlab-test",
        "url":"http://example.com/gitlabhq/gitlab-test.git",
        "ssh_url":"git@example.com:gitlabhq/gitlab-test.git",
        "http_url":"http://example.com/gitlabhq/gitlab-test.git"
      },
      "repository": {
        "name": "Gitlab Test",
        "url": "http://example.com/gitlabhq/gitlab-test.git",
        "description": "Aut reprehenderit ut est.",
        "homepage": "http://example.com/gitlabhq/gitlab-test"
      },
      "object_attributes": {
        "id": 301,
        "title": "aaaa  :wNew API: create/update/delete file",
        "assignee_ids": [51],
        "assignee_id": 51,
        "author_id": 51,
        "project_id": 14,
        "created_at": "2013-12-03T17:15:43Z",
        "updated_at": "2013-12-03T17:15:43Z",
        "position": 0,
        "branch_name": null,
        "description": "Create new API for manipulations with repository",
        "milestone_id": null,
        "state": "opened",
        "iid": 23,
        "url": "http://example.com/diaspora/issues/23",
        "action": "open"
      },
      "assignees": [{
        "name": "User1",
        "username": "user1",
        "avatar_url": "http://www.gravatar.com/avatar/e64c7d89f26bd1972efa854d13d7dd61?s=40\u0026d=identicon"
      }],
      "assignee": {
        "name": "User1",
        "username": "user1",
        "avatar_url": "http://www.gravatar.com/avatar/e64c7d89f26bd1972efa854d13d7dd61?s=40\u0026d=identicon"
      },
      "labels": [{
        "id": 206,
        "title": "API",
        "color": "#ffffff",
        "project_id": 14,
        "created_at": "2013-12-03T17:15:43Z",
        "updated_at": "2013-12-03T17:15:43Z",
        "template": false,
        "description": "API related issues",
        "type": "ProjectLabel",
        "group_id": 41
      }],
      "changes": {
        "updated_by_id": {
          "previous": null,
          "current": 1
        },
        "updated_at": {
          "previous": "2017-09-15 16:50:55 UTC",
          "current": "2017-09-15 16:52:00 UTC"
        },
        "labels": {
          "previous": [{
            "id": 206,
            "title": "API",
            "color": "#ffffff",
            "project_id": 14,
            "created_at": "2013-12-03T17:15:43Z",
            "updated_at": "2013-12-03T17:15:43Z",
            "template": false,
            "description": "API related issues",
            "type": "ProjectLabel",
            "group_id": 41
          }],
          "current": [{
            "id": 205,
            "title": "Platform",
            "color": "#123123",
            "project_id": 14,
            "created_at": "2013-12-03T17:15:43Z",
            "updated_at": "2013-12-03T17:15:43Z",
            "template": false,
            "description": "Platform related issues",
            "type": "ProjectLabel",
            "group_id": 41
          }]
        }
      }
    }
    `) as IssueEvent;
    };

    test("test issue map", async () => {
        const translator = new GitlabIssueEvnetTranslator();
        const event: IssueEvent = getEvent();

        const issueInfo = await translator.toIssueInfo(event);

        expect(issueInfo).toStrictEqual(new IssueInfo(
            {
                id: {id: '301', issuer: Issuer.Gitlab},
                title: 'aaaa  :wNew API: create/update/delete file',
                assignee: 'User1',
                author: 'Administrator',
                projectId: '1',
                createdAt: new Date('2013-12-03T17:15:43.000Z'),
                updatedAt: new Date('2013-12-03T17:15:43.000Z'),
                description: 'Create new API for manipulations with repository',
                state: IssueState.InProgress,
                url: 'http://example.com/diaspora/issues/23',
                labels: ['API']
            }
        ));


        console.log(issueInfo);
    })
});