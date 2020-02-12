import {IssueState} from "../../Migrate/Domain/MigrateRecord/IssueInfo";

export interface IssueInfoStatusMapper<T> {
    getStatus(payload: T): IssueState;
}