import * as React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Form = styled(motion.form)`
  display: flex;
  flex-direction: row;
  padding: 10px 20px;
`;

const Input = styled(motion.input)`
  font-size: 25px;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-bottom: 1px solid lightgrey;
  background: white;
  color: black;
  margin-right: 10px;
  font-family: "Montserrat", sans-serif;
`;

const SearchButton = styled(motion.button)`
  font-size: 25px;
  border: 0;
  border-bottom: 1px solid white;
  background: white;
  color: black;
  font-family: "Montserrat", sans-serif;
  transition: 0.2s;
  :hover {
    border-bottom: 1px solid grey;
  }
`;

export const SearchForm = ({
  submit,
}: {
  submit: (search: string) => void;
}) => {
  const [newSearch, setNewSearch] = React.useState("United Kingdom");
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        if (newSearch !== "") submit(newSearch);
      }}
    >
      <Input
        type="text"
        placeholder="Search..."
        value={newSearch}
        onChange={(e) => setNewSearch(e.target.value)}
      />
      <SearchButton type="submit">Search</SearchButton>
    </Form>
  );
};
