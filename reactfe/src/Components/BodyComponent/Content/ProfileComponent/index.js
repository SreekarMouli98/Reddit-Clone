import React, {Component} from 'react'
import Context from '../../../provider'
import {
    Card,
    CardTitle,
    CardImg,
    CardBody,
    CardText,
} from 'reactstrap'

export default class ProfileComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {user: '', owner: ''}
    }

    componentDidMount() {
        fetch(`/api/reddit/u/${this.props.username}/`)
        .then(data => data.json())
        .then((data) => {
            this.setState({
                user: data,
                owner: data.owner,
            })
            console.log(this.state)
        })
    }

    render() {
        return (
            <Context.Consumer>
                {context => {
                    return (
                        <React.Fragment>
                            <Card className='text-center'>
                                <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                                <CardTitle>{this.state.user.username}'s profile</CardTitle>
                                <CardBody>
                                    <CardText><b>Name:</b> {this.state.owner.first_name} {this.state.owner.last_name}</CardText>
                                    <CardText><b>D.O.B:</b> {this.state.user.dob}</CardText>
                                    <CardText><b>Karma:</b> {this.state.user.karma}</CardText>
                                </CardBody>
                            </Card>
                        </React.Fragment>
                    )
                }}
            </Context.Consumer>
        )
    }
}