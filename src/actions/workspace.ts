'use server';

import client from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const verifyAccessToWorkspace = async (workspaceId: string) => {
    try {
        const user = await currentUser();
        if (!user) return { status: 401 };

        const isUserInWorkspace = await client.workSpace.findUnique({
            where: {
                id: workspaceId,
                OR: [
                    {
                        User: {
                            clerkid: user.id
                        }
                    },
                    {
                        members: {
                            every: {
                                User: {
                                    clerkid: user.id
                                }
                            }
                        }
                    }
                ]
            },
        });

        return {
            status: 200,
            data: { workspace: isUserInWorkspace }
        };
    } catch (error) {
        console.log('verifyAccessToken error', error);
        return {
            status: 403,
            data: { workspace: null }
        };
    }
};

export const getWorkspaceFolders = async (workspaceId: string) => {
    try {
        const isFolders = await client.folder.findMany({
            where: {
                workSpaceId: workspaceId
            },
            include: {
                _count: {
                    select: {
                        videos: true
                    }
                }
            }
        });

        if (isFolders && isFolders.length > 0) {
            return {
                status: 200,
                data: isFolders
            };
        }

        return { status: 404, data: [] };
    } catch (error) {
        console.log('getWorkspaceFolders error', error);
        return { status: 500, data: [] };
    }
};

export const getAllUserVideos = async (workSpaceId: string) => {
    try {
        const user = await currentUser();
        if (!user) return { status: 404 };
        const videos = await client.video.findMany({
            where: {
                OR: [
                    { workSpaceId },
                    { folderId: workSpaceId }
                ]
            },
            select: {
                id: true,
                title: true,
                createdAt: true,
                source: true,
                processing: true,
                folderId: true,
                workSpaceId: true,
                Folder: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                User: {
                    select: {
                        firstname: true,
                        lastname: true,
                        image: true
                    },
                },
            },
            orderBy: {
                createdAt: 'asc'
            }
        });

        if (videos && videos.length > 0) {
            return {
                status: 200,
                data: videos
            };
        }

        return { status: 404 };
    } catch (error) {
        console.log('getAllUserVideos error', error);
        return { status: 500 };
    }
};

export const getWorkspaces = async () => {
    const user = await currentUser();
    if (!user) return { status: 401 };

    try {
        const workspaces = await client.user.findUnique({
            where: {
                clerkid: user.id
            },
            select: {
                subscription: {
                    select: {
                        plan: true
                    }
                },
                workspace: {
                    select: {
                        id: true,
                        name: true,
                        type: true
                    }
                },
                members: {
                    select: {
                        WorkSpace: {
                            select: {
                                id: true,
                                name: true,
                                type: true
                            }
                        }
                    }
                }
            },
        });

        if (workspaces) {
            return {
                status: 200,
                data: workspaces
            };
        }

        return { status: 404 };
    } catch (error) {
        console.log('getWorkspaces error', error);
        return { status: 500 };
    }
};

