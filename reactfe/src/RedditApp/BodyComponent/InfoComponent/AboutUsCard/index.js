import React, {Component} from 'react'
import {
    Card,
    CardBody,
    CardLink,
} from 'reactstrap'
import './style.css'

export default class AboutUsCard extends Component {
    render() {
        return (
            <Card>
                <CardBody>
                    <div className='blockquote'>
                        A Reddit Clone
                        <footer className='blockquote-footer'>by Sreekar Mouli. T</footer>
                    </div>
                    <CardLink className='my-links' href='/about/'>About</CardLink>
                    <CardLink className='my-links'> Blog</CardLink>
                    <CardLink className='my-links' href='/help/'>Help</CardLink>
                </CardBody>
            </Card>
        )
    }
}