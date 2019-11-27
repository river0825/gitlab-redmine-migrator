import {ValueObject} from "ts-ddd-common";

export enum Issuer {
    Gitlab = 'gitlab',
    Redmine = 'redmine'
}

export interface IssueId {
   id: string;
   issuer: Issuer;
}

export enum IssueState {
    Open = 'O',
    Close = 'C',
    InProgress = 'I'
}

export type IssueStateString = 'O' | 'C' | 'I';

export interface IssueInfoProp {
    id?: IssueId;
    title?: string;
    assignee?: string;
    author?: string;
    projectId?: number;
    projectName?: string;
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

    setToIssueId(issueId: IssueId): IssueInfo {
        return new IssueInfo({...this.props, toIssueId: issueId})
    }
}