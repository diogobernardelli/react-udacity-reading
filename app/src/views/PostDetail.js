import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import {
    getAllCommentsByPostId,
    postDetailOpenDialogComment,
    postDetailCommentRemove,
    postDetailCommentEdit,
    postDetailCommentVote
} from '../actions/comments';

import {
    postEdit,
    postRemove,
    postVote,
    getPostDetail
} from '../actions/posts';

import moment from 'moment';
import { AppBar,
    IconButton,
    FloatingActionButton
} from 'material-ui';
import { Link } from 'react-router-dom';
import ActionThumbUp from 'material-ui/svg-icons/action/thumb-up';
import ActionThumbDown from 'material-ui/svg-icons/action/thumb-down';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import HardwareKeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import EditorModeComment from 'material-ui/svg-icons/editor/mode-comment';
import { Commentary } from '../components';
import PostForm from './PostForm';
import CommentForm from './CommentForm';

class PostDetail extends Component {

    componentDidMount() {
        let { PostModel, history } = this.props;
        let postId = this.props.match.params.postId;
        this.props.getPostDetail(postId, this.props.history);
        this.props.getAllCommentsByPostId(postId);
        
        if (PostModel.error !== undefined) {
            alert("Desculpe, essa postagem não foi encontrada.");
            history.push("/");
        }
    }

    render() {
        let { PostModel, comments } = this.props;
        let { title, body, author, voteScore, timestamp } = PostModel;
        return (<div>
            <AppBar
                className="appbar details"
                title={
                    <div className="title">
                        <h1>{title}</h1>
                        <h2>Por <strong>{author}</strong></h2>
                    </div>
                }
                iconElementLeft={
                <Link to="/">
                    <IconButton><HardwareKeyboardArrowLeft /></IconButton>
                </Link>}
            />
            <div className="main-list">
                <div id="content">{body}</div>
                <br />
                <small>Publicado em {moment(timestamp).format("DD/MM/YY HH:mm")}</small><br />
                <div className="post-actions">
                    <div
                        role="button"
                        onClick={() => this.props.postEdit(PostModel)}
                    >
                        <EditorModeEdit className="icon" /> editar
                    </div>
                    <div
                        role="button"
                        onClick={() => this.props.postRemove(PostModel.id, this.props.history)}
                    >
                        <ActionDelete className="icon" /> excluir
                    </div>
                </div>
                <ActionThumbUp
                    className="like-icon"
                    onClick={() => this.props.postVote(PostModel.id, "upVote")}
                /> 
                <ActionThumbDown
                    className="dislike-icon"
                    onClick={() => this.props.postVote(PostModel.id, "downVote")}
                /> 
                {voteScore}
                
                <div id="comments">
                    <h2>
                        {comments.length === 1 ? `${comments.length} Comentário` : `${comments.length} Comentários`}
                    </h2>
                    {comments.map(c => (<Commentary
                        key={c.id}
                        CommentModel={c}
                        handleVoteComment={this.props.postDetailCommentVote}
                        handleEditComment={this.props.postDetailCommentEdit}
                        handleRemoveComment={this.props.postDetailCommentRemove} />))}
                </div>
            </div>
            <PostForm fab={false} />
            <CommentForm />

            <FloatingActionButton
                className="fab-style"
                onClick={() => this.props.postDetailOpenDialogComment(true)} >
                <EditorModeComment />
            </FloatingActionButton>
        </div>)
    }
}

const mapStateToProps = state => (
    {
        PostModel: state.PostDetailReducer.PostModel,
        comments: state.PostDetailReducer.comments
    }
);

export default withRouter(connect(mapStateToProps, {
    getPostDetail,
    getAllCommentsByPostId,
    postDetailOpenDialogComment,
    postDetailCommentRemove,
    postEdit,
    postRemove,
    postVote,
    postDetailCommentEdit,
    postDetailCommentVote
})(PostDetail));