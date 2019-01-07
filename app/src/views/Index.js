import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import sortBy from 'sort-by';

import {
  openDialogPost
} from '../actions/posts';

import {
  changeCategory,
  listCategories
} from '../actions/categories';

import {
  changeSort,
  listPosts,
  postEdit,
  postRemove,
  postVote
} from '../actions/posts';

import PostForm from './PostForm';
import { ListPosts, NavTop, Loader} from '../components';

class Index extends Component {

  componentDidMount() {
    this.props.listCategories();
    this.props.changeCategory("all");
  }

  render() {
    let { history, posts, categories, categorySelected, sortSelected, loading } = this.props;
    return (
      <div>
        {!loading ? (
          <Loader />
        ) : (
          <div>
            <NavTop title="React Udacity Leitura"
              history={history}
              categories={categories}
              categorySelected={categorySelected}
              sortSelected={sortSelected}
              handleChangeCategory={this.props.changeCategory}
              handleChangeSort={this.props.changeSort} />
            <ListPosts
              posts={posts}
              history={history}
              handleVotePost={this.props.postVote}
              handleEditPost={this.props.postEdit}
              handleDeletePost={this.props.postRemove} />
            <PostForm />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    loading: state.RootReducer.loading,
    categorySelected: state.RootReducer.categorySelected,
    sortSelected: state.RootReducer.sortSelected,
    categories: state.RootReducer.categories,
    posts: (state.RootReducer.categorySelected !== 'all') ? state.RootReducer.posts.filter(p => !p.deleted && p.category === state.RootReducer.categorySelected) : state.RootReducer.posts.filter(p => !p.deleted)
      .sort(sortBy(state.RootReducer.sortSelected)),
    openDialogState: state.RootReducer.openDialogState
  }
);

export default withRouter(connect(mapStateToProps, {
  changeCategory,
  changeSort,
  listCategories,
  listPosts,
  openDialogPost,
  postVote,
  postEdit,
  postRemove
})(Index));
