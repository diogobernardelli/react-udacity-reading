import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, Divider, IconButton } from 'material-ui';
import ActionThumbUp from 'material-ui/svg-icons/action/thumb-up';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import EditorInsertInvitation from 'material-ui/svg-icons/editor/insert-invitation';
import EditorModeComment from 'material-ui/svg-icons/editor/mode-comment';
import { grey400 } from 'material-ui/styles/colors';
import moment from 'moment';

export const ListPosts = ({ posts, history }) => {
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