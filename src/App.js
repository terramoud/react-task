import './styles/App.css';
import {PostList} from "./components/PostList";
import {PostForm} from "./components/PostForm";
import {PostFilter} from "./components/PostFilter";
import React, {useEffect, useState} from "react";
import {MyModal} from "./components/UI/MyModal/MyModal";
import {MyButton} from "./components/UI/button/MyButton";
import {usePosts} from "./hooks/usePosts";
import PostService from "./components/API/PostService";
import {Loader} from "./components/UI/Loader/Loader";
import {useFetching} from "./hooks/useFetching";

function App() {
    const [posts, setPosts] = useState([])

    const [filter, setFilter] = useState({sortBy: '', searchQuery: ''});
    const [modal, setModal] = useState(false);
    const sortedAndSearchedPosts = usePosts(posts, filter.sortBy, filter.searchQuery);
    const [fetchPosts, isPostLoading, postError] = useFetching(async () => {
        const posts = await PostService.getAll();
        setPosts(posts);
    });

    const createNewPost = newPost => {
        setPosts([...posts, newPost])
        // setModal(false);
    }
    const removePost = post => {
        setPosts(posts.filter(currentPost => currentPost.id !== post.id))
    }

    useEffect(() => {
        fetchPosts();
    }, []);

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
        </div>
    );
}

export default App;