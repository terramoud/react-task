import {useMemo} from 'react';

export const useSortedPosts = (posts, sortBy) => {
    return useMemo(() => {
        if (sortBy) {
            return [...posts].sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
        }
        return posts;
    }, [sortBy, posts])
};

export const usePosts = (posts, sortBy, query) => {
    const sortedPosts = useSortedPosts(posts, sortBy);
    return useMemo(() => sortedPosts.filter((post) => post.title.toLowerCase().includes(query.toLowerCase())),
        [sortedPosts, query]
    );
}