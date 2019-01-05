import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import ActionThumbUp from 'material-ui/svg-icons/action/thumb-up';
import ActionThumbDown from 'material-ui/svg-icons/action/thumb-down';
import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import { red400, teal400, blueGrey600 } from 'material-ui/styles/colors';
import moment from 'moment';

export const Commentary = ({ CommentModel, handleEditComment, handleRemoveComment, handleVoteComment }) => (
    <div>
        <ActionAccountCircle 
            className="user-style" 
            color={blueGrey600}
        />
        <strong>{CommentModel.author},</strong>
        <p>{CommentModel.body}</p>
        <small>
            Votos: {CommentModel.voteScore}<br />
            <i>Comentado em {moment(CommentModel.timestamp).format("DD/MM/YY HH:mm")}</i>
        </small>
        <div className="comment">
            <IconButton
                touch={true}
                tooltip="Gostei"
                onClick={() => handleVoteComment(CommentModel.id, "upVote")}>
                <ActionThumbUp color={teal400} />
            </IconButton>
            <IconButton
                touch={true}
                tooltip="Não Gostei"
                onClick={() => handleVoteComment(CommentModel.id, "downVote")}>
                <ActionThumbDown color={red400} />
            </IconButton>
            <IconButton touch={true}
                tooltip="Editar Comentário"
                onClick={() => handleEditComment(CommentModel.id)}>
                <EditorModeEdit />
            </IconButton>
            <IconButton touch={true}
                tooltip="Apagar Comentário"
                onClick={() => handleRemoveComment(CommentModel.id)}>
                <ActionDelete />
            </IconButton>
        </div>
    </div>
);

Commentary.defaultProps = {
    CommentModel: {}
};

Commentary.propTypes = {
    CommentModel: PropTypes.object.isRequired,
    handleEditComment: PropTypes.func.isRequired,
    handleRemoveComment: PropTypes.func.isRequired,
    handleVoteComment: PropTypes.func.isRequired
};