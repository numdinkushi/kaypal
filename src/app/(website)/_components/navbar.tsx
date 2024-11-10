import { Button } from '@/components/ui/button';
import { AppLogo } from '@/constants/images';
import { Menu, UserIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const LandingPageNavbar = () => {
    return (
        <div className='flex w-full justify-between items-center'>
            <div className="text-3xl font-semibold flex items-center gap-x-3">
                <Menu className='w-8 h-8 ' />
                <Image alt='logo' src={AppLogo} width={40} height={40} />
                Kaypal
            </div>
            <div className="hidden gap-x-10 items-center lg:flex">
                <Link href='/' className='bg-[#7320dd] py-2 px-5 font-semibold text-lg rounded-full hover:bg-[#7320dd]/80'>Home </Link>
                <Link href='/'>Contacts </Link>
                <Link href='/'>About </Link>
            </div>
            <Link href='/auth/sign-in'>
                <Button className='tex-base flex gap-x-2'>
                    <UserIcon fill='#000' />
                    Login
                </Button>
            </Link>
        </div>
    );
};

export default LandingPageNavbar;