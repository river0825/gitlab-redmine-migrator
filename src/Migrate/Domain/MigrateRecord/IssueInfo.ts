import {ValueObject} from "ts-ddd-common";

export enum Issuer {
    Gitlab,
    Redmine
}

export interface IssueId {
   id: string;
   issuer: Issuer;
}

export enum IssueState {
    Open,
    Close,
    InProgress
}

export interface IssueInfoProp {
    id?: IssueId;
    title?: string;
    assignee?: string;
    author?: string;
    projectId?: number;
    createdAt?: Date;
    updatedAt?: Date;
    description?: string;
    milestone?: string;
    state?: IssueState;
    url?: string;
    toIssueId?: IssueId;
}

export class IssueInfo extends ValueObject<IssueInfoProp> {
    toString(): string{
        return `${this.props.id}: ${this.props.title}`
    }
}