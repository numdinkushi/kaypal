import { AppLogo } from '@/constants/images';
import Image from 'next/image';
import React from 'react';

const Sidebar = ({ activeWorkspaceId }: { activeWorkspaceId: string; }) => {
    return (
        <div className='bg-[#111111] flex-none relative p-4 h-full w-[250px] flex-col gap-4 items-center overflow-hidden'>
            <div className="bg-[#111111] p-4 gap-2 justify-center items-center mb-4 absolute top-0 left-0 right-0">
                <Image src={AppLogo} height={40} width={40} alt='logo' />
            </div>
        </div>
    );
};

export default Sidebar;