import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useFetching} from "../hooks/useFetching";
import PostService from "../components/API/PostService";
import {Loader} from "../components/UI/Loader/Loader";

export const PostIdPage = () => {
    let params = useParams();
    console.log(params);
    const [post, setPost] = useState([]);
    const [comments, setComments] = useState([]);
    const [fetchPostById, isPostLoading, postError] = useFetching(async (id) => {
        const response = await PostService.getById(id);
        setPost(response.data);
    });

    const [fetchCommentsById, isCommentsLoading, commentsError] = useFetching(async (id) => {
        const response = await PostService.getCommentById(id);
        setComments(response.data);
    });

    useEffect(() => {
        fetchPostById(params.id);
        fetchCommentsById(params.id);
    }, []);

    return (
        <div>
            <h1> You open page about the post id = {params.id}</h1>
            {isPostLoading
                ? <Loader />
                : <div>{post.id}. {post.title}</div>
            }
            {isCommentsLoading
                ? <Loader />
                : <div>
                    {
                        comments.map(comment =>
                            <div key={comment.id} style={{marginTop: '15px'}}>
                                <h5>{comment.email}</h5>
                                <div>{comment.body}</div>
                            </div>
                    )}
                  </div>
            }
        </div>
    )
}