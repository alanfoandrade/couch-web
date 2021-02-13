import styled from 'styled-components';

export const Container = styled.div`
  max-width: 700px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgbta(0, 0, 0, 0.1);
  padding: 30px;
  margin: 80px auto;
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;

  img {
    margin: 0 40px;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 32px;

  h1 {
    font-size: 32px;
    display: flex;
    align-items: center;
    color: #3e3e3e;

    svg {
      margin-right: 10px;
    }
  }

  div {
    display: flex;
  }
`;

export const NavButton = styled.button`
  background: transparent;
  border: 0;

  display: ${(props) => (props.disabled ? 'none' : 'flex')};
  justify-content: center;
  align-items: center;
  color: #71cc8f;

  .lastpage-button {
    margin-left: 8px;
    margin-right: 0;
  }

  p {
    font-size: 14px;
    margin-left: 0;
    margin-right: 8px;
  }

  span {
    margin: 0 4px;
  }
`;

export const List = styled.ul`
  list-style: none;
  margin-top: 16px;

  li {
    padding: 15px 0;
    display: flex;
    justify-content: space-between;

    & + li {
      border-top: 1px solid #eee;
    }
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 8px 0;
    color: #d1c454;
    text-decoration: none;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 2px solid #eee;
  }

  div {
    display: flex;
    margin-left: 16px;
    flex-direction: column;
    align-items: flex-start;

    span {
      font-size: 16px;
      color: #71cc8f;

      strong {
        color: #999;
        font-weight: 500;
      }
    }

    .username {
      color: #3e3e3e;
      font-size: 22px;
      font-weight: 500;
    }
  }
`;
