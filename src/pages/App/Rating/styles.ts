import styled from 'styled-components';
import { shade } from 'polished';
import { Link } from 'react-router-dom';

interface IHeaderOptionProps {
  active: boolean;
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
