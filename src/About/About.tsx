import React, { Component } from 'react';
import './about.css'

class About extends Component {

    render() {
        return (
            <div>
                <h1>ABOUT</h1>
                <h5>Recommendation system that uses Collaborative filtering designed 
                    for managing products of bookstores and libraries</h5>
                <p>This project represents my thesis for my CS degree at University of Bucharest.
                    More details can be found in my thesis.
                </p>
                <p>Contact:
                    <a className={'email'} href="mailto:gabyvlad96@gmail.com">gabyvlad96@gmail.com</a>
                </p>
                <img className={'aboutCover'} src={require('../Images/aboutCover.jpg')} alt='cover'/>
            </div>
        );

    }

}

export default About;
