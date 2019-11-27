import * as http from 'http'
import * as createHandler from 'node-gitlab-webhook'
import {EventData, IssueEvent, NoteEvent} from "node-gitlab-webhook/interfaces";
import {MigrateIssueSrv} from "../Migrate/Application/Service/MigrateIssueSrv";
import {RedmineRepo} from "./Infra/RedmineRepo";
import {MigrateRecordRepo} from "./Infra/MigrateRecordRepo";
import {GitlabTranslator} from "./DomainService/GitlabTranslator";
import * as Path from "path";
import {AddNoteSrv} from "../Migrate/Application/Service/AddNoteSrv";

const handler = createHandler([ // multiple handlers
    {path: '/issue', secret: 'issue'},
    {path: '/comment', secret: 'comment'}
]);

console.log("Starting Server, listen to " + process.env.GRM_LISTEN_PORT);
console.log(`Redmine location: ${process.env.REDMINE_HOST}${process.env.REDMINE_PROJECT_PATH}`);
http.createServer((req: http.IncomingMessage, res: http.ServerResponse): void => {
    handler(req, res, (err) => {
        if (err) {
            console.error(err);
        }

        res.statusCode = 404;
        res.end('no such location');
    })
}).listen(process.env.GRM_LISTEN_PORT);

const MIGRATE_RECORD_REPO_DATA_PATH = process.cwd() + Path.sep + "data";

handler.on('error', (err) => {
    console.error('Error:', err.message)
});

handler.on('issue', (event: EventData<IssueEvent>) => {
    console.log(
        'Received a issue event for repo "%s". Issue Name %s',
        event.payload.repository.name,
        event.payload.object_attributes.title,
    );

    const srv = new MigrateIssueSrv(new RedmineRepo(), new MigrateRecordRepo(MIGRATE_RECORD_REPO_DATA_PATH));
    srv.handle(GitlabTranslator.fromIssueEvent(event.payload));
});

handler.on('note', (event: EventData<NoteEvent>) => {
    const note = event.payload.object_attributes;
    console.log(
        'Received a event note for repo "%s". Issue Name %s, Note %s',
        event.payload.repository.name,
        event.payload.issue!.title,
        note.note
    );

    if (note.noteable_type !== 'Issue') {
        console.log(`noteid: ${note.id}. note type is ${note.noteable_type}, ignore it!!`)
    }

    const srv = new AddNoteSrv(new RedmineRepo(), new MigrateRecordRepo(MIGRATE_RECORD_REPO_DATA_PATH));
    srv.handle(GitlabTranslator.fromNoteEvent(event.payload), GitlabTranslator.fromNoteEventToNote(event.payload));
});