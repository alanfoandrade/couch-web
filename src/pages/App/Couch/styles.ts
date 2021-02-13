import styled from 'styled-components';

export const Container = styled.div`
  max-width: 700px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgbta(0, 0, 0, 0.1);
  padding: 30px;
  margin: 80px auto;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: #71cc8f;
    font-size: 16px;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      margin-right: 8px;
    }
  }

  img {
    height: 120px;
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  strong {
    margin-top: 10px;
    font-size: 20px;
    font-weight: 500;
  }

  h1 {
    color: #71cc8f;
    font-size: 30px;
    font-weight: 500;
  }

  p {
    color: #3e3e3e;
    font-size: 15px;
    margin-top: 5px;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }

  span {
    font-size: 12px;
    margin: 4px 0;
    color: #999;

    strong {
      margin: 0;
      font-size: 12px;
      color: #3e3e3e;
    }
  }
`;

export const RepositoryList = styled.ul`
  margin-top: 32px;
  padding-top: 16px;
  border-top: 1px solid #eee;
  list-style: none;

  h2 {
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 16px;
    color: #d1c454;
  }

  li {
    display: flex;

    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }
  }
`;

export const ListItem = styled.a`
  text-decoration: none;
  color: #3e3e3e;
  padding: 15px 10px;
  display: flex;
  align-items: center;

  flex: 1;

  &:hover {
    color: #71cc8f;
  }

  div {
    display: flex;
    flex-direction: column;

    h3 {
      font-size: 16px;
      font-weight: 500;
      text-align: center;
      color: #3e3e3e;
    }

    h2 {
      margin: 0;
      margin-top: 5px;
      font-size: 12px;
    }
  }
`;

export const RepositoryInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 16px;

  strong {
    font-size: 16px;
    font-weight: 500;
  }

  div {
    margin-top: 4px;

    span {
      font-size: 12px;
      color: #999;
    }

    div {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding-bottom: 4px;
      margin-bottom: 4px;
      border-bottom: 1px solid #eee;

      strong {
        color: #3e3e3e;
        font-size: 12px;
      }

      span > span {
        margin: 0 4px;
      }

      a {
        color: #999;
        font-size: 12px;
      }
    }

    p {
      font-size: 13px;
      color: #999;
    }
  }
`;
