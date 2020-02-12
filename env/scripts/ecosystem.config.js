//-p $LISTEN_PORT -t $TMPFOLDER -s $CONFIGFOLDER
//pm2 configuration

let ignorePath = ['scripts', 'recv', 'log', '.idea', '.git', 'data', 'src'];

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
        }
    ]
};
