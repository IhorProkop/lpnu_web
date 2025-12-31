export default function SearchBar({ placeholder = "Search…" }) {
  return (
    <form className="search" role="search" onSubmit={(e) => e.preventDefault()}>
      <input
        className="search__input"
        type="search"
        placeholder={placeholder}
      />
    </form>
  );
}
