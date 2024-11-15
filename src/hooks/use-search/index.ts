import React, { useEffect, useState } from "react";
import useQueryData from "../useQueryData";
import { searchUsers } from "@/actions/user";

interface onUsers {
    id: string;
    subscription: {
        plan: 'FREE' | 'PRO';
    } | null;
    firstname: string | null;
    lastname: string | null;
    image: string | null;
    email: string | null;
}

const useSearch = (key: string, type: 'USERS') => {
    const [query, setQuery] = useState('');
    const [debounce, setDebounce] = useState('');
    const [onUsers, setOnUsers] = useState<onUsers[] | null | undefined>(undefined);

    const onSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    useEffect(() => {
        const delayTimeoutId = setTimeout(() => {
            setDebounce(query);
        }, 1000);

        return () => clearTimeout(delayTimeoutId);
    }, [query]);

    const { refetch, isFetching } = useQueryData(
        [key, debounce],
        async ({ queryKey }) => {
            if (type === 'USERS') {
                // TODO: check if it should be queryKey[0] or queryKey[1]
                const users = await searchUsers(queryKey[0] as string);
                if (users.status === 200) setOnUsers(users.data);
            }
        },
        false
    );

    useEffect(() => {
        if (debounce) refetch();
        if (!debounce) setOnUsers(undefined);

    }, [debounce]);

    return { onSearchQuery, query, isFetching, onUsers };
};

export default useSearch;