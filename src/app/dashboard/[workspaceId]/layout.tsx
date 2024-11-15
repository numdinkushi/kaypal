import { getNotifications, onAuthenticateUser } from '@/actions/user';
import { getAllUserVideos, getWorkspaceFolders, getWorkspaces, verifyAccessToWorkspace } from '@/actions/workspace';
import { redirect } from 'next/navigation';
import React from 'react';
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,

} from "@tanstack/react-query";
import Sidebar from '@/components/global/sidebar';

type Props = {
    params: { workspaceId: string; },
    children: React.ReactNode;
};
const WorkspaceLayout = async ({ params: { workspaceId }, children }: Props) => {
    const auth = await onAuthenticateUser();
    if (!auth?.user?.workspace) redirect('/auth/sign-in');
    if (!auth?.user?.workspace?.length) redirect('/auth/sign-in');
    const hasAccess = await verifyAccessToWorkspace(workspaceId);

    if (hasAccess.status !== 200) {
        redirect(`/dashboard/${auth.user?.workspace[0].id}`);
    }

    if (!hasAccess.data?.workspace) return null;

    const query = new QueryClient();

    await query.prefetchQuery({
        queryKey: ['workspace-folders'],
        queryFn: async () => getWorkspaceFolders(workspaceId)
    });

    await query.prefetchQuery({
        queryKey: ['user-videos'],
        queryFn: async () => getAllUserVideos(workspaceId)
    });

    await query.prefetchQuery({
        queryKey: ['user-workspaces'],
        queryFn: async () => getWorkspaces()
    });

    await query.prefetchQuery({
        queryKey: ['notifications'],
        queryFn: async () => getNotifications()
    });

    return (
        <HydrationBoundary state={dehydrate(query)}>
            <div className="flex h-screen w-screen">
                <Sidebar activeWorkspaceId={workspaceId} />
            </div>
            {/* {children} */}
        </HydrationBoundary>
    );
};

export default WorkspaceLayout;