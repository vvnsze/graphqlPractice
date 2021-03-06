import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link, hashHistory } from 'react-router';
import query from '../queries/fetchSongs';


class SongCreate extends Component {
    constructor(props){
        super(props);
        this.state= {
            title: ''
        }
    }
    
    onSubmit(event) {
        event.preventDefault();
        this.props.mutate({
            variables: {
                title: this.state.title
            },
            refetchQueries: [{ query }]
        }).then(() => hashHistory.push('/'));
    }
//^refetch on another component (not available through props)
//makes whole new query to back end so use dataIdFromObject
    render() {
        return (
            <div>
                <Link to="/">Back</Link>
                <h3>Create a New Song</h3>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <label>Create a New Song</label>
                    <input 
                        onChange={event=> this.setState({ title: event.target.value })}
                        value={this.state.title}
                    />
                </form>
            </div>
        )
    }
}

const mutation = gql`
    mutation AddSong($title: String){
        addSong(title: $title) {
            title
        }
    }
`;

//we have props.mutate instead of props.data

export default graphql(mutation)(SongCreate);