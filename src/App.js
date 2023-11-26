import './styles/App.css';
import {PostList} from "./components/PostList";
import {PostForm} from "./components/PostForm";
import {useMemo, useState} from "react";
import {PostFilter} from "./components/PostFilter";

function App() {
    const [posts, setPosts] = useState([
        {id: 1, title: "javascript3", body: "description"},
        {id: 2, title: "asdfasdf2", body: "description2"},
        {id: 3, title: "dfdf1", body: "description3"},
    ])

    const [filter, setFilter] = useState({sortBy: '', searchQuery: ''});

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
            <PostForm create={createNewPost}/>
            <hr/>
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
            {sortedAndSearchedPosts.length ?
                <PostList remove={removePost} posts={sortedAndSearchedPosts} title={"Posts about JS"}/> :
                <h1 style={{textAlign: 'center'}}>
                    Пости не знайдені!
                </h1>}
        </div>);
}

export default App;