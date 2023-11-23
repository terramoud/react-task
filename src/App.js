import './styles/App.css';
import {PostList} from "./components/PostList";
import {PostForm} from "./components/PostForm";
import {MySelect} from "./components/UI/select/MySelect";
import {useState} from "react";
import MyInput from "./components/UI/input/MyInput";
function App() {
    const [posts, setPosts] = useState([
        {id: 1, title: "javascript3", body: "description"},
        {id: 2, title: "javascript2", body: "description2"},
        {id: 3, title: "javascript1", body: "description3"},
    ])
    const [selectedSort, setSelectedSort] = useState('');
    // const [searchQuery, setSearchQuery] = useState('');

    const createNewPost = newPost => {
        setPosts([...posts, newPost])
    }

    const removePost = post => {
        setPosts(posts.filter(currentPost => currentPost.id !== post.id))
    }


    const sortPosts = (sortType) => {
        setSelectedSort(sortType);
        setPosts([...posts].sort((a, b) => a[sortType].localeCompare(b[sortType])));
    };

    return (
        <div className="App">
            <PostForm create={createNewPost}/>
            <hr/>
            <div>
                {/*<MyInput*/}
                {/*    type="text"*/}
                {/*    value={searchQuery}*/}
                {/*    onChange={e => setSearchQuery(e.target.value)}*/}
                {/*    placeholder="Search by title"*/}
                {/*/>*/}
                <MySelect
                    value={selectedSort}
                    onChange={sortPosts}
                    defaultValue={"Сортування"}
                    options={[
                        {value: 'title', name: 'По назві'},
                        {value: 'body', name: 'По опису'}
                    ]}
                />
            </div>
            {posts.length
                ?
                <PostList remove={removePost} posts={posts} title={"Posts about JS"}/>
                :
                <h1 style={{textAlign: 'center'}}>
                    Пости не знайдені!
                </h1>
            }

        </div>
    );
}
export default App;