interface IEndPointInfo{
    url: string;
    token: string;
}

interface IMigrateMsg
{
    redmine: IEndPointInfo;
    gitlab: IEndPointInfo;
    dryRun: boolean; 
}