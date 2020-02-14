import {Issue, IssueData} from "node-redmine";
import {Translator} from "../../../Migrate/Domain/Translator/Translator";
import {IssueId, IssueInfo, IssueState} from "../../../Migrate/Domain/MigrateRecord/IssueInfo";

export class RedmineTranslator implements Translator<Issue, IssueData> {

    statusMap: Record<IssueState, number> = {
        [IssueState.Open]: 1, //redmine:New
        [IssueState.InProgress]: 2, //redmine:InProgress
        [IssueState.Resolved]: 3, //redmine:InProgress
        [IssueState.Close]: 5 //redmine: Closed
    };
    projectMap: Record<string, string> = {
        ['0']: '0'
    };

    userMap: Record<string, string> = {
        ['0']: '0'
    };


    constructor(projectMap?: Record<string, string>, userMap?: Record<string, string>, statusMap?: Record<IssueState, number>) {
        this.projectMap = projectMap || this.projectMap;
        this.userMap = userMap || this.userMap;
        this.statusMap = statusMap || this.statusMap;
    }

    fromIssueIdToAddNote(issueId: IssueId, note: string): Promise<IssueData> {
        return new Promise<IssueData>((resolve) => {
            const issue: IssueData = {
                issue: {
                    notes: note
                }
            };

            resolve(issue);
        });
    }

    fromIssueInfo(issueInfo: IssueInfo): Promise<IssueData> {
        return new Promise<IssueData>((resolve) => {
            const issue: IssueData = {
                issue: {
                    project_id: issueInfo.props.projectId ? (Number(this.projectMap[issueInfo.props.projectId])) || undefined : undefined,
                    //tracker_id ? : number;
                    //priority_id ? : number;
                    //category_id ? : number;
                    status_id: issueInfo.props.state ? this.statusMap[issueInfo.props.state!] : 1,
                    assigned_to_id: issueInfo.props.assignee ? Number(this.userMap[issueInfo.props.assignee]) || undefined : undefined,
                    subject: issueInfo.props.title,
                    description: issueInfo.props.description,
                    //parent_issue_id ? : number;
                    // notes: note
                    //uploads ? : UploadRecord[];
                }
            };

            resolve(issue);
        });
    }

    toIssueInfo(payload: Issue): Promise<IssueInfo> {
        return new Promise<IssueInfo>((_, reject) => {
            reject("not implement yet");
        })
    }
}

