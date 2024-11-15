import { Enabled, QueryFunction, QueryKey, useQuery } from '@tanstack/react-query';

const useQueryData = (queryKey: QueryKey, queryFn: QueryFunction, enabled?: Enabled) => {
    const { data, isPending, isFetched, refetch, isFetching, error } = useQuery({ queryKey, queryFn, enabled });

    return {
        data,
        isPending,
        isFetched,
        refetch,
        isFetching,
        error
    };
};

export default useQueryData;