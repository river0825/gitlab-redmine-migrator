import {IssueId, IssueInfo, Issuer} from "./IssueInfo";
import {RemoteIssueRepo} from "./RemoteIssueRepo";
import {MigrateRepo} from "./MigrateRepo";

export interface MigrateRecordProp {
    issueInfo: IssueInfo,
    fromIssueId?: IssueId,
    toIssueId?: IssueId
}

export interface MigrateRecordId {
    id: string;
    issuer: Issuer;
}

export class MigrateRecord {
    get toIssueId(): IssueId {
        return this._toIssueId!;
    }
    get issueInfo(): IssueInfo {
        return this._issueInfo;
    }

    _id: MigrateRecordId;
    _issueInfo: IssueInfo;
    _fromIssueId?: IssueId;
    private _toIssueId?: IssueId;
    _migrateRepo: MigrateRepo;

    constructor(id: MigrateRecordId, props: MigrateRecordProp, migrateRepo: MigrateRepo) {
        this._id = id;
        this._issueInfo = props.issueInfo;
        this._fromIssueId = props.fromIssueId;
        this._toIssueId = props.toIssueId;
        this._migrateRepo = migrateRepo;
    }

    async migrate(from: IssueInfo, toRepo: RemoteIssueRepo): Promise<void> {
        if (this._toIssueId !== undefined) {
            console.log({from});
            this._issueInfo = from;
            await toRepo.updateIssue(from);
            await this._migrateRepo.save(this);
        } else {
            console.log(["create redmine issue", from]);
            this._toIssueId = await toRepo.addIssue(from);
            await this._migrateRepo.save(this)
        }
    }
}