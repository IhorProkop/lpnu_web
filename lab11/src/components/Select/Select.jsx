export default function Select({
  name,
  placeholder = "Choose…",
  options = [],
  onChange,
}) {
  return (
    <label className="select">
      <select
        className="select__control"
        name={name}
        defaultValue=""
        onChange={onChange}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}
