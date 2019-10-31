import { Program } from "./arguments";
import * as http from 'http';
import { MigrateIssueFromGitlabToRedmineSrv, MigrageIssueFromGitlabtoRedmineMsg } from "./Redmine/Application/MigrateIssueFromGitlabToRedmineSrv";


let pg = new Program({
    migrateIssueAction: (message: IMigrateMsg) => {
        let srv = new MigrateIssueFromGitlabToRedmineSrv();
        let msg : MigrageIssueFromGitlabtoRedmineMsg = {
            git
        }
        msg
        srv.handle(message);
    }
})

let srv = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('okay');
})

srv.listen('8080', )