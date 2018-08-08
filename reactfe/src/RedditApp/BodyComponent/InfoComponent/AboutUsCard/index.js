import React, {Component} from 'react'
import {
    withRouter
} from 'react-router'
import {
    Card,
    CardBody,
    CardText
} from 'reactstrap'
import './style.css'

class AboutUsCard extends Component {
    render() {
        return (
            <Card className='text-center'>
                <CardBody>
                    <CardText>
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
                        |
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
                    </CardText>
                    <CardText>
                        <div className='blockquote'>
                            Code and design credits
                            <footer className='blockquote-footer'>Sreekar Mouli</footer>  
                        </div>
                    </CardText>
                </CardBody>
            </Card>
        )
    }
}

export default withRouter(AboutUsCard)