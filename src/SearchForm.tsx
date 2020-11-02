import * as React from "react";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: row;
  padding: 10px 20px;
`;

export const SearchForm = ({
  submit,
}: {
  submit: (search: string) => void;
}) => {
  const [newSearch, setNewSearch] = React.useState("united kingdom");
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        if (newSearch !== "") submit(newSearch);
      }}
    >
      <input
        type="text"
        placeholder="Search..."
        value={newSearch}
        onChange={(e) => setNewSearch(e.target.value)}
      />
      <button type="submit">Search</button>
    </Form>
  );
};
