
export interface Companion {
    id: string;
    name: string;
    subject: string;
    topic: string;
    author?: string;
    created_at?: string;
}

export interface SessionHistory {
    companion_id: string;
    user_id: string;
    companions?: Companion;
}

export interface GetAllCompanions {
    limit?: number;
    page?: number;
    subject?: string;
    topic?: string;
}

export interface BookmarkCompanion {
    user_id: string;
    companion_id: string;
    user?: Companion;
}