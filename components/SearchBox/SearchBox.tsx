"use client";

import css from "./SearchBox.module.css";

export default function SearchBox({
  onChange,
}: {
  onChange: (value: string) => void;
}) {
  return (
    <input
      type="text"
      placeholder="Search..."
      className={css.input}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
