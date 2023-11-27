import './styles/App.css';
import {PostList} from "./components/PostList";
import {PostForm} from "./components/PostForm";
import {PostFilter} from "./components/PostFilter";
import React, {useMemo, useState} from "react";
import {MyModal} from "./components/UI/MyModal/MyModal";
import {MyButton} from "./components/UI/button/MyButton";

function App() {
    const [posts, setPosts] = useState([
        {id: 1, title: "javascript3", body: "description"},
        {id: 2, title: "asdfasdf2", body: "description2"},
        {id: 3, title: "dfdf1", body: "description3"},
    ])

    const [filter, setFilter] = useState({sortBy: '', searchQuery: ''});
    const [modal, setModal] = useState(false);

    const sortedPosts = useMemo(() => {
        if (filter.sortBy) {
            return [...posts].sort((a, b) => a[filter.sortBy].localeCompare(b[filter.sortBy]));
        }
        return posts;
    }, [filter.sortBy, posts]);

    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter((post) => post.title.toLowerCase().includes(filter.searchQuery.toLowerCase()));
    }, [sortedPosts, filter.searchQuery]);

    const createNewPost = newPost => {
        setPosts([...posts, newPost])
    }

    const removePost = post => {
        setPosts(posts.filter(currentPost => currentPost.id !== post.id))
    }

    return (
        <div className="App">
            <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
                Create post
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createNewPost}/>
            </MyModal>
            <hr/>
            <PostFilter filter={filter} setFilter={setFilter}/>
            <PostList remove={removePost} posts={sortedAndSearchedPosts} title={"Posts about JS"}/>
        </div>
    );
}

export default App;