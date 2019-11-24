import {IssueId, IssueInfo, Issuer} from "./IssueInfo";
import {RemoteIssueRepo} from "./RemoteIssueRepo";
import {MigrateRepo} from "./MigrateRepo";

interface MigrateRecordProp {
    issueInfo: IssueInfo,
    fromIssueId?: IssueId,
    toIssueId?: IssueId
}

interface MigrateRecordId {
    id: string;
    issuer: Issuer;
}

export class MigrateRecord {
    get issueInfo(): IssueInfo {
        return this._issueInfo;
    }

    _id: MigrateRecordId;
    private _issueInfo: IssueInfo;
    _fromIssueId?: IssueId;
    _toIssueId?: IssueId;
    _migrateRepo: MigrateRepo;

    constructor(id: MigrateRecordId, props: MigrateRecordProp, migrateRepo: MigrateRepo) {
        this._id = id;
        this._issueInfo = props.issueInfo;
        this._fromIssueId = props.fromIssueId;
        this._toIssueId = props.toIssueId;
        this._migrateRepo = migrateRepo;
    }

    async migrate(from: IssueInfo, toRepo: RemoteIssueRepo): Promise<void> {
        if (this._toIssueId === undefined) {
            this._toIssueId = await toRepo.addIssue(from)
            await this._migrateRepo.save(this)
        } else {
            await toRepo.updateIssue(from);
        }
    }

}