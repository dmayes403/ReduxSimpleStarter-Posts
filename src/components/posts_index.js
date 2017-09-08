import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';
// link is nearly identical to an 'a link tag'
import { Link } from 'react-router-dom';
import _ from 'lodash';

class PostsIndex extends Component {
    // we're fetching posts in componentDidMount, because the fetchPosts method will be called automatically
    // instead of having to be clicked later on.
    componentDidMount() {
        this.props.fetchPosts();
    }

    renderPosts() {
        return _.map(this.props.posts, post => {
            return (
                <li className="list-group-item" key={post.id}>
                    <Link to={`posts/${post.id}`}> 
                        {post.title}
                    </Link>
                </li>
            )
        })
    }

    render() {
        return (
            <div>
                <div className="text-xs-right">
                    <Link className="btn btn-primary" to="/posts/new">
                        Add a Post
                    </Link>
                </div>
                <h3>Posts</h3>
                <ul className="list-group">
                    {this.renderPosts()}
                </ul>
            </div>
        )
    }
}

// this is needed anytime a component needs to consume the application state
function mapStateToProps(state) {
    return { posts: state.posts };
}

// this is equal to mapDispatchToProps - 9-27(1:40)
export default connect(mapStateToProps, { fetchPosts })(PostsIndex);