import React, { useState, useCallback } from "react";
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from "react-icons/fa";
import { Container, Form, SubmitButton, List, DeleteButton } from "./styles.js";
import api from "../../services/api.js";

export default function Main() {
  const [newRepo, setNewRepo] = useState("");
  const [repositorios, setRepositorios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setLoading(true);
      (async () => {
        try {
            if(newRepo === ''){
                throw new Error('Você precisar indicar um repositório')
            }

          const r = await api.get(`/repos/${newRepo}`);

          let data = {
            nome: r.data.full_name,
          };
          // vai verificar se esse se o que a pessoa escreveu e a mesma coisa que a gente já tem.
          const hasRepo = repositorios.find(repo => repo.nome === newRepo)

          if(hasRepo){
            throw new Error('repositório jã existe')
          }

          setRepositorios([...repositorios, data]);
          setNewRepo("");
        } catch (err) {
          setAlert(true);
        } finally {
          setLoading(false);
        }
      })();
    },
    [newRepo, repositorios]
  );

  const handleDelete = useCallback(
    (repo) => {
      //ele vai pegar todos os repositórios e vai devolver todos que são diferente do que estou mandando;
      const find = repositorios.filter((r) => r.nome !== repo);
      setRepositorios(find);
    },
    [repositorios]
  );

  return (
    <Container>
      <h1>
        <FaGithub size={25} />
        Meus repositórios
      </h1>

      <Form onSubmit={handleSubmit}  error={alert}>
        <input
          value={newRepo}
          onChange={(v) => {setNewRepo(v.target.value); setAlert(null)}}
          type="text"
          placeholder="Adicionar repositório"
        />
        <SubmitButton loading={loading ? 1 : 0}>
          {loading ? (
            <FaSpinner size={14} color="#fff" />
          ) : (
            <FaPlus color="#fff" size={14} />
          )}
        </SubmitButton>
      </Form>

      <List>
        {repositorios.map((repos) => (
          <li key={repos.nome}>
            <span>
              <DeleteButton onClick={() => handleDelete(repos.nome)}>
                <FaTrash size={14} />
              </DeleteButton>
              {repos.nome}
            </span>
            <a href="###">
              <FaBars size={20} />
            </a>
          </li>
        ))}
      </List>
    </Container>
  );
}
