import {User} from "../Domain/User";

export class AddUserSpec {
    static check(user: User) {
        const error = [];
        if (!user.GitlabUserId) error.push("GitlabUserId can't be null");
        if (!user.GitlabUserEmail) error.push("GitlabUserEmail can't be null");
        if (!user.RedmineToken) error.push("RedmineToken can't be null");
        if (!user.RedmineUserId) error.push("RedmineUserId can't be null");

        if (error.length !== 0) {
            throw new Error(JSON.stringify(error));
        }
    }
}