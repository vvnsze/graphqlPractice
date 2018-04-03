import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

class SongList extends Component {
    renderSongs() {
        return this.props.data.songs.map( song => {
            return (
                <li key={song.id} className="collection-item">
                    {song.title}
                </li>
            )
        })
    }

    render() {
        if(this.props.data.loading) {
            return <div>Loading</div>
        }
        return (
            <div>
                <ul className="collection">
                    {this.renderSongs()}
                </ul>
                <Link
                    to="/songs/new"
                    className="btn-floating btn-large green right"
                >
                    <i className="material-icons">add</i>
                </Link>
            </div>
        )
    }
}

const query = gql`
    {
        songs {
            id
            title
        }
    }
`;

export default graphql(query)(SongList);
// ^ returns a function and then invocating the function with the seond parenthesis

//GraphQL + React Strategy
// 1) Identify data required
// 2) Write query in Graphiql (for practice) and in component File
// 3) Bond query + component
// 4) Access data!

//Time:
//Component Rendered -> Query Issue --- Query Complete -> Rerender Component
//Take advantage of this.props.data.loading