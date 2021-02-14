import styled from 'styled-components';
import { shade } from 'polished';
import { Link } from 'react-router-dom';
import { ButtonHTMLAttributes } from 'react';

interface IHeaderOptionProps {
  active: number;
}

interface IRatingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  rated: boolean;
}

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

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  margin-bottom: 16px;

  button {
    font-weight: 400;

    &:hover {
      color: ${shade(0.3, '#3482cb')};
    }
  }
`;

export const HeaderOption = styled(Link)<IHeaderOptionProps>`
  color: ${(props) => (props.active ? '#3482cb' : '#6a6180')};
  font-weight: 400;
  text-decoration: none;
  transition: color 0.2s;

  & + a {
    margin-left: 16px;
  }

  &:hover {
    color: ${shade(0.3, '#3482cb')};
  }
`;

export const Couch = styled.div`
  background: #fff;
  border-radius: 4px;
  padding: 16px;
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    display: flex;
    flex-direction: column;

    img {
      height: 240px;
      width: 240px;
      border-radius: 4px;
    }
    strong {
      color: #6a6180;
      font-size: 16px;
      margin-bottom: 8px;
    }
  }

  div.couch-info {
    flex: 1;
    margin-left: 64px;

    strong {
      color: #6a6180;
      font-size: 16px;
      margin-bottom: 8px;
    }

    span {
      font-weight: 400;
      font-size: 16px;
    }
  }

  div.approver-info {
    margin-right: 48px;
    text-align: center;

    strong {
      font-size: 20px;
    }

    span {
      font-weight: 400;
      font-size: 16px;
    }
  }
`;

export const RatingButton = styled.button<IRatingButtonProps>`
  background: ${(props) => props.rated && '#34cb79'};
  font-size: 14px;
  width: 104px;
  height: 32px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
`;
