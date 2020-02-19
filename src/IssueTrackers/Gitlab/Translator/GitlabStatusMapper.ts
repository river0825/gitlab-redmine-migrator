// import {IssueInfoStatusMapper} from "../IssueInfoStatusMapper";
// import {IssueState} from "../../../Migrate/Domain/MigrateRecord/IssueInfo";
// import {IssueEvent} from "node-gitlab-webhook/interfaces";
// import {IssueInfoStatusMapper} from "../Translate/IssueInfoStatusMapper";
// import {IssueState} from "../../Migrate/Domain/MigrateRecord/IssueInfo";
//
// export class GitlabStatusMapper implements IssueInfoStatusMapper<IssueEvent> {
//     getStatus(payload: IssueEvent): IssueState {
//         return payload.object_attributes.state.toLowerCase() === 'open' ? IssueState.Open : IssueState.InProgress;
//     }
//
// }