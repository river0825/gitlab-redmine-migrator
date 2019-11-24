let redmineClass = require("node-redmine");


// protocol required in Hostname, supports both HTTP and HTTPS
const hostname = process.env.REDMINE_HOST || 'http://www.hostedredmine.com'

const config = {
  apiKey: process.env.REDMINE_APIKEY || '77327f8a54450266a4853d015cb286f445f80590',
};
console.log([hostname, config]);

const redmine = new redmineClass(hostname, config);

const issueData = {
  issue: {
    // id:849130,
    // project_id?: number;
    // tracker_id?: number;
    // priority_id?: number;
    // category_id?: number;
    // status_id?: number;
    // assigned_to_id?: number;
    subject: 'first subject',
    description: 'description',
    // parent_issue_id?: number;
    notes: "this is the very first note"
    // uploads?: UploadRecord[];
  },
};

// tslint:disable-next-line:no-any
// redmine.create_issue(issueData, (err: any, data: any) => {
//   console.log({err});
//   console.log({data: JSON.stringify(data)});
  // console.log(data);
// });

redmine.update_issue(849130, issueData, (err: any, data: any) =>{
  if(err) {
    console.log(err);
  }else{
    console.log(data);
  }


});
