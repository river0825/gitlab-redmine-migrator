//-p $LISTEN_PORT -t $TMPFOLDER -s $CONFIGFOLDER
//pm2 configuration

let ignorePath = ['bin', 'recv', 'log', '.idea', '.git', 'data', 'src'];

module.exports = {
    apps: [
        {
            name: 'gitlab-redmine-migrator',
            script: './build/src/App/gitlabWebhook.js',
            watch: true,
            restart_delay: 4000,
            watch_options: {
                interval: 5000,
                awaitWriteFinish: {
                    stabilityThreshold: 2000,
                    pollInterval: 100
                }
            },
            listen_timeout: 3000,
            kill_timeout: 30000,
            instance: 1,
            ignore_watch: ignorePath,
            env_local: {
                NODE_ENV: 'local',
                GRM_LISTEN_PORT: 7123,
                REDMINE_HOST: "http://www.hostedredmine.com",
                REDMINE_PROJECT_PATH: "/projects/gitlab-redmine-migrator",
                REDMINE_APIKEY: ''
            },
            env_dev: {
                NODE_ENV: 'dev',
                GRM_LISTEN_PORT: 7123,
                REDMINE_HOST: "http://www.hostedredmine.com",
                REDMINE_PROJECT_PATH: "/projects/gitlab-redmine-migrator",
                REDMINE_APIKEY: ''
            },
            env_production: {
                NODE_ENV: 'prod',
                GRM_LISTEN_PORT: 7123,
                REDMINE_HOST: "http://www.hostedredmine.com",
                REDMINE_PROJECT_PATH: "/projects/gitlab-redmine-migrator",
                REDMINE_APIKEY: ''
            }

        }
    ]
};



