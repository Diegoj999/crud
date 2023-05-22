import { useContext } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { CrudContext } from "../context/crudContext";

const Table = () => {
  const { deleteUsers, users } = useContext(CrudContext);

  const confirmDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUsers(id);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="d-grid gap-2">
            <Link className="btn btn-success mx-auto my-5" to={"/create"}>
              <i className="fa fa-plus mx-1" aria-hidden="true"></i>Add
            </Link>
          </div>
          {users.length === 0 ? (
            <h1 className="text-center">Sin resultado</h1>
          ) : (
            <table className="table table-bordered table-hover">
              <thead className="bg-dark text-white">
                <tr>
                  <th>Name</th>
                  <th>DNI</th>
                  <th>Creation date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => {
                  return (
                    <tr key={user.id}>
                      <td className="tableText">{user.name}</td>
                      <td className="tableText">{user.dni}</td>
                      <td className="tableText">{user.date}</td>
                      <td className="tableText" style={{ width: "10%" }}>
                        <div className="d-flex justify-content-center">
                          <Link
                            to={`/edit/${user.id}`}
                            className="text-warning mx-2 "
                          >
                            <i className="fa-solid fa-pencil"></i>
                          </Link>

                          <i
                            style={{ cursor: "pointer" }}
                            className="fa-solid fa-trash text-danger mx-2 mt-1"
                            onClick={() => confirmDelete(user.id)}
                          ></i>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Table;
