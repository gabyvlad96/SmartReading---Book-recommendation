import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './home.css';



class Home extends Component<{isUserLogged: boolean},{}> {

    render() {
        return (
            <div >
                <img className={'cover'} src={require('../Images/cover2.jpg')} alt='cover'/>
                <div className={'title'}>BOOK RECOMMENDER</div>
                <p className={'text'}>
                    SmartReading is an online software that <br/> helps 
                    you choosing books <br/> based on your preferences.
                </p>
                <Link className={'startLink'} to={this.props.isUserLogged? '/profile' : '/login'}>START NOW</Link>
                <h2 className={'firstH2'}>SMARTREADING MAKES PICKING BOOKS SIMPLE</h2>

                <div className={'secondHalf'}>
                    <div className={'container'}>
                        <div className={'card1'}>
                            <img className={'card1Logo'} src={require('../Images/card1Logo.jpg')} alt='img1'/>
                            <h6 className={'card1Title'}>EXPLORE THOUSANDS OF BOOKS</h6>
                            <p>
                                Start your journey by discovering a great archive 
                                that contains over 200 thousands books from different genres. 
                                Some of them are popular, other are ready to be discovered.
                            </p>
                        </div>
                        <div className={'card2'}>
                            <img className={'card2Logo'} src={require('../Images/card2Logo.jpg')} alt='img2'/>
                            <h6 className={'card2Title'}>COLLABORATIVE FILTERING</h6>
                            <p>
                                Use the power of Artificial Intelligence and it's 
                                most popular algorithms to get recommendations based on your likings.
                            </p>
                        </div>
                    </div>
                    <div className={'secondContainer'}>
                        <div className={'content'}>
                            { !this.props.isUserLogged &&
                                <h2 className={'h2_2'}>Ready to get started?</h2>
                            }
                                <h2 className={'h2_3'}>{
                                    !this.props.isUserLogged? 'Learn more or create an account.' : 'Learn more about this project'
                                }</h2>
                        </div>
                        <div className={'buttons'}>
                            { !this.props.isUserLogged &&
                                <Link className={'btn1'} to="/login">CREATE ACCOUNT</Link>
                            }
                            <Link className={'btn2'} to="/about">LEARN MORE</Link>
                        </div>
                    </div>

                    <div className={'footer'}>
                        <div className={'footerRow'}>
                            <p>DEVELOPER</p>
                            <p>Vlad Gabriel</p>
                        </div>
                        <div className={'footerRow'}>
                            <p>RESOURCES</p>
                            <p>About</p>
                        </div>
                        <div className={'footerRow'}>
                            <p>CONTACT</p>
                            <a href="mailto:gabyvlad96@gmail.com">gabyvlad96@gmail.com</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
