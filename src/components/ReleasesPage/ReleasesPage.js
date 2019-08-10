import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ReleasesPage.css';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    button: {
        fontFamily: "Montserrat, sans-serif",
        margin: theme.spacing.unit,
        backgroundColor: "#1f2833",
        color: "#fff",
        padding: "10px 25px",
        letterSpacing: "1.5px",
        fontWeight: "700",
        transition: ".3s",
        '&:hover': {
            backgroundColor: "#fff",
            color: "#1f2833",
            boxShadow: "0px 0px 0px 3px #66fcf1",
        }
    }
});

class ReleasesPage extends Component {

    render() {
        const { classes } = this.props;
        return (
            <>
                <div className="container releases-page">
                    <h2 className="page-title">Releases</h2>
                    <iframe
                        src="https://open.spotify.com/embed/album/521URcTwYdxlTn44JEUwGR"
                        width="300" height="380" frameborder="0" allowtransparency="true"
                        allow="encrypted-media" title="Ease Album" 
                        className="spotify-album-ease">
                    </iframe>
                    <iframe
                        src="https://open.spotify.com/embed/album/2B0eKWdm2criYHpZSY3UeA"
                        width="300" height="380" frameborder="0" allowtransparency="true"
                        allow="encrypted-media" title="Clean Up on Aisle 12 Album"
                        className="spotify-album-cuoa12">
                    </iframe>
                    <p>Visit any of our streaming platforms</p>
                    <div className="btn-group">
                        <Button
                            variant="contained"
                            href="https://open.spotify.com/artist/3hK4PlTiLZ3XTq7UguJoUz?si=RQu9FHKKS1uWIjE_moDciQ"
                            className={classes.button}
                            rel="noopener noreferrer"
                            target="_blank">
                            Spotify
                        </Button>
                        <Button
                            variant="contained"
                            href="https://music.apple.com/us/artist/greasysauceboss/1436780055"
                            className={classes.button}
                            rel="noopener noreferrer"
                            target="_blank">
                            Apple Music
                        </Button>
                        <Button
                            variant="contained"
                            href="https://soundcloud.com/greasysauceboss"
                            className={classes.button}
                            rel="noopener noreferrer"
                            target="_blank">
                            SoundCloud
                        </Button>
                        <Button
                            variant="contained"
                            href="https://www.youtube.com/channel/UCwHKV6ptEmJLQ16qpFg-Smw"
                            className={classes.button}
                            rel="noopener noreferrer"
                            target="_blank">
                            YouTube
                        </Button>
                    </div>
                </div>
            </>
        );
    }
}

export default withStyles(styles)(connect()(ReleasesPage));