import React, {Component} from 'react'
import {withRouter} from 'react-router'
import Context from '../../../../../provider'
import {
    ButtonGroup,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap'
import './style.css'
import InfoComponent from '../../../InfoComponent'

class Top extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            subs: [],
            subbed: false,
            infoModalOpen: false,
        }
        this.toggleModal = this.toggleModal.bind(this)
    }

    getIds(json) {
        var ls = []
        if (json) {
            for (var i = 0; i < json.length; i++) {
                ls[i] = json[i]['id']
            }
        }
        return ls
    }

    setData(subs, context) {
        this.setState({
            subs: this.getIds(subs)
        }, () => {
            this.setState(prev => ({
                subbed: context.loggedIn ? prev.subs.indexOf(context.userId) !== -1 : false
            }))
        })
    }

    fetchSubredditData(subreddit, context) {
        fetch(`/api/reddit/r/${subreddit}/`)
        .then(data => data.json())
        .then(json => {
            this.setState({
                name: json.name,
                subs: json.subscribers,
            })
        })
        .then(() => {
            this.setData(this.state.subs, context)
        })
    }

    componentDidMount() {
        if (this.props.info === 'subreddit') {
            this.fetchSubredditData(this.props.subreddit, this.props.context)
        }
    }
    
    componentWillReceiveProps(nextProps) {
        if (this.props.info === 'subreddit') {
            this.fetchSubredditData(nextProps.subreddit, nextProps.context)
        }
    }

    toggleSub() {
        var subs = this.state.subs.concat()
        var subbed = false
        var {userId} = this.props.context
        if (subs.indexOf(userId) !== -1) {
            subs.pop(userId)
            subbed = false
        }
        else {
            subs.push(userId)
            subbed = true
        }
        let json = {
            subscribers: subs
        }
        json = JSON.stringify(json)
        fetch(`/api/reddit/r/${this.state.name}/`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('token')}`
            },
            body: json
        })
        .then(response => {
            response.ok ?
                this.setState({
                    subs: subs,
                    subbed: subbed
                })
                :
                console.log(response)
        })
    }

    toggleModal() {
        this.setState(prev => ({
            infoModalOpen: !prev.infoModalOpen
        }))
    }

    render() {
        return (
            <Context.Consumer>
                {context => {
                    return (
                        <ButtonGroup id='my-info-grp' vertical  >
                            {this.props.info !== false &&
                                <React.Fragment>
                                    <Button 
                                        color='info'
                                        onClick={this.toggleModal}
                                        >
                                        <i className="fa fa-info" aria-hidden="true"></i>
                                    </Button>
                                    <Modal 
                                        isOpen={this.state.infoModalOpen}
                                        toggle={this.toggleModal}
                                        className='modal-full'
                                        >
                                        <ModalHeader toggle={this.toggleModal}></ModalHeader>
                                        <ModalBody>
                                            <InfoComponent 
                                                info={this.props.info} 
                                                {...this.props} 
                                                dontshow={true}
                                            />
                                        </ModalBody>
                                        <ModalFooter></ModalFooter>
                                    </Modal>
                                </React.Fragment>
                            }
                            {this.props.showSub &&
                                <Button 
                                    color={this.state.subbed ? 'danger' : 'success'}
                                    onClick={() => {
                                        context.loggedIn ? 
                                            this.toggleSub()
                                            :
                                            context.toggleLoginModal()
                                    }}
                                    >
                                    {this.state.subbed ? 
                                        <i className="fa fa-bell-slash" aria-hidden="true"></i>
                                        :
                                        <i className="fa fa-bell" aria-hidden="true"></i>
                                    }
                                </Button>
                            }
                        </ButtonGroup>       
                    )
                }}
            </Context.Consumer>
        )
    }
}

export default withRouter(Top)