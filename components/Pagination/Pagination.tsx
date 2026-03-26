"use client";

import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface Props {
  pageCount: number;
  onPageChange: (selectedItem: { selected: number }) => void;
}

export default function Pagination({ pageCount, onPageChange }: Props) {
  return (
    <ReactPaginate
      pageCount={pageCount}
      onPageChange={onPageChange}
      containerClassName={css.pagination}
      activeClassName={css.active}
      pageClassName={css.page}
      previousLabel="<"
      nextLabel=">"
    />
  );
}
