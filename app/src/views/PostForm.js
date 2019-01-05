import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Dialog, FlatButton, TextField, FloatingActionButton } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { Categories } from '../components';
import { openDialogPost } from '../actions/posts';
import { postHandleChange,
    postChangeCategory,
    postFormSave,
    postFormCancel
} from '../actions/posts';


class PostForm extends Component {

    render() {
        let { PostModel, fieldsErros, openDialogState } = this.props;
        const actions = [
            <FlatButton
                label="Cancelar"
                primary={false}
                onClick={() => this.props.postFormCancel()}
            />,
            <FlatButton
                label="Salvar"
                primary={true}
                keyboardFocused={true}
                onClick={() => this.props.postFormSave(PostModel)}
            />,
        ];

        return (
            <div>
                <FloatingActionButton
                    className="fab-style"
                    onClick={() => this.props.openDialogPost(true)}>
                    <ContentAdd />
                </FloatingActionButton>
                <Dialog
                    title={!PostModel.id ? "Nova Postagem" : "Editar Postagem"}
                    actions={actions}
                    modal={true}
                    open={openDialogState}
                    onRequestClose={() => this.props.openDialogPost(false)}
                    autoScrollBodyContent={true}>
                    <div>
                        <TextField
                            name="title"
                            hintText="Título da Postagem"
                            floatingLabelText="Título"
                            floatingLabelFixed={true}
                            fullWidth={true}
                            maxLength="60"
                            value={PostModel.title}
                            errorText={fieldsErros.find((text) => text === "title") ? "Este campo é obrigatório" : ""}
                            onChange={this.props.postHandleChange}
                        /><br />
                        <TextField
                            name="body"
                            hintText="Conteúdo da Postagem"
                            floatingLabelText="Mensagem"
                            floatingLabelFixed={true}
                            multiLine={true}
                            fullWidth={true}
                            errorText={fieldsErros.find((text) => text === "body") ? "Este campo é obrigatório" : ""}
                            value={PostModel.body}
                            onChange={this.props.postHandleChange}
                        /><br />
                        <TextField
                            name="author"
                            hintText="Quem é você?"
                            floatingLabelText="Autor"
                            floatingLabelFixed={true}
                            fullWidth={true}
                            value={PostModel.author}
                            errorText={fieldsErros.find((text) => text === "author") ? "Este campo é obrigatório" : ""}
                            onChange={this.props.postHandleChange}
                        /><br />
                        <Categories
                            name="category"
                            categories={this.props.categories}
                            floatingLabelText="Categorias"
                            categorySelected={PostModel.category}
                            errorText={fieldsErros.find((text) => text === "category") ? "Este campo é obrigatório" : ""}
                            handleChange={this.props.postChangeCategory}
                        /><br />
                    </div>
                </Dialog>
            </div>
        )
    }
}

const mapStateToProps = state => (
    {
        openDialogState: state.RootReducer.openDialogState,
        categories: state.RootReducer.categories,
        PostModel: state.PostReducer.PostModel,
        fieldsErros: state.PostReducer.fieldsErros
    }
);

export default withRouter(connect(mapStateToProps, {
    openDialogPost,
    postHandleChange,
    postChangeCategory,
    postFormSave,
    postFormCancel
})(PostForm));