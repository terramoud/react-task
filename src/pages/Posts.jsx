import React, {useEffect, useState} from "react";
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

export const Posts = () => {
    const [posts, setPosts] = useState([])

    const [filter, setFilter] = useState({sortBy: '', searchQuery: ''});
    const [modal, setModal] = useState(false);
    const sortedAndSearchedPosts = usePosts(posts, filter.sortBy, filter.searchQuery);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [fetchPosts, isPostLoading, postError] = useFetching(async (limit, page) => {
        const response = await PostService.getAll(limit, page);
        setPosts(response.data);
        const totalCount = response.headers['x-total-count'];
        setTotalPages(getPageCount(totalCount, limit));
    });
    console.log(totalPages);
    const createNewPost = newPost => {
        setPosts([...posts, newPost])
        // setModal(false);
    }
    const removePost = post => {
        setPosts(posts.filter(currentPost => currentPost.id !== post.id))
    }

    useEffect(() => {
        fetchPosts(limit, page);
    }, []);

    const changePage = p => {
        setPage(p);
        fetchPosts(limit, p);
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
            {postError && <h1>Виникла помилка при завантаженні постів: ${postError}</h1>}
            {isPostLoading
                ? <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><Loader/></div>
                : <PostList remove={removePost} posts={sortedAndSearchedPosts} title={"Posts about JS"}/>
            }
            <Pagination
                page={page}
                changePage={changePage}
                totalPages={totalPages}
            />
        </div>
    );
}