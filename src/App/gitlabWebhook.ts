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

http.createServer((req: http.IncomingMessage, res: http.ServerResponse): void => {
    handler(req, res, (err) => {
        res.statusCode = 404;
        res.end('no such location');
    })
}).listen(7777);

handler.on('error', (err) => {
    console.error('Error:', err.message)
});

handler.on('issue', (event: EventData<IssueEvent>) => {
    console.log(
        'Received a issue event for %s to %s',
        event.payload.repository.name,
        event.payload.object_attributes.title,
    );

    const srv = new MigrateIssueSrv(new RedmineRepo(), new MigrateRecordRepo(process.cwd() + Path.sep+ "data"));
    srv.handle(GitlabTranslator.fromIssueEvent(event.payload));
});

handler.on('note', (event: EventData<NoteEvent>) => {
    console.log(
        'Received a note event for %s to %s',
    );

    const srv = new AddNoteSrv(new RedmineRepo(), new MigrateRecordRepo(process.cwd() + Path.sep + "data"));
    srv.handle(GitlabTranslator.fromNoteEvent(event.payload), GitlabTranslator.fromNoteEventToNote(event.payload));
});