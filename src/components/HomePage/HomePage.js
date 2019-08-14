import React, { Component } from 'react';
import { connect } from 'react-redux';

import './HomePage.css';

class HomePage extends Component {

    /**
     * Method runs when the component is ready
     * The snippet activates on an mouseover event triggering on the home-page element
     * it then does some math to move the background based on the mouse position
     */
    // componentDidMount() {
    //     document.getElementById('home-page').addEventListener('mousemove', function (event) {
    //         let translateX = -((event.pageX - 600) * 0.15);
    //         let translateY = -((event.pageY - 600) * 0.15);
    //         document.getElementById('block').style.transform = "translate(" + translateX + "px, " + translateY + "px)"
    //     })
    // }

    render() {
        return (
            <>
                <div id="home-page">
                    <div className="youtube-embed">
                        <div className="youtube-card">
                            <h2>Latest Video</h2>
                            <iframe
                                width="560" height="315"
                                src="https://www.youtube.com/embed/Rl66Yq-rUHA"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                title="Lastest Video">
                            </iframe>
                        </div>
                    </div>
                    <div id="block" className="flex-container-home">
                        <div className="flex-row-home">
                            <div className="flex-item">G</div>
                            <div className="flex-item">R</div>
                            <div className="flex-item">E</div>
                            <div className="flex-item">A</div>
                            <div className="flex-item">S</div>
                        </div>
                        <div className="flex-row-home">
                            <div className="flex-item">Y</div>
                            <div className="flex-item">S</div>
                            <div className="flex-item">A</div>
                            <div className="flex-item">U</div>
                            <div className="flex-item">C</div>
                        </div>
                        <div className="flex-row-home">
                            <div className="flex-item">E</div>
                            <div className="flex-item">B</div>
                            <div className="flex-item">O</div>
                            <div className="flex-item">S</div>
                            <div className="flex-item">S</div>
                        </div>
                        <div className="flex-row-home">
                            <div className="flex-item">M</div>
                            <div className="flex-item">M</div>
                            <div className="flex-item">X</div>
                            <div className="flex-item">V</div>
                            <div className="flex-item">I</div>
                            <div className="flex-item">I</div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default connect()(HomePage);