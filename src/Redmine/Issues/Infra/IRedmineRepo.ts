import { RedmineIssue } from "../Domain/Issue";

export interface IRedmineRepo{
    addIssue(issue: RedmineIssue): void;
}