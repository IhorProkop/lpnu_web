export default function SearchInput({
  placeholder = "Search…",
  value,
  onChange,
}) {
  return (
    <form className="search" role="search" onSubmit={(e) => e.preventDefault()}>
      <input
        className="search__input"
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </form>
  );
}
