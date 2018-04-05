import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { optimistic } from 'apollo-client/optimistic-data/store';

class LyricList extends Component {
  onLike(id, likes) {
    this.props.mutate({
      variables: { id },
      optimisticResponse: {
        __typename: 'Mutation',
        likeLyric: {
          id,
          __typename: 'LyricType',
          likes: likes + 1
        }
      }
    });
  }
//Optimistic response helps with lag on user flow, duplicate how the response is supposed to look like
//UI will automatically resolve to the correct answer if it's not just +1

  renderLyrics() {
    return this.props.lyrics.map(({id, content, likes}) => {
      return (
        <li key={id} className="collection-item">
          {content}
          <div className="vote-box">
            <i 
              className="material-icons"
              onClick={() => {this.onLike(id, likes)}}
            >thumb_up</i>
            {likes}
          </div>
        </li>
      );
    });
  }

  render() {
    return(
      <ul className="collection">
        {this.renderLyrics()}
      </ul>
    )
  }
}

const mutation = gql`
  mutation ($id: ID!){
    likeLyric(id: $id) {
      id
      likes
    }
  }
`;

export default graphql(mutation)(LyricList);