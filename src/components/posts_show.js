import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions';
import { Link } from 'react-router-dom'; 

class PostsShow extends Component {
    componentDidMount() {
        // if (!this.props.post) {
            const { id } = this.props.match.params;
            console.log(id);
            this.props.fetchPost(id);
        // }
        // ^^ if statement only necessary if very conscious of network traffic
    }

    onDeleteClick() {
        const { id } = this.props.match.params;
        // ^^ this is pulling the post id off of the params
        // this.props.deletePost(this.props.post.id) is an option, but not advised
        this.props.deletePost(id, () => {
            this.props.history.push('/');
        });
    }

    render() {
        const { post } = this.props;

        if (!post) {
            return <div>Loading...</div>
        }

        return (
            <div>
                <Link to="/">Back To Index</Link>
                <button
                    className="btn btn-danger pull-xs-right"
                    onClick={this.onDeleteClick.bind(this)}
                    // onClick is an event handler. The onDeleteClick method must be binded
                >
                    Delete Post
                </button>
                <h3>{post.title}</h3>
                <h6>Categories: {post.categories}</h6>
                <p>{post.content}</p>
            </div>
        );
    }
}

function mapStateToProps({ posts }, ownProps) {
    // ^^^ destructoring happening with 'posts', ownProps is actually getting passed to the component
    return { post: posts[ownProps.match.params.id]};
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
                                        // all of the action creators must be added here