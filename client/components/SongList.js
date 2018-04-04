import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import query from '../queries/fetchSongs';

class SongList extends Component {
    onSongDelete(id) {
        this.props.mutate({
            variables: { id }
        }).then(() => this.props.data.refetch());
    }
    //^ Another way to refetch, came in as a prop

    renderSongs() {
        return this.props.data.songs.map( ({ id, title }) => {
            return (
                <li key={id} className="collection-item">
                    {title}
                <i 
                    className="material-icons"
                    onClick={() => this.onSongDelete(id)}
                >delete</i>
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
const mutation = gql`
    mutation DeleteSong($id: ID) {
        deleteSong(id: $id) {
        id
        }
    }
`;

export default graphql(mutation)(
    graphql(query)(SongList)
);
// ^ call graphql mutation and then call query and then call SongList
// ^ returns a function and then invocating the function with the seond parenthesis

//GraphQL + React Strategy
// 1) Identify data required
// 2) Write query in Graphiql (for practice) and in component File
// 3) Bond query + component
// 4) Access data!

//Time:
//Component Rendered -> Query Issue --- Query Complete -> Rerender Component
//Take advantage of this.props.data.loading