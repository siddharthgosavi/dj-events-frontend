import Link from "next/link";
import { PER_PAGE } from "../config";

export default function Pagination({ page, total }) {
  const lastPage = Math.ceil(total / PER_PAGE);
  const buttons = [];
  for (let i = 1; i <= lastPage; i++) {
    buttons.push(
      <Link style={{ margin: "2px" }} href={`/events?page=${i}`} className="btn-secondary">
        {i}
      </Link>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {page > 1 && (
        <Link style={{ margin: "2px" }} href={`/events?page=${page - 1}`} className="btn-secondary">
          {"<"}Prev
        </Link>
      )}
      {buttons}
      {page < lastPage && (
        <Link style={{ margin: "2px" }} href={`/events?page=${page + 1}`} className="btn-secondary">
          Next {">"}
        </Link>
      )}
    </div>
  );
}
