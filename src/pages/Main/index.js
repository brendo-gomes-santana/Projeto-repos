import React from "react";
import { FaGithub, FaPlus } from "react-icons/fa";
import { Container, Form, SubmitButton } from "./styles.js";

export default function Main() {
  return (
    <Container>
      <h1>
        <FaGithub size={25} />
        Meus repositórios
      </h1>

      <Form>
        <input type='text' placeholder="Adicionar repositório"/>
        <SubmitButton>
            <FaPlus color='#fff' size={14}/>
        </SubmitButton>
      </Form>
    </Container>
  );
}