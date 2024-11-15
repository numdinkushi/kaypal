interface Workspace {
    id: string;
    name: string;
    type: 'PERSONAL' | 'PUBLIC';
}

export type WorkspaceProps = {
    data: {
        subscription: {
            plan: 'FREE' | 'PRO';
        } | null;
        workspace: Workspace[];
        members: {
            WorkSpace: Workspace;
        }[];
    };
};