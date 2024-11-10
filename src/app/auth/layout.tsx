import React from 'react';

const Layout = ({ children }: { children: React.ReactNode; }) => {
    return (
        <div className='container h-screen flex justify-center items-center'>
            {children}
        </div>
    );
};

export default Layout;