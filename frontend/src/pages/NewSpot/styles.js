import styled from 'styled-components';

const Container = styled.div`
  label#thumbnail {
    margin-bottom: 20px;
    border: 1px dashed #ddd;
    background-size: cover;
    cursor: pointer;
    height: 160px;
    display: flex;
    justify-content: center;
    align-items: center;

    input {
      display: none;
    }

    .has-thumbnail {
      border: 0;
    }

    .has-thumbnail img {
      display: none;
    }
  }
`;

export default Container;
