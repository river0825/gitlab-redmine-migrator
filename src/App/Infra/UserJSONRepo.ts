import {UserRepo} from "../../Users/Domain/UserRepo";
import {User} from "../../Users/Domain/User";
import * as fs from "fs";
import * as Path from "path";

export class UserJSONRepo implements UserRepo {
    private _directory: string;

    constructor(directory?: string) {
        if (directory) {
            this._directory = directory;
        } else {
            this._directory = process.cwd() + Path.sep + "data"
        }
        if (!fs.existsSync(this._directory)) {
            fs.mkdirSync(this._directory, {recursive: true})
        }
    }

    private getFilePath(userId: string): string {
        return this._directory + Path.sep + userId + "_map.json";
    }

    get(user: User): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            if (!fs.existsSync(this.getFilePath(user.GitlabUserId))) {
                resolve(undefined);
                return;
            }

            fs.readFile(this.getFilePath(user.GitlabUserId), (err, data: Buffer) => {
                if (err) {
                    reject(err);
                    return;
                }

                if (!data) {
                    resolve(undefined);
                    return;
                }

                resolve(JSON.parse(data.toString()));
            })
        });
    }

    save(record: User): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            fs.writeFile(this.getFilePath(record.GitlabUserId), JSON.stringify(record), {}, (err) => {
                if (err) {
                    reject(err);
                }

                resolve();
            })
        })
    }
}