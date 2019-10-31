import {GitlabIssue, RedmineIssue} from "../Issues/Domain/Issue";
import {IRedmineRepo} from "../Issues/Infra/IRedmineRepo";
import {IGitlabRepo} from "../Issues/Infra/IGitlabRepo";

export interface MigrageIssueFromGitlabtoRedmineMsg{
    isDryRun: boolean;
    redmineRepo: IRedmineRepo;
    gitlabRepo: IGitlabRepo;
}

export class MigrateIssueFromGitlabToRedmineSrv {
    handle(message: MigrageIssueFromGitlabtoRedmineMsg){
        message.gitlabRepo.issues({label:['flow/Sprint Backlog', 'flow/開發中', 'flow/開發完成', 'flow/測試中', 'flow/DONE']},
            (issue: GitlabIssue) => {
            console.log(message);
                if(!message.isDryRun) {
                    message.redmineRepo.addIssue(MigrateIssueFromGitlabToRedmineSrv.transformGitlabIssueToRedmineIssue(issue));
                }
            }
        )
    }

    private static transformGitlabIssueToRedmineIssue(gitIssue: GitlabIssue): RedmineIssue
    {
        return {
            description: gitIssue.description,
            subject: gitIssue.title,
        };
    }

}
