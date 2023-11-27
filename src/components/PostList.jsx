import {PostItem} from "./PostItem";
import {CSSTransition, TransitionGroup} from 'react-transition-group';

export const PostList = ({posts, title, remove}) => {
    if (!posts.length) {
        return (
            <h1 style={{textAlign: 'center'}}>
                Пости не знайдені!
            </h1>
        );
    }
    return (
        <div>
            <h1 style={{textAlign: "center"}}>
                {title}
            </h1>
            <TransitionGroup>
                {posts.map(post =>
                    <CSSTransition
                        key={post.id}
                        classNames="post"
                        timeout={500}
                    >
                        <PostItem remove={remove} post={post}/>
                    </CSSTransition>
                )}
            </TransitionGroup>
        </div>
    )
}