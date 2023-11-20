import './styles/App.css';
import {PostList} from "./components/PostList";
import {PostForm} from "./components/PostForm";
import {useState} from "react";
function App() {
    const [posts, setPosts] = useState([
        {id: 1, title: "javascript", body: "description"},
        {id: 2, title: "javascript2", body: "description2"},
        {id: 3, title: "javascript3", body: "description3"},
    ])

    const createNewPost = newPost => {
        setPosts([...posts, newPost])
    }

    const removePost = post => {
        setPosts(posts.filter(currentPost => currentPost.id !== post.id))
    }


    return (
        <div className="App">
            <PostForm create={createNewPost}/>
            <PostList remove={removePost} posts={posts} title={"Posts about JS"} />
        </div>
    );
}
export default App;