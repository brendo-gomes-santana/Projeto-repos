import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import api from '../../services/api';

import { Container, Owner, Loading, Backbutton, IssuesList, PageActions, Controle } from './styles';

export default function Repositorio() {

  const { repositorio } = useParams();

  const [Repositorio, setRepositorio] = useState({});
  const [issuies, setIssuies] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [controle, setControle] = useState('all')

  useEffect(() => {
    (async () => {
      const [repositorioData, issuesData] = await Promise.all([
        api.get(`/repos/${repositorio}`),
        api.get(`/repos/${repositorio}/issues`, {
          params: {
            state: controle,
            per_page: 5
          }
        })
      ])
      setRepositorio(repositorioData.data)
      setIssuies(issuesData.data);
      setLoading(false);
    })()
  }, [controle])
  useEffect(() => {
    (async () => {
      const r = await api.get(`/repos/${repositorio}/issues`, {
        params: {
          state: 'open',
          page: page,
          per_page: 5,
        }
      })

      setIssuies(r.data);
    })()
  }, [page, repositorio])

  function handlePage(action) {
    setPage(action === 'back' ? page - 1 : page + 1)
  }

  if (loading) {
    return (
      <Loading>
        <h1>Carregando...</h1>
      </Loading>
    )
  }

  return (
    <Container>
      <Backbutton to='/' >
        <FaArrowLeft color='#000' size={35} />
      </Backbutton>
    
      <Owner>
        <img src={Repositorio.owner.avatar_url} alt={Repositorio.owner.login} />
        <h1>{Repositorio.name}</h1>
        <p>{Repositorio.description}</p>
      </Owner>
      <Controle>
        <button onClick={() => setControle('all')}>All</button>
        <button onClick={() => setControle('open')}>Open</button>
        <button onClick={() => setControle('closed')}>Close</button>
      </Controle>
      <IssuesList>
        {issuies?.map((issue) => {
          return (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue?.labels.map((label) => {
                    return (
                      <span key={String(label.id)}>{label.name}</span>
                    )
                  })}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          )
        })}
      </IssuesList>

      <PageActions>
        <button type='button' disabled={page < 2} onClick={() => handlePage('back')}>Volta</button>
        <button type='button' onClick={() => handlePage('next')}>Proxima</button>
      </PageActions>
    </Container>
  )
}
