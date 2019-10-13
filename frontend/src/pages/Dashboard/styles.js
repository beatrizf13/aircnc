import styled from 'styled-components';

const Container = styled.div`
  ul {
    width: 100%;
    list-style: none;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    margin-bottom: 30px;

    li {
      display: flex;
      flex-direction: column;

      header {
        width: 100%;
        height: 120px;
        background-size: cover;
        border-radius: 4px;
      }

      strong {
        margin-top: 10px;
        font-size: 24px;
        color: #444;
      }
      span {
        font-size: 15px;
        color: #999;
      }
    }
  }
`;

export const RequestContainer = styled.div`
  ul.notifications {
    list-style: none;
    margin-bottom: 15px;

    li {
      font-size: 16px;
      line-height: 24px;

      p {
        font-size: 14px;
        margin-bottom: 0;
      }

      button {
        background: none;
        margin-right: 10px;
        border: 0;
        font-weight: bold;
        margin-top: 10px;
        cursor: pointer;
      }
      .accept {
        color: #84c870;
      }
      .reject {
        color: #e55e5e;
      }
    }
  }
`;

export default Container;
