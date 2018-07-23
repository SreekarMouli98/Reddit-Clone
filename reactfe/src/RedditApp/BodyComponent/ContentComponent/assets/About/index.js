import React, {Component} from 'react'
import {
    withRouter
} from 'react-router'
import {
    Jumbotron,
    ListGroup,
    ListGroupItem
} from 'reactstrap'

class About extends Component {
    render() {
        return (
            <center>
                <div className='blockquote'>
                    <h1 className='display-1'>A Reddit Clone</h1>
                    <footer className='blockquote-footer'>by Sreekar Mouli. T</footer>
                </div>
                <Jumbotron>
                    <ListGroup>
                        <ListGroupItem>Reddit is an area where you share your thoughts and opinions on a particular topic</ListGroupItem>
                        <ListGroupItem>Subreddit's can cover a variety of topics including news, science, movies, video games, music, books, fitness and food</ListGroupItem>
                        <ListGroupItem>
                            {'Go ahead and '}
                            <a 
                                href='#' 
                                className='black-text black-text-on-hover cursor-on-hover' 
                                onClick={(event)=> {
                                    event.preventDefault()
                                    this.props.history.push('/create/')
                                }}
                                >
                                create your own Subreddit
                            </a>
                            . Have fun! 
                        </ListGroupItem>
                    </ListGroup>
                </Jumbotron>
            </center>
        )
    }
}

export default withRouter(About)