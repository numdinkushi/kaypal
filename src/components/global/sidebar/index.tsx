'use client';
import { getWorkspaces } from '@/actions/workspace';
import { Select, SelectTrigger, SelectContent, SelectValue, SelectGroup, SelectLabel, SelectItem } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { AppLogo } from '@/constants/images';
import useQueryData from '@/hooks/useQueryData';
import { WorkspaceProps } from '@/types/index.type';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import Modal from '../modal';
import { PlusCircle } from 'lucide-react';
import Search from '../search';

const Sidebar = ({ activeWorkspaceId }: { activeWorkspaceId: string; }) => {
    const router = useRouter();
    const { data, isFetched } = useQueryData(['user-workspaces'], getWorkspaces);
    const { data: workspaces } = data as WorkspaceProps;

    const onChangeActiveWorkspace = (value: string) => {
        router.push(`dashboard/${value}`);
    };

    console.log(44, activeWorkspaceId);

    return (
        <div className='bg-[#111111] flex-none relative p-4 h-full w-[250px] flex-col gap-4 items-center overflow-hidden'>
            <div className="bg-[#111111] p-4 gap-2 flex justify-center items-center mb-4 absolute top-0 left-0 right-0">
                <Image src={AppLogo} height={40} width={40} alt='logo' />
                <p className='text-2xl'>Kaypal</p>
            </div>
            <Select defaultValue={activeWorkspaceId} onValueChange={onChangeActiveWorkspace} >
                <SelectTrigger className='mt-16 text-neutral-400 bg-transparent'>
                    <SelectValue placeholder='Select a workspace'>
                    </SelectValue>
                </SelectTrigger>
                <SelectContent className='bg-[#111111] backdrop-blur-xl'>
                    <SelectGroup>
                        <SelectLabel className='text-white'>Workspaces</SelectLabel>
                        <Separator />
                        {workspaces.workspace.map((workspace) => (
                            <SelectItem key={workspace.id} value={workspace.id}>
                                {workspace.name}
                            </SelectItem>
                        ))}
                        {workspaces.members.length > 0 && workspaces.members.map((member) => member.WorkSpace && (
                            <SelectItem key={member.WorkSpace.id} value={member.WorkSpace.id}>
                                {member.WorkSpace.name}
                            </SelectItem>
                        ))

                        }
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Modal
                trigger={<span className='text-sm cursor-pointer flex items-center justify-center bg-neutral-800 hover:bg-neutral-800/60 w-full rounded-sm p-[5px] gap-2 my-4'>
                    <PlusCircle size={15} className='text-neutral-800/90 fill-neutral-500' />
                    <span className='text-neutral-400 font-semibold text-xs'>Invite to workspace</span>
                </span>
                }
                title='Invite To Workspace'
                description='Invite other users to your workspace'
            >
                <Search
                    workspaceId={activeWorkspaceId}
                />
            </Modal>
        </div>
    );
};

export default Sidebar;