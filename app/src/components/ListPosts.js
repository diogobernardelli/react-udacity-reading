import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, Divider, IconMenu, IconButton, MenuItem } from 'material-ui';
import ActionThumbUp from 'material-ui/svg-icons/action/thumb-up';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ActionThumbDown from 'material-ui/svg-icons/action/thumb-down';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import EditorInsertInvitation from 'material-ui/svg-icons/editor/insert-invitation';
import EditorModeComment from 'material-ui/svg-icons/editor/mode-comment';
// import { grey400 } from 'material-ui/styles/colors';
import { grey400, red500, green500 } from 'material-ui/styles/colors';
import moment from 'moment';

export const ListPosts = ({ posts, history, handleVotePost, handleEditPost, handleDeletePost }) => {
    const iconMorePostActions = (
        <IconButton
            touch={true}
            tooltip="Ações"
            tooltipPosition="bottom-left">
            <MoreVertIcon color={grey400} />
        </IconButton>
    );
    return (
        <List className="main-list">
            {posts.map(p => (
                <div onClick={() => history.push(`/${p.category}/${p.id}`)} key={p.id}>
                    <ListItem
                        primaryText={
                            <h3>{p.title}</h3>
                        }
                        rightIconButton={
                            <IconMenu iconButtonElement={iconMorePostActions}>
                                <MenuItem
                                    leftIcon={<ActionThumbUp color={green500} />}
                                    onClick={() => handleVotePost(p.id, "upVote")}>Curtir</MenuItem>
                                <MenuItem
                                    leftIcon={<ActionThumbDown color={red500} />}
                                    onClick={() => handleVotePost(p.id, "downVote")}>Descurtir</MenuItem>
                                <MenuItem
                                    leftIcon={<EditorModeEdit />}
                                    onClick={() => handleEditPost(p)}>Editar</MenuItem>
                                <MenuItem
                                    leftIcon={<ActionDelete />}
                                    onClick={() => handleDeletePost(p.id)}>Deletar</MenuItem>
                            </IconMenu>}
                        secondaryText={
                            <p className="post-item">
                                <span style={{ color: '' }}>
                                    Por <strong className="post-author">{p.author}</strong>    
                                    <EditorInsertInvitation className="icon" />
                                    {moment(p.timestamp).format("DD/MM/YY HH:mm")}
                                    <EditorModeComment className="icon" />
                                    {p.totalComments}
                                    <ActionThumbUp className="icon" />
                                    {p.voteScore}
                                    
                                </span>
                                <br />
                                <span className="post-content">
                                    {p.body.substring(0, 100)}
                                </span>
                            </p>
                        }
                        secondaryTextLines={2}
                    />
                    <Divider inset={true} />
                </div>
            ))}
        </List>
    );
}

ListPosts.defaultProps = {
    posts: []
};

ListPosts.propTypes = {
    posts: PropTypes.array.isRequired
};