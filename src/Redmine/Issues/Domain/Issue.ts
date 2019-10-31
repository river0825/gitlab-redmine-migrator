class GitlabUser {
    avatarUrl?: string;
    id?: number;
    name?: string;
    state?: string; //"active"
    username?: string; //"ka"
    webUrl?: string; //"https://gitlab.pchomepay.com.tw/ka"
}

class GitlabLink {
    awardEmoji?: string;
    notes?: string;
    project?: string;
    self?: string;
}

class GitlabMilestone {
    createdAt?: Date
    description?: string
    dueDate?: Date
    groupId?: number
    id?: number
    iid?: number
    startDate?: Date
    state?: "active" | string
    title?: string
    updatedAt?: Date
    webUrl?: string
}

class TaskCompletionStatus {
    count?: number;
    completedCount?: number;
}

class TimeStats {
    timeEstimate?: number;
    totalTimeSpent?: number;
    humanTimeEstimate?: string;
    humanTotalTimeSpent?: string;
}

class GitlabIssue {
    assignee?: GitlabUser 
    assignees?: GitlabUser[] 
    author?: GitlabUser 
    closedAt?: string 
    closedBy?: string 
    confidential?: boolean 
    createdAt?: Date 
    description?: string 
    discussionLocked?: boolean 
    downvotes?: number 
    dueDate?: Date 
    hasTasks?: boolean 
    id?: number 
    iid?: number 
    labels?: string[] 
    links?: GitlabLink 
    mergeRequestsCount?: number 
    milestone?: GitlabMilestone 
    projectId?: number 
    project_id?: number 
    state?: 'closed' | 'opened' | string 
    subscribed?: false 
    taskCompletionStatus?: TaskCompletionStatus 
    timeStats?: TimeStats 
    title?: string 
    updatedAt?: Date 
    upvotes?: number 
    userNotesCount?: number 
    webUrl?: string 
}

class RedmineIdName{
    id?: number
    name?: string
    value?: string
}

class RedmineIssue {
    project?: RedmineIdName
    tracker?: RedmineIdName
    status?:RedmineIdName 
    priority?:RedmineIdName 
    subject?: string
    description?: string
    // category_id?: string
    // fixed_version_id?: string // ID of the Target Versions (previously called 'Fixed Version' and still referred to as such in the API)
    // assigned_to_id?: string // - ID of the user to assign the issue to (currently no mechanism to assign by name)
    // parent_issue_id?: string // - ID of the parent issue
    custom_fields?: RedmineIdName[]; // - See Custom fields
    // watcher_user_ids?: string // - Array of user ids to add as watchers (since 2.3.0)
    // is_private?: string // - Use true or false to indicate whether the issue is private or not
    // estimated_hours?: string // - Number of hours estimated for issue
    done_ratio?: number
    created_on?: Date
    updated_on?: Date
}

export { GitlabIssue, GitlabLink, GitlabMilestone, GitlabUser, RedmineIssue }