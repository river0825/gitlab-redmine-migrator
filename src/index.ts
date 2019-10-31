import RedmineException from "./Redmine/Exception/RedmineException";

let Redmine = require("node-redmine");


// protocol required in Hostname, supports both HTTP and HTTPS
const hostname = process.env.REDMINE_HOST || 'http://59.124.7.179:9343/projects/pchomepay';

const config = {
  apiKey: process.env.REDMINE_APIKEY || '45a8fab91b61e2ae6b9623823faa55142d10c352',
};
console.log([hostname, config]);

const redmine = new Redmine(hostname, config);

/**
 * Dump issue
 */
// const dumpIssue = (issue: { [x: string]: any; }) =>
// {
//   console.log('Dumping issue:');
//   for (const item in issue) {
//     console.log('  ' + item + ': ' + JSON.stringify(issue[item]));
//   }
// };

const issueData = {
  issue: {
    // project_id?: number;
    // tracker_id?: number;
    // priority_id?: number;
    // category_id?: number;
    // status_id?: number;
    // assigned_to_id?: number;
    subject: 'first subject',
    description: 'description',
    // parent_issue_id?: number;
    // notes?: string;
    // uploads?: UploadRecord[];
  },
};

redmine.create_issue(issueData, (err: RedmineException, data: Object) => {
  console.log({err: err});
  console.log({data: JSON.stringify(data)});
});

// redmine.issues({limit: 2}, (err: any, data: { issues: { [x: string]: any; }; total_count: string; }) => {
//   if (err) throw err;

//   for (const i in data.issues) {
//     dumpIssue(data.issues[i]);
//   }

//   console.log('total_count: ' + data.total_count);
// });
