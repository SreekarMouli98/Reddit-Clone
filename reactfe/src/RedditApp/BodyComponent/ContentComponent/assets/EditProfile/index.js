import React, {Component} from 'react'
import {
    Form,
    FormGroup,
    Label,
    Input,
    FormText,
    Button,
    Col
} from 'reactstrap'

export default class EditProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {user: '', profile: ''}
    }

    componentDidMount() {
        fetch(`/api/reddit/u/${this.props.user}/`)
        .then(data => data.json())
        .then(json => {
            this.setState({
                profile: json,
                user: json.user,
            })
        })
    }

    render() {
        return (
            <React.Fragment>
                <Form>
                    <FormGroup row>
                        <Label sm={3}>First Name</Label>
                        <Col sm={9}>
                            <Input type="text" value={this.state.user.first_name || ''} />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={3}>Last Name</Label>
                        <Col sm={9}>
                            <Input type="text" value={this.state.user.last_name || ''} />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={3}>Email</Label>
                        <Col sm={9}>
                            <Input type="email" value={this.state.user.email || ''} />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={3}>Username</Label>
                        <Col sm={9}>
                            <Input type='text' value={this.state.profile.username || ''} />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={3}>Password</Label>
                        <Col sm={9}>
                            <Input type="password" placeholder="Enter new password" />
                        </Col>
                    </FormGroup>
                    {/* <FormGroup row>
                        <Label for="exampleFile" sm={2}>File</Label>
                        <Col sm={10}>
                            <Input type="file" name="file" id="exampleFile" />
                            <FormText color="muted">
                            This is some placeholder block-level help text for the above input.
                            It's a bit lighter and easily wraps to a new line.
                            </FormText>
                        </Col>
                    </FormGroup> */}
                    <FormGroup check row>
                        <Button color='primary' block>UPDATE</Button>
                    </FormGroup>
                </Form>
            </React.Fragment>
        )
    }
}