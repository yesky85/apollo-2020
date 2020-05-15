import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

const LIKE_MOVIE = gql`
  mutation likeMovie($id: Int!, $isLiked: Boolean!) {
    likeMovie(id: $id, isLiked: $isLiked) @client
  }
`;

const Container = styled.div`
  width: 100%;
  height: 40vh;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

const Poster = styled.div`
  background-image: url(${(props) => props.bg});
  background-size: contain;
  background-position: center center;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
`;

export default ({ id, bg, isLiked }) => {
  const [likeMovie] = useMutation(LIKE_MOVIE, {
    variables: { id: parseInt(id), isLiked },
  });
  return (
    <Container>
      <Link to={`/${id}`}>
        <Poster bg={bg}></Poster>
      </Link>
      <button onClick={likeMovie}>{isLiked ? "Unlike" : "Like"}</button>
    </Container>
  );
};
