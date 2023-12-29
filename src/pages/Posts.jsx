import React, {useEffect, useRef, useState} from "react";
import {usePosts} from "../hooks/usePosts";
import {useFetching} from "../hooks/useFetching";
import PostService from "../components/API/PostService";
import {getPageCount} from "../utils/page";
import {MyButton} from "../components/UI/button/MyButton";
import {MyModal} from "../components/UI/MyModal/MyModal";
import {PostForm} from "../components/PostForm";
import {PostFilter} from "../components/PostFilter";
import {Loader} from "../components/UI/Loader/Loader";
import {PostList} from "../components/PostList";
import {Pagination} from "../components/Pagination";
import {useObserver} from "../hooks/useObserver";
import {MySelect} from "../components/UI/select/MySelect";

export const Posts = () => {
    const [posts, setPosts] = useState([])

    const [filter, setFilter] = useState({sortBy: '', searchQuery: ''});
    const [modal, setModal] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const sortedAndSearchedPosts = usePosts(posts, filter.sortBy, filter.searchQuery);
    const lastElement = useRef();
    const [fetchPosts, isPostLoading, postError] = useFetching(async (limit, page) => {
        const response = await PostService.getAll(limit, page);
        setPosts([...posts, ...response.data]);
        const totalCount = response.headers['x-total-count'];
        setTotalPages(getPageCount(totalCount, limit));
    });

    useObserver(lastElement, page < totalPages, isPostLoading, () => {
        setPage(page + 1);
    })

    const createNewPost = newPost => {
        setPosts([...posts, newPost])
        // setModal(false);
    }
    const removePost = post => {
        setPosts(posts.filter(currentPost => currentPost.id !== post.id))
    }

    useEffect(() => {
        fetchPosts(limit, page);
    }, [page, limit]);

    const changePage = p => {
        setPage(p);
    };

    return (
        <div className="App">
            {/*<MyButton onClick={fetchPosts}>get posts</MyButton>*/}
            <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
                Create post
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createNewPost}/>
            </MyModal>
            <hr/>
            <PostFilter filter={filter} setFilter={setFilter}/>
            <MySelect
                value={limit}
                onChange={value => setLimit(value)}
                defaultValue="Кількість елементів на сторінці"
                options={[
                    {value: 5, name: '5'},
                    {value: 10, name: '10'},
                    {value: 25, name: '25'},
                    {value: -1, name: 'All'}
                ]}
            />
            {postError && <h1>Виникла помилка при завантаженні постів: ${postError}</h1>}
            <PostList remove={removePost} posts={sortedAndSearchedPosts} title={"Posts about JS"}/>
            <div ref={lastElement} style={{height: 20, background: 'red'}}></div>
            {isPostLoading &&
                <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><Loader/></div>
            }
            <Pagination
                page={page}
                changePage={changePage}
                totalPages={totalPages}
            />
        </div>
    );
}