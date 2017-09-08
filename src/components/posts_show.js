import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost } from '../actions';
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

    render() {
        const { post } = this.props;

        if (!post) {
            return <div>Loading...</div>
        }

        return (
            <div>
                <Link to="/">Back To Index</Link>
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

export default connect(mapStateToProps, { fetchPost })(PostsShow);