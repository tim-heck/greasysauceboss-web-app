import React, { Component } from 'react';
import { connect } from 'react-redux';

class ReleasesPage extends Component {

    render() {
        return (
            <>
                <div>
                    <h2>Releases</h2>
                    <iframe
                        src="https://open.spotify.com/embed/album/521URcTwYdxlTn44JEUwGR"
                        width="300" height="380" frameborder="0" allowtransparency="true"
                        allow="encrypted-media" title="Ease Album">
                    </iframe>
                    <iframe 
                        src="https://open.spotify.com/embed/album/2B0eKWdm2criYHpZSY3UeA" 
                        width="300" height="380" frameborder="0" allowtransparency="true" 
                        allow="encrypted-media" title="Clean Up on Aisle 12 Album">
                    </iframe>
                </div>
                <p>Visit any of our streaming platforms</p>
                <ul>
                    <li><a href="https://open.spotify.com/artist/3hK4PlTiLZ3XTq7UguJoUz?si=RQu9FHKKS1uWIjE_moDciQ" target="_blank">Spotify</a></li>
                    <li><a href="https://music.apple.com/us/artist/greasysauceboss/1436780055" target="_blank">Apple Music</a></li>
                    <li><a href="https://soundcloud.com/greasysauceboss" target="_blank">SoundCloud</a></li>
                    <li><a href="https://www.youtube.com/channel/UCwHKV6ptEmJLQ16qpFg-Smw" target="_blank">YouTube</a></li>
                </ul>
            </>
        );
    }
}

export default connect()(ReleasesPage);