import React from 'react';
import { useAuth } from '../../../hooks/auth';

import { Container } from './styles';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <Container>
      <button type="button" onClick={() => signOut()}>
        Sair
      </button>
    </Container>
  );
};

export default Dashboard;
