import './styles/App.css';
import {useRef, useState} from "react";
import {PostList} from "./components/PostList";
import {MyButton} from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
function App() {
    const [posts, setPosts] = useState([
        {id: 1, title: "javascript", body: "description"},
        {id: 2, title: "javascript2", body: "description2"},
        {id: 3, title: "javascript3", body: "description3"},
    ])
    const [post, setPost] = useState({title: "", body: ""});

    const bodyInputRef = useRef();
    const addNewPost = e => {
        e.preventDefault()
        setPosts([...posts, {...post, id: Date.now()}])
        setPost({title: "", body: ""})
    }

    return (
        <div className="App">
            <form>
                {/* Керований компонент */}
                <MyInput
                    value={post.title}
                    onChange={e => setPost({...post, title: e.target.value})}
                    type="text"
                    placeholder="name of post"
                />
                {/* Не керований компонент */}
                <MyInput
                    value={post.body}
                    ref={bodyInputRef}
                    onChange={() => setPost({...post, body: bodyInputRef.current.value})}
                    type="text"
                    placeholder="description of post"
                />
                <MyButton onClick={addNewPost}>Create post</MyButton>
            </form>
            <PostList posts={posts} title={"Posts about JS"} />
        </div>
    );
}

export default App;