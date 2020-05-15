import React from "react";
import { useParams } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";

const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      id
      title
      medium_cover_image
      description_intro
      isLiked @client
    }
  }
`;

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const Contents = styled.div`
  margin: 10px;
  width: 50%;
`;

const Title = styled.h1`
  font-size: 40px;
  margin-bottom: 15px;
`;

const Description = styled.p`
  font-size: 20px;
  height: 30vh;
  overflow: auto;
`;

const Poster = styled.div`
  background-image: url(${(props) => props.bg});
  background-size: contain;
  background-position: center center;
  width: 25%;
  height: 60%;
  background-repeat: no-repeat;
`;

const Loading = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-top: 20px;
`;

export default () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_MOVIE, {
    variables: { id: parseInt(id) },
  });
  return (
    <Container>
      {loading ? (
        <Loading>loading...</Loading>
      ) : (
        <>
          <Contents>
            <Title>
              {data.movie.title} {data.movie.isLiked ? "❤️" : "💔"}
            </Title>
            <Description>{data.movie.description_intro}</Description>
          </Contents>
          <Poster bg={data.movie.medium_cover_image}></Poster>
        </>
      )}
    </Container>
  );
};
