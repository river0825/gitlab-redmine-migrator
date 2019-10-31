export default interface RedmineException {
    ErrorCode: string;
    Message: string;
    Detail: {status: string, error:string};
}