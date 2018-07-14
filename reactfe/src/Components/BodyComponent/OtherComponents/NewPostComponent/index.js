import React, {Component} from 'react'
import {
    Form,
    FormGroup,
    Input,
    Button,
    Col,
} from 'reactstrap'
import {
    withRouter,
} from 'react-router'

class NewPostComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            subreddits: [],
            subreddit_selected: '',
        }
    }

    componentDidMount() {
        fetch('/api/reddit/r/')
        .then(data => data.json())
        .then(json => {
            this.setState({
                subreddits: json,
            })
        })
    }

    handleSubredditSelect(event) {
        this.setState({
            subreddit_selected: event.target.value,
        }, () => 
            this.props.history.push(`/${this.state.subreddit_selected}/new/`)
        )
    }

    render() {
        return (
            <Form>
                <FormGroup row>
                    <Col sm={5}>
                        <Input type="select" onChange={(e) => this.handleSubredditSelect(e)}> 
                            <option key='0'>Select an Option</option>
                            {this.state.subreddits.map((subreddit) => {
                                return (
                                    <option key={subreddit.id}>{'r/' + subreddit.name}</option>
                                )
                            })}
                        </Input>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col>
                        <Input type='text' placeholder='Title' />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col>
                        <Input type='textarea' placeholder='Content' rows='10'/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col>
                        <Button color='primary' block>POST</Button>
                    </Col>
                </FormGroup>
            </Form>
        )
    }
}

export default withRouter(NewPostComponent)