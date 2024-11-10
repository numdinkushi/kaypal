'use client';
import { useMounted } from '@/hooks/mounted/useMounted';
import React from 'react';
import LandingPageNavbar from './_components/navbar';

interface LayoutProps {
    children: React.ReactNode,

}

const Layout = ({ children }: LayoutProps) => {
    const mounted = useMounted();

    if (!mounted) return null;

    return (
        <div className='flex flex-col py-10 px-10 xl:px-0 container'>
            <LandingPageNavbar />
            {children}
        </div>
    );
};

export default Layout;