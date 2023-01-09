import { useQuery} from "@tanstack/react-query";
import React, { useState } from "react";
import { details } from "../API/details/Details";
import { QueryKeys } from "../helpers/QueryKeys";

export default function Table() {


  const [pagination, setPagination] = useState({ page: 1, limit: 5});

  const {
    isLoading,
    data: profiles,
    isError  } = useQuery({
    queryKey: [QueryKeys.DetailsGet, pagination],
    queryFn: () =>
      details
        .getDetails(pagination.page, pagination.limit)
        .then((res) => res.data),
    keepPreviousData: true,
  });
  if (isError) {
    return <div>Error</div>;
  }

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
      <div className="mb-4">
      <table className="table">
  <thead className="text-white bg-black">
    <tr>
      <th scope="col">FirstName</th>
      <th scope="col">LastName</th>
      <th scope="col">Email</th>

    </tr>
  </thead>
  <tbody>
  {profiles.map((item, i) => (
    <tr>
      <td>{item.firstName}</td>
      <td>{item.lastName}</td>
      <td>{item.email}</td>
    </tr>
  ))}

      
  </tbody>
</table>
      <div className="mt-4 space-x-4">
        <span>Rows</span>
        <select
          onChange={(e) =>
            setPagination((page) => ({ ...page, limit: e.target.value }))
          }
          value={pagination.limit}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={25}>25</option>
        </select>
          <button  onClick={() =>
            setPagination((page) => ({
              ...page,
              page: Math.max(page.page - 1, 1),
            }))
          } type="button" className="text-black btn btn-secondary">
          previous
        </button>

        <button
          onClick={() =>
            setPagination((page) => ({ ...page, page: page.page + 1 }))
          } type="button" className="text-black btn btn-secondary"
        >
          next
        </button>
      </div>
    </div>
  );
}
