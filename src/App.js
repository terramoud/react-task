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

function App() {
    const [posts, setPosts] = useState([])

    const [filter, setFilter] = useState({sortBy: '', searchQuery: ''});
    const [modal, setModal] = useState(false);
    const sortedAndSearchedPosts = usePosts(posts, filter.sortBy, filter.searchQuery);
    const [isPostLoading, setIsPostLoading] = useState(false);

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

    async function fetchPosts() {
        setIsPostLoading(true);
        setTimeout(async () => {
            const posts = await PostService.getAll();
            setPosts(posts)
            setIsPostLoading(false)
        }, 1500);
    }

    return (
        <div className="App">
            <MyButton onClick={fetchPosts}>get posts</MyButton>
            <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
                Create post
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createNewPost}/>
            </MyModal>
            <hr/>
            <PostFilter filter={filter} setFilter={setFilter}/>
            {isPostLoading
                ? <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><Loader/></div>
                : <PostList remove={removePost} posts={sortedAndSearchedPosts} title={"Posts about JS"}/>
            }
        </div>
    );
}

export default App;