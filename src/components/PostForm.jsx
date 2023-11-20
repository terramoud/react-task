import MyInput from "./UI/input/MyInput";
import {MyButton} from "./UI/button/MyButton";
import {useRef, useState} from "react";

export const PostForm = ({create}) => {
    const [post, setPost] = useState({title: "", body: ""});
    const bodyInputRef = useRef();

    const addNewPost = e => {
        e.preventDefault()
        create({...post, id: Date.now()})
        setPost({title: "", body: ""})
    }

    return (
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
    )
}