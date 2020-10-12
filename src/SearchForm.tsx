import * as React from "react";

export const SearchForm = ({
  submit,
}: {
  submit: (search: string) => void;
}) => {
  const [newSearch, setNewSearch] = React.useState("united kingdom");
  return (
    <div>
      <form
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
      </form>
    </div>
  );
};
