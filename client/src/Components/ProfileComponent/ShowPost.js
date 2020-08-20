import React,{useEffect} from "react";
import Modal from "./modal";
import {connect} from "react-redux";
import {getPost} from "../../Actions";

import "./showPost.style.scss";

const PostModal = ({match,getPost,post,history,name}) => {
    const {id} = match.params;
    useEffect(() => {
        getPost(id);
    }, []);

    if(!post) {
        return(
            <div className="ui active inverted dimmer">
                <div className="ui text loader">Loading</div>
            </div>
        );
    }
    const {description,comments,likes,date} = post;
    
    const onDismiss = ()=> {
        history.push(`/profile/${post.profile_id._id}`);
    }
    const returnPost = () => {
        // console.log(description);
        return  (
        <div className="scrolling content">
                    <div id="description">
                        <p>{description}</p>
                    </div>
        </div>
        );    
    }

    const renderActions = () => {
        return <div className="actions">
            <div className="info">
                <span className="info__likes" >{!likes? null :likes.length} Likes</span>
                <span className="info__comments" >{!comments ? null:comments.length} Comments</span>
            </div>
            <div className="post--actions">
                <span className="post--actions__like" >
                    <i className="thumbs up outline icon"></i>
                    Like
                </span>
                <span className="post-actions__comment" >
                    <i className="comment outline icon"></i>
                    Comment
                </span>
            </div>

        </div>
    }
    
    return (
        <Modal 
            header = {`${name} Post`}
            content={returnPost()}
            actions = {renderActions()} 
            onDismiss={onDismiss}
        />
    );
    }


const mapStateToProps = (state)=> {
    const name = `${state.Profile.f_name} ${state.Profile.l_name}`;
    return {post:state.post,name};
}

export default connect(mapStateToProps,{getPost})(PostModal);
