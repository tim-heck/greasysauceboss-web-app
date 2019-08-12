import React, { Component } from 'react';
import { connect } from 'react-redux';
import './BandPage.css';

class BandPage extends Component {

    render() {
        return (
            <>
                <div className="container band-page">
                    <h2 className="page-title">GreasySauceBoss</h2>
                    <p className="band-bio">We're a couple of kids from the midwest that
                    decided to start a band in the summer of 2017. Our intention was to share
                    our passion for pop-punk music with anyone who wants to listen. We do not
                    claim to be good and were not doing this for money or fame. We are simply
                    artists trying to have a dope time creating some greasy content and hope
                    to bring some enjoyment to people who listen.</p>
                    <ul>
                        <li className='band-member'>
                            <img height="400" src="images/tim-bio.png" alt="Tim Heck head shot" />
                            <p>Tim Heck is one of the founding members of GreasySauceBoss who is
                                currently the lead vocalist and rhythm guitarist. Growing up in
                                Burnsville, MN, about 30 minutes south of the Twin Cities, Minnesota 
                                has always been home for him.
                                <br /><br />
                                He starting playing guitar at the age of 13 and took lessons until
                                he went to college at 19. Continuing to play on his own and learn
                                any acoustic song he fell in love with. It wasn't until he met Kyle
                                that a band started to form and a desire to write his own songs.
                                <br /><br />
                                The name GreasySauceBoss comes from Tim's online gaming name, which 
                                has a whole other origin story of it's own. 
                            </p>
                        </li>
                        <li className='band-member'>
                            <img height="400" src="images/kyle-bio.png" alt="Kyle Larsen head shot" />
                            <p>Kyle Larsen is one of the founding members of GreasySauceBoss who
                                currently plays bass and rhythm guitar for the band. He grew up
                                in Fox River Grove, Illinois, a suburb about 45 minutes Northwest
                                of Chicago.
                                <br /><br />
                                Beginning guitar lessons at the age of 12, the instrument really
                                didn’t become a passion until the age of 20. Enamored by the pop
                                punk sound of the 2000s, Kyle was never able to pinpoint the genre
                                until he met Tim in the spring of 2016. Beginning to write little
                                pop punk riffs in his college dorm room, he and Tim began to
                                formulate what has become GreasySauceBoss.
                                <br /><br />
                                Kyle is the member who decided the band would be named GreasySauceBoss.
                                After thinking Tim’s gamer name was too funny to pass up for a band name,
                                Kyle wrote the name “GreasySauceBoss” in their song notebook and underlined
                                it stating “it’s done”.
                            </p>
                        </li>
                    </ul>
                </div>
            </>
        );
    }
}

export default connect()(BandPage);