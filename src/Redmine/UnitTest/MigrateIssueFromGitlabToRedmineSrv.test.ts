import { Substitute, Arg } from '@fluffy-spoon/substitute';
import { IRedmineRepo } from '../Issues/Infra/IRedmineRepo';
import { GitlabIssue, RedmineIssue } from '../Issues/Domain/Issue';
import { IGitlabRepo, IIssueQuery } from '../Issues/Infra/IGitlabRepo';
import {MigrateIssueFromGitlabToRedmineSrv} from "../Application/MigrateIssueFromGitlabToRedmineSrv";

describe('handle', () => {
    it('not dry-run', () => {

        const fakeGitlabRepo: IGitlabRepo = {
            issues : jest.fn()
        };

        const fakeRedmineRepo: IRedmineRepo = {
            addIssue: jest.fn()
        };

        callHandle(false, fakeGitlabRepo, fakeRedmineRepo);

        expect(fakeGitlabRepo.issues).toHaveBeenCalledTimes(1);

    });

    it('not dry-run with redmine callback', () => {
        class FGitlab implements IGitlabRepo {
            issues(query: IIssueQuery, issueFound: (issue: GitlabIssue) => void): void {
                const issue : GitlabIssue = {
                    assignee: {name:"river"},
                    description: "this is description"
                }
                issueFound(issue);
            }
        }

        const fakeGitlabRepo = new FGitlab();
        const fakeRedmineRepo = {
            addIssue: jest.fn()
        }

        callHandle(false, fakeGitlabRepo, fakeRedmineRepo);
        expect( fakeRedmineRepo.addIssue).toHaveBeenCalledTimes(1);
    });
    
    it('not dry-run with transfer Issue', () => {
        const gitlabeIssue: GitlabIssue = {
            description: "this is description",
            title: "this is titile",
            webUrl: "https://gitlab.com.tw/project/issue/210",
            assignee: {name: "river"}
        }

        class FGitlab implements IGitlabRepo {
            issues(query: IIssueQuery, issueFound: (issue: GitlabIssue) => void): void {
                issueFound(gitlabeIssue);
            }
        }

        const fakeGitlabRepo = new FGitlab();
        const fakeRedmineRepo = {
            addIssue: jest.fn()
        }

        callHandle(false, fakeGitlabRepo, fakeRedmineRepo);

        expect(fakeRedmineRepo.addIssue).toBeCalledWith(
            expect.objectContaining({
                description: gitlabeIssue.description,
                subject: gitlabeIssue.title
            })
        )
    });

    it('dry-run',  () => {
        const fakeGitlabRepo = {
            issues: jest.fn()
        };

        const fakeRedmineRepo = {
            addIssue: jest.fn()
        };

        callHandle(true, fakeGitlabRepo, fakeRedmineRepo);

        expect(fakeGitlabRepo.issues).toHaveBeenCalledTimes(1);
        expect(fakeRedmineRepo.addIssue).toHaveBeenCalledTimes(0);
    }); 

  });



function callHandle(isDryRun: boolean, fakeGitlabRepo: IGitlabRepo, fakeRedmineRepo: IRedmineRepo) {
    const srv = new MigrateIssueFromGitlabToRedmineSrv();
    srv.handle({
        isDryRun,
        gitlabRepo: fakeGitlabRepo,
        redmineRepo: fakeRedmineRepo
    });
}

