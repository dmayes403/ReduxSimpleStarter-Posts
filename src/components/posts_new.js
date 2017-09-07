import React, { Component } from 'react';
// redux-form.com is an excellent source for form info
// use "Field" to wire up specific a field input in the component (it knows all of the event handlers)
import { Field, reduxForm } from 'redux-form';

class PostsNew extends Component {
    renderTitleField(field) {
        return (
            <div>
                <input
                    type="text"
                    // this wires up the event handlers to the between the input and the redux field
                    {...field.input}
                />
            </div>
        );
    }

    render() {
        return(
            <form>
                <Field
                    name="title"
                    component={this.renderTitleField}
                />
            </form>
        )
    }
}

export default reduxForm({
    form: 'PostsNewForm'
})(PostsNew);