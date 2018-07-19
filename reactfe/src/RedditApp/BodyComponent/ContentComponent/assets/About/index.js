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
                        <ListGroupItem>Go ahead and create a Subreddit of your own.</ListGroupItem>
                        <ListGroupItem>Subreddit's can cover a variety of topics including news, science, movies, video games, music, books, fitness and food</ListGroupItem>
                        <ListGroupItem>
                            Go ahead and <div className='my-about-link' onClick={()=>this.props.history.push('/create/')}>create your own Subreddit</div>. Have fun!
                        </ListGroupItem>
                    </ListGroup>
                </Jumbotron>
            </center>
        )
    }
}

export default withRouter(About)