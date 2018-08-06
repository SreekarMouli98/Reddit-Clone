import React, {Component} from 'react'
import {
    withRouter
} from 'react-router'
import {
    Form,
    InputGroup,
    Input,
    Button
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
            this.props.history.push(`/search/${this.state.keyword}/`)
            this.setState({
                keyword: ''
            })
            this.props.callback_function()
        }
    }

    render() {
        return (
            <Form
                onSubmit={this.handleSubmit}
                >   
                <InputGroup>
                    <Input
                        id='search-keyword'
                        type='text'
                        name='keyword'
                        placeholder='Seach Reddit'
                        value={this.state.keyword}
                        onChange={this.handleChange}
                    />
                    {this.props.btn && <Button color='info'>SEARCH</Button>}
                </InputGroup>
            </Form>
        )
    }
}

export default withRouter(Search)