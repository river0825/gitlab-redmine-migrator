// import program = require('commander');
// program.version('0.0.1');

// export interface ArgvConfig {
//     migrateIssueAction: (config: MigrateMsg) => void;
// }

// export class Program {
//
//   constructor(config: ArgvConfig){
//     program
//         .command('migrateIssue')
//         .description('Migrate from redmine to gitlab')
//         .option('-r, --redmine-url <redmineUrl>', 'Url of redmine')
//         .option('-a, --redmine-api-key <redmineApiKey>', 'Url of gitlab')
//         .option('-g, --gitlab-url <gitlabUrl>', 'Url of gitlab')
//         .option('-t, --gitlab-token <gitlabToken>', 'Gitlab token')
//         .usage(process.argv[0] + 'migrateIssue -g https://gitlab.com/[group] -t [token] -r http://59.124.7.179:9343/projects/[project] -a [apikey]')
//         .action(config.migrateIssueAction);
//
//         program.parse(process.argv);
//     }
// }
//