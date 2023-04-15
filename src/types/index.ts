export interface Post {
    id: number;
    author: string;
    title: string;
    post: string;
    created_at: string;
    status: number;
    type: number;
    deleted?: boolean;
    author_id?: number;
}

export interface PageProps {
    location: { pathname: string; history: string[] };
}

export interface DraftPageProps extends PageProps { }
export interface PostDetailPageProps extends PageProps { }

export interface TextEditorProps {
    post?: Post;
}

export interface GreetingsProps {
    title: string;
    subtitle: string;
}

export interface PostProps {
    post: Post;
    draft?: boolean;
}

export interface PostsProps {
    id?: number;
    posts: Post[];
}
