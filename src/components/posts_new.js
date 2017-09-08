import React, { Component } from 'react';
// redux-form.com is an excellent source for form info
// use "Field" to wire up specific a field input in the component (it knows all of the event handlers)
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
    renderField(field) {
        // const { meta } = field; // pulling meta off of field by destructuring/refactoring - it would typically look like 'field.meta.touched or field.meta.error'
        const { meta: { touched, error } } = field; // pulling meta.touched and meta.error off of field by destructuring/refactoring - it would typically look like 'field.meta.touched or field.meta.error'
        const className = `form-group ${touched && error ? 'has-danger' : ''}`

        return (
            // using className variable created above
            <div className={className}>
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type="text"
                    // this wires up the event handlers to the between the input and the redux field
                    {...field.input}
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
                {/* this displays the errors */}
            </div>
        );
    }

    onSubmit(values) {
        console.log(values);
        this.props.createPost(values, () => {
            this.props.history.push('/');
        });
    }

    render() {
        // this is pulling handleSubmit off of props;
        const { handleSubmit } = this.props;

        return(
            // if form is valid, handleSubmit will call onSubmit
            // use .bind to ensure we can use "this" to refer to "this" inside the component
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Title"
                    name="title"
                    component={this.renderField}
                />
                <Field
                    label="Categories"
                    name="categories"
                    component={this.renderField}
                />
                <Field
                    label="Post Content"
                    name="content"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        )
    }
}

function validate(values) {
    // input fields are pristine, touched, or invalid
    // Console.log(values) -> { title: 'asdf', categories: 'asdf', content: 'asdf' }
    const errors = {};

    // Validate the inputs from 'values'
    if (!values.title) {
        errors.title = "Enter a title!";
    }

    if (!values.categories) {
        errors.categories = "Enter some categories";
    }

    if (!values.content) {
        errors.content = "Enter some content please";
    }

    // If errors is empty, the form is fine to submit.
    // If errors has *any* properties, redux form assumes form is invalid.
    return errors;
}

export default reduxForm({
    validate, // equal to validate:validate
    form: 'PostsNewForm'
})(
    connect(null, { createPost })(PostsNew)
    // this is chaining multiple helpers together. The actions are always the second parameter of the connect function (state is first)
);