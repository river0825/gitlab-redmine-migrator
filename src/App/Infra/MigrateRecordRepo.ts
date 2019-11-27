import {MigrateRepo} from "../../Migrate/Domain/MigrateRecord/MigrateRepo";
import {IssueInfo} from "../../Migrate/Domain/MigrateRecord/IssueInfo";
import {MigrateRecord, MigrateRecordProp} from "../../Migrate/Domain/MigrateRecord/MigrateRecord";
import * as fs from "fs";
import * as Path from "path";

export class MigrateRecordRepo implements MigrateRepo {
    get directory(): string {
        return this._directory;
    }

    private _directory: string;

    constructor(directory?: string) {
        if (directory) {
            this._directory = directory;
        } else {
            this._directory = process.cwd() + Path.sep + "data"
        }
        fs.mkdirSync(this._directory, {recursive: true})
    }

    private getFilePath(issueInfo: IssueInfo): string {
        return this._directory + Path.sep + issueInfo.props.id!.issuer + "_" + issueInfo.props.projectId! + "_" + issueInfo.props.id!.id + ".json";
    }

    getRecord(fromIssue: IssueInfo): Promise<MigrateRecord> {
        const self = this;
        return new Promise<MigrateRecord>((resolve, reject) => {
            if (!fs.existsSync(this.getFilePath(fromIssue))) {
                resolve(undefined);
                return;
            }

            fs.readFile(this.getFilePath(fromIssue), (err, data: Buffer) => {
                if (err) {
                    reject(err);
                    return;
                }

                if (!data) {
                    resolve(undefined);
                    return;
                }

                const obj = JSON.parse(data.toString());
                const props: MigrateRecordProp = {
                    issueInfo: obj._issueInfo,
                    fromIssueId: obj._fromIssueId,
                    toIssueId: obj._toIssueId
                };

                const record = new MigrateRecord(obj._id, props, self);
                resolve(record)
            })
        })
    }

    save(record: MigrateRecord): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            fs.writeFile(this.getFilePath(record.issueInfo), JSON.stringify(record), {}, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            })
        })
    }
}
