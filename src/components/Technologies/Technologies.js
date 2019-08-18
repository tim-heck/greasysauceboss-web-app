import React, { Component } from 'react';
import { connect } from 'react-redux';

class Technologies extends Component {

    render() {
        return (
            <>
                <div className="container merch-list">
                    <h2 className="page-title">Technologies used</h2>
                    <ul className="tech-list">
                        <li>JavaScript</li>
                        <li>React.js</li>
                        <li>Redux</li>
                        <li>Node.js</li>
                        <li>Express.js</li>
                        <li>PostgresSQL</li>
                        <li>Material UI</li>
                        <li>CSS</li>
                    </ul>
                </div>
            </>
        );
    }
}

export default connect()(Technologies);