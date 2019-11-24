import {MigrateRepo} from "../../Migrate/Domain/MigrateRecord/MigrateRepo";
import {IssueInfo} from "../../Migrate/Domain/MigrateRecord/IssueInfo";
import {MigrateRecord} from "../../Migrate/Domain/MigrateRecord/MigrateRecord";
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
        return this._directory + Path.sep + issueInfo.props.id!.id;
    }

    getRecord(fromIssue: IssueInfo): Promise<MigrateRecord> {
        return new Promise<MigrateRecord>((resolve, reject) => {
            fs.readFile(this.getFilePath(fromIssue), (err, data: Buffer) => {
                if (err) {
                    reject(err);
                }

                const obj: MigrateRecord = JSON.parse(data.toString());

                resolve(obj)
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
