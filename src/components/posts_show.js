import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost } from '../actions';

class PostsShow extends Component {
    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchPost();
    }

    render() {
        return (
            <div>
                Posts Show!
            </div>
        );
    }
}

function mapStateToProps({ posts }, ownProps) {
    // ^^^ destructoring happening with 'posts', ownProps is actually getting passed to the component
    return { post: posts[ownProps.match.params.id]};
}

export default connect(mapStateToProps, { fetchPost })(PostsShow);