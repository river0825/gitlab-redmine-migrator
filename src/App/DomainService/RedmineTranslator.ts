import {IssueId, IssueInfo} from "../../Migrate/Domain/MigrateRecord/IssueInfo";
import {IssueData, UploadRecord} from "node-redmine";

export class RedmineTranslator {

    fromIssueInfoToIssueData(info: IssueInfo): IssueData {
        return {
            issue: {
                // project_id: Number.parseInt(info.props.id!.id, 10),
                //tracker_id ? : number;
                //priority_id ? : number;
                //category_id ? : number;
                //status_id ? : number;
                //assigned_to_id ? : number;
                subject: info.props.title,
                description: info.props.description,
                //parent_issue_id ? : number;
                //notes ? : string;
                //uploads ? : UploadRecord[];
            }
        }

    }

    fromNoteToIssueData(issueId: IssueId, note: string): IssueData{
        return {
            issue: {
                notes: note,
            }
        }
    }
}

