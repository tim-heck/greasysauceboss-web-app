import React, { Component } from 'react';
import { connect } from 'react-redux';

class BandPage extends Component {

    render() {
        return (
            <>
                <div>
                    <h2>GreasySauceBoss</h2>
                    <p>BIO: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse 
                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat 
                        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
                <ul>
                    <li>
                        <img height="400" src="images/tim-bio.png" alt="Tim Heck head shot" />
                        <p>Tim Heck is one of the founding memebers of GreasySauceBoss who is 
                            currently the lead vocalist and rhythm guitarist. Growing up in 
                            Burnsville, MN, Minnesota has always been home for him.
                            He starting playing guitar at the age of 13 and took lessons until
                            he went to college at 18. Continuing to play on his own and learn
                            any acoustic song on he fell in love with.</p>
                    </li>
                    <li>
                        <img height="400" src="images/kyle-bio.png" alt="Kyle Larsen head shot" />
                        <p>Kyle Larsen is one of the founding members of GreasySauceBoss who 
                            currently plays bass and rhythm guitar for the band. He grew up 
                            in Fox River Grove, Illinois, a suburb about 45 minutes Northwest 
                            of Chicago.<br/> 
                            Beginning guitar lessons at the age of 12, the instrument really 
                            didn’t become a passion until the age of 20. Enamored by the pop 
                            punk sound of the 2000s, Kyle was never able to pinpoint the genre 
                            until he met Tim in the spring of 2016. Beginning to write little 
                            pop punk riffs in his college dorm room, he and Tim began to 
                            formulate what has become GreasySauceBoss.<br/> 
                            Kyle is the member who decided the band would be named GreasySauceBoss. 
                            After thinking Tim’s gamer name was too funny to pass up for a band name, 
                            Kyle wrote the name “GreasySauceBoss” in their song notebook and underlined 
                            it stating “it’s done”.</p>
                    </li>
                </ul>
            </>
        );
    }
}

export default connect()(BandPage);