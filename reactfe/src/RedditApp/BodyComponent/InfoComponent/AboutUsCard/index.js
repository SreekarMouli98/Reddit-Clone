import React, {Component} from 'react'
import {
    withRouter
} from 'react-router'
import {
    Card,
    CardBody,
} from 'reactstrap'
import './style.css'

class AboutUsCard extends Component {
    render() {
        return (
            <Card>
                <CardBody>
                    <div className='blockquote'>
                        A Reddit Clone
                        <footer className='blockquote-footer'>by Sreekar Mouli. T</footer>
                    </div>
                    <a 
                        href='/'
                        className='padding-all'
                        onClick={(event)=>{
                            event.preventDefault()
                            this.props.history.push('/about/')
                        }}
                    >
                        About
                    </a>
                    <a 
                        href='#'
                        className='padding-all striked-text'
                        onClick={(event) => {
                            event.preventDefault()
                            this.props.history.push('/blog/')
                        }}
                    >
                        Blog
                    </a>
                    <a 
                        href='#'
                        className='padding-all'
                        onClick={(event)=>{
                            event.preventDefault()
                            this.props.history.push('/help/')
                        }}
                    >
                        Help
                    </a>
                </CardBody>
            </Card>
        )
    }
}

export default withRouter(AboutUsCard)