import { GitlabIssue } from "../Issues/Domain/Issue";
import { GitlabIssueWebHookMsg } from "./Message/GitlabIssueWebHookMsg";
import * as gitlab from "../../../node_modules/gitlab"

export class MigrateIssueService{
    public migrateRedmineIssueToGitlab()
    {

    }

    public receiveGitlabIssueWebhook(gitlabIssue: GitlabIssueWebHookMsg){
        //save local db
        //transform
        //save to redmine    
    }
}