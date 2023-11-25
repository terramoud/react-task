import './styles/App.css';
import {PostList} from "./components/PostList";
import {PostForm} from "./components/PostForm";
import {MySelect} from "./components/UI/select/MySelect";
import {useMemo, useState} from "react";
import MyInput from "./components/UI/input/MyInput";

function App() {
    const [posts, setPosts] = useState([
        {id: 1, title: "javascript3", body: "description"},
        {id: 2, title: "asdfasdf2", body: "description2"},
        {id: 3, title: "dfdf1", body: "description3"},
    ])
    const [selectedSort, setSelectedSort] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const createNewPost = newPost => {
        setPosts([...posts, newPost])
    }
    const removePost = post => {
        setPosts(posts.filter(currentPost => currentPost.id !== post.id))
    }

    const sortedPosts = useMemo(() => {
        if (selectedSort) {
            return [...posts].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]));
        }
        return posts;
    }, [selectedSort, posts]);

    const sortedAndSearchedPosts = useMemo(() => {
        console.log("filter")
        return sortedPosts.filter((post) =>
            post.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [sortedPosts, searchQuery]);

    return (
        <div className="App">
            <PostForm create={createNewPost}/>
            <hr/>
            <div>
                <MyInput
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search by title"
                />
                <MySelect
                    value={selectedSort}
                    onChange={(sortType) => setSelectedSort(sortType)}
                    defaultValue={"Сортування"}
                    options={[
                        {value: 'title', name: 'По назві'},
                        {value: 'body', name: 'По опису'}
                    ]}
                />
            </div>
            {sortedAndSearchedPosts.length
                ?
                <PostList remove={removePost} posts={sortedAndSearchedPosts} title={"Posts about JS"}/>
                :
                <h1 style={{textAlign: 'center'}}>
                    Пости не знайдені!
                </h1>
            }
        </div>
    );
}

export default App;