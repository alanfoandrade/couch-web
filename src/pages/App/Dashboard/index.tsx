import React, { useEffect, useState } from 'react';
import couchApi from '../../../apis/couchApi';
import LoadingPage from '../../../components/LoadingPage';
import { useAuth } from '../../../hooks/auth';

import { Container } from './styles';

interface ICouchResponse {
  id: string;
  modelo: string;
  urlImagem: string;
  numeroDeAssentos: number;
  largura: number;
  altura: number;
  comprimento: number;
  dataCriacao: string;
  dataAtualizacao: string;
}

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();

  const [couchs, setCouchs] = useState<ICouchResponse[]>([]);

  useEffect(() => {
    async function loadCouchs() {
      const { data } = await couchApi.get('');

      setCouchs(data);
    }

    loadCouchs();
  }, []);

  return (
    <Container>
      <button type="button" onClick={() => signOut()}>
        Sair
      </button>

      {(couchs.length && couchs.map((couch) => <p>{couch}</p>)) || (
        <LoadingPage />
      )}
    </Container>
  );
};

export default Dashboard;
