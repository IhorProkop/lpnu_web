import Select from "../Select/Select.jsx";
import Button from "../Button/PrimaryButton.jsx";

export default function FilterBar({
  type,
  onTypeChange,
  size,
  onSizeChange,
  sort,
  onSortChange,
  onApply,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    onApply();
  }

  return (
    <form className="filters" onSubmit={handleSubmit}>
      <div className="filters__container">
        <div className="filters__controls">
          <Select
            name="type"
            placeholder="Type"
            options={[
              { value: "all", label: "All types" },
              { value: "drink", label: "Drinks" },
              { value: "spread", label: "Spreads" },
            ]}
            onChange={(e) => onTypeChange(e.target.value)}
          />

          <Select
            name="size"
            placeholder="Size"
            options={[
              { value: "all", label: "All sizes" },
              { value: "small", label: "Small" },
              { value: "medium", label: "Medium" },
              { value: "large", label: "Large" },
            ]}
            onChange={(e) => onSizeChange(e.target.value)}
          />

          <Select
            name="sort"
            placeholder="Sort"
            options={[
              { value: "none", label: "Default" },
              { value: "price-asc", label: "Price: low → high" },
              { value: "price-desc", label: "Price: high → low" },
            ]}
            onChange={(e) => onSortChange(e.target.value)}
          />
        </div>

        <Button text="Apply" type="submit" />
      </div>
    </form>
  );
}
