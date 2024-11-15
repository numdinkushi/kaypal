import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import useSearch from '@/hooks/use-search';
import React from 'react';

interface SearchProps {
    workspaceId: string;
}

const Search = ({ workspaceId }: SearchProps) => {
    const { query, onSearchQuery, isFetching, onUsers } = useSearch('get-users', 'USERS');

    // TODO: Wire up sending invitation
    // const { mutate, isPending} = useMutationData('invite-member', (data : {receiverId: string, email: string}) => {} );

    return (
        <div className='flex flex-col gap-y-5'>
            <Input
                onChange={onSearchQuery}
                value={query}
                className='bg-transparent border-2 outline-none '
                placeholder='Search for user..'
                type='text'
            />
            {isFetching && <div className="flex flex-col gap-y-2">
                <Skeleton className='w-full h-8 rounded-xl' />
            </div>}

            {!isFetching && (
                <div className="">
                    {
                        !onUsers
                            ? (<p className='text-center text-sm text-[#a4a4a4]' >No users found</p>)
                            : (<div>
                                {onUsers?.map((user) => (
                                    <div key={user.id} className="flex gap-x-3 items-center border-2 w-full p-3 rounded-xl">

                                    </div>
                                ))}
                            </div>
                            )
                    }
                </div>
            )}
        </div>
    );
};

export default Search;