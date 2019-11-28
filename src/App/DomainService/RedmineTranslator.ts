import {IssueId, IssueInfo, IssueState} from "../../Migrate/Domain/MigrateRecord/IssueInfo";
import {IssueData} from "node-redmine";

export class RedmineTranslator {

    statusMap: Record<IssueState, number> = {
        [IssueState.Open]: 1, //redmine:New
        [IssueState.InProgress]: 2, //redmine:InProgress
        [IssueState.Resolved]: 3, //redmine:InProgress
        [IssueState.Close]: 5 //redmine: Closed
    };

    fromIssueInfoToIssueData(info: IssueInfo): IssueData {
        return {
            issue: {
                // project_id: Number.parseInt(info.props.id!.id, 10),
                //tracker_id ? : number;
                //priority_id ? : number;
                //category_id ? : number;
                status_id: info.props.state ? this.statusMap[info.props.state!] : 1,
                //assigned_to_id ? : number;
                subject: info.props.title,
                description: info.props.description
                //parent_issue_id ? : number;
                //notes ? : string;
                //uploads ? : UploadRecord[];
            }
        }

    }

    fromNoteToIssueData(issueId: IssueId, note: string): IssueData {
        return {
            issue: {
                notes: note,
            }
        }
    }
}

