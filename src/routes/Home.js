import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";
import Movie from "../components/Movie";

const GET_MOVIES = gql`
  query {
    movies(limit: 10) {
      id
      medium_cover_image
      isLiked @client
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Header = styled.header`
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  height: 35vh;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 40px;
  font-weight: 600;
`;

const Loading = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-top: 20px;
`;

const Movies = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  width: 70%;
`;

export default () => {
  const { loading, error, data } = useQuery(GET_MOVIES);
  return (
    <Container>
      <Header>
        <Title>Apollo 2020</Title>
      </Header>
      {loading ? (
        <Loading>Loading...</Loading>
      ) : (
        data.movies && (
          <Movies>
            {data.movies.map((movie) => (
              <Movie
                key={movie.id}
                id={movie.id}
                isLiked={movie.isLiked}
                bg={movie.medium_cover_image}
              />
            ))}
          </Movies>
        )
      )}
    </Container>
  );
};
