import React, { Component } from 'react';
import { Link } from 'react-router';
import { graphql } from 'react-apollo';
import LyricCreate from './LyricCreate';
import LyricList from './LyricList';
import fetchSongItem from '../queries/fetchSongItem';

class SongDetail extends Component {
    render() {
        const { song } = this.props.data;
        if (!song) { return <div>Loading...</div>; }
        return (
            <div>
                <Link to="/">Back</Link>
                <h3>{song.title}</h3>
                <LyricList lyrics={song.lyrics} />
                <LyricCreate songId={this.props.params.id}/>
            </div>
        )
    }
}


export default graphql(fetchSongItem, {
    options: (props) => { return {variables: { id: props.params.id } } }
})(SongDetail);