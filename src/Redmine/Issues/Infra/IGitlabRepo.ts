import { GitlabIssue } from "../Domain/Issue";

export interface IIssueQuery{
    label: string[];
}

export interface IGitlabRepo
{
    /**
     * list issues from Repo
     * @param query 
     * @param arg1 
     */
    issues(query: IIssueQuery, arg1: (issue: GitlabIssue) => void): void;
}
