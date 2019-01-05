import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Dialog, FlatButton, TextField } from 'material-ui';
import { postDetailOpenDialogComment,
    postDetailCommentSave,
    postDetailGetComment,
    commentHandleChange
} from '../actions/comments';

class CommentForm extends Component {
    render() {
        let { PostModel, CommentModel, fieldsErros, openDialogState } = this.props;
        const actions = [
            <FlatButton
                label="Cancelar"
                primary={false}
                onClick={() => this.props.postDetailOpenDialogComment(false)}
            />,
            <FlatButton
                label="Salvar"
                primary={true}
                keyboardFocused={true}
                onClick={() => this.props.postDetailCommentSave(CommentModel, PostModel.id)}
            />,
        ];
        return (
            <Dialog
                title={!CommentModel.id ? "Novo Comentário" : "Editar Comentário"}
                actions={actions}
                modal={true}
                open={openDialogState}
                onRequestClose={() => this.props.postDetailOpenDialogComment(false)}
                autoScrollBodyContent={true}>
                <TextField
                    name="body"
                    hintText="Conteúdo do comentário"
                    floatingLabelText="Mensagem"
                    floatingLabelFixed={true}
                    multiLine={true}
                    fullWidth={true}
                    errorText={fieldsErros.find((text) => text === "body") ? "Este campo é obrigatório" : ""}
                    value={CommentModel.body}
                    onChange={this.props.commentHandleChange}
                /><br />
                <TextField
                    name="author"
                    hintText="Quem é você?"
                    floatingLabelText="Autor"
                    floatingLabelFixed={true}
                    fullWidth={true}
                    value={CommentModel.author}
                    errorText={fieldsErros.find((text) => text === "author") ? "Este campo é obrigatório" : ""}
                    onChange={this.props.commentHandleChange}
                /><br />
            </Dialog>
        );
    }
}

const mapStateToProps = state => ({
    PostModel: state.PostDetailReducer.PostModel,
    CommentModel: state.PostDetailReducer.CommentModel,
    fieldsErros: state.PostDetailReducer.fieldsErros,
    openDialogState: state.PostDetailReducer.openDialogState
});

export default withRouter(connect(mapStateToProps, {
    postDetailOpenDialogComment,
    postDetailCommentSave,
    postDetailGetComment,
    commentHandleChange
})(CommentForm));