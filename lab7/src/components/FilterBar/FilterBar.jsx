// src/components/FilterBar/FilterBar.jsx
import { useState } from "react";
import Select from "../Select/Select";
import Button from "../Button/PrimaryButton";

export default function FilterBar() {
  const [filters, setFilters] = useState({ f1: "", f2: "", f3: "" });

  const change = (key) => (e) =>
    setFilters((s) => ({ ...s, [key]: e.target.value }));
  const apply = (e) => {
    e.preventDefault();
    console.log("Apply filters:", filters);
  };

  return (
    <form className="filters" onSubmit={apply}>
      <div className="filter__container">
        <div className="filters__controls">
            <Select
              name="f1"
              placeholder="Filter 1"
              options={[
                { value: "a", label: "Option A" },
                { value: "b", label: "Option B" },
              ]}
              onChange={change("f1")}
            />
            <Select
              name="f2"
              placeholder="Filter 2"
              options={[
                { value: "low", label: "Low" },
                { value: "high", label: "High" },
              ]}
              onChange={change("f2")}
            />
            <Select
              name="f3"
              placeholder="Filter 3"
              options={[
                { value: "new", label: "New" },
                { value: "popular", label: "Popular" },
              ]}
              onChange={change("f3")}
            />
        </div>

        <div><Button text="Apply" /></div>
      </div>
    </form >
  );
}
