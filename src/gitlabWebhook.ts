import * as http from 'http'
import * as createHandler from 'node-gitlab-webhook'
import {EventData, IssueEvent, PushEvent} from 'node-gitlab-webhook/interfaces'
import {MigrateIssueService} from "./Redmine/API/MigrateIssueService";

const handler = createHandler([ // multiple handlers
    {path: '/issue', secret: 'issue'},
    {path: '/comment', secret: 'comment'}
]);
// var handler = createHandler({ path: '/webhook1', secret: 'secret1' }) // single handler

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
    )

    const srv = new MigrateIssueService();
    srv.receiveGitlabIssueWebhook({

    });
});

handler.on('push', (event: EventData<PushEvent>) => {
    console.log(
        'Received a push event for %s to %s',
        event.payload.repository.name,
        event.payload.ref
    );

    switch (event.path) {
        case '/issue':
            event.payload
            // do sth about webhook1
            break;
        case '/comment':
            // do sth about webhook2
            break;
        default:
            // do sth else or nothing
            break;
    }
});