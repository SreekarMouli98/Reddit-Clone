import React, {Component} from 'react'
import {
    withRouter
} from 'react-router'
import {
    Form,
    Input
} from 'reactstrap'

class Search extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            keyword: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        if (this.state.keyword.length !== 0) {
            document.getElementById('search-keyword').value = ''
            this.props.history.push(`/search/${this.state.keyword}/`)
        }
    }

    render() {
        return (
            <Form
                onSubmit={this.handleSubmit}
                >   
                <Input
                    id='search-keyword'
                    type='text'
                    name='keyword'
                    placeholder='Seach Reddit'
                    onChange={this.handleChange}
                />
            </Form>
        )
    }
}

export default withRouter(Search)