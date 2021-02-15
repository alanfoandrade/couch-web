import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  min-width: 1016px;
  max-width: 1200px;
  background: #f0f0f7;
  border-radius: 4px;
  padding: 70px;
  box-shadow: 0 0 20px rgbta(0, 0, 0, 0.1);
  margin: 80px auto;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  > div {
    min-width: 512px;
    max-width: 600px;

    h1 {
      font-size: 32px;
    }

    strong {
      font-size: 40px;
      display: block;
      margin: 16px 0 8px;
    }

    p {
      font-size: 20px;
    }
  }

  img {
    height: 263px;
    width: 400px;
    border-radius: 4px;
    margin-left: 16px;
  }
`;

export const Form = styled.form`
  width: 50%;
  margin-top: 40px;

  div.form-input {
    display: flex;
    flex: 1;
    flex-direction: column;

    & + div.form-input {
      margin-top: 16px;
    }

    label {
      font-size: 20px;
    }

    input {
      font-size: 16px;
      font-weight: 400;
      padding: 16px;
      margin-top: 8px;
      height: 50;
    }
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 24px;

  button {
    background: #34cb79;
    width: 200px;
    color: #fff;
    font-size: 16px;
    font-weight: 500;
    display: flex;
    padding-right: 16px;
    align-items: center;
    transition: background-color 0.2s;

    &:hover {
      background: ${shade(0.2, '#34cb79')};
    }

    div.button-icon {
      height: 72px;
      width: 56px;
      display: flex;
      border-radius: 4px 0 0 4px;
      justify-content: center;
      align-items: center;
      padding: 8px;
      background: rgba(0, 0, 0, 0.2);
      margin-right: 16px;
    }

    div.button-text {
      flex: 1;
    }
  }

  a {
    background: #3482cb;
    width: 200px;
    color: #fff;
    font-size: 16px;
    font-weight: 500;
    display: flex;
    padding-right: 16px;
    align-items: center;
    border-radius: 4px;
    text-decoration: none;
    transition: background-color 0.2s;

    &:hover {
      background: ${shade(0.2, '#3482cb')};
    }

    div.button-icon {
      height: 100%;
      width: 56px;
      display: flex;
      border-radius: 4px 0 0 4px;
      justify-content: center;
      align-items: center;
      padding: 8px;
      background: rgba(0, 0, 0, 0.2);
      margin-right: 16px;
    }

    div.button-text {
      text-align: center;
      flex: 1;
    }
  }
`;
