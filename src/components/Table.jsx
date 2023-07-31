import { useContext } from "react";
import { Link } from "react-router-dom";
import { CrudContext } from "../context/crudContext";
import ReactPaginate from "react-paginate";
import useTableLogic from "../hooks/useTableLogic";
import { formattedNumber } from "../helper/utils";

const Table = () => {
  const { users } = useContext(CrudContext);

  const {
    filteredData,
    totalPages,
    handlePageChange,
    handleSubmit,
    confirmDelete,
  } = useTableLogic(users);

 

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="d-grid gap-2">
            <Link className="btn btn-dark mx-auto mt-5 my-3" to={"/create"}>
              <i className="fa fa-plus mx-1" aria-hidden="true"></i>Añadir
            </Link>
          </div>

          { users.length > 0 && <form onSubmit={handleSubmit} >
            <input
              className="my-4 rounded p-1  border-1 width-search"
              placeholder="Buscar.."
              name="search"
            />
          </form>}

          {filteredData.length === 0 ? (
            <h1 className="text-center">Sin resultado</h1>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped">
                <thead className="table-color text-white ">
                  <tr>
                    <th>
                      <div className="mx-2">Nombre</div>
                    </th>
                    <th>Ocupación</th>
                    <th>DNI</th>
                    <th>Fecha de Ing.</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData
                
                    .map((user) => {
                      return (
                        <tr key={user.id}>
                          <td>
                            <div className="mx-2">{user.name}</div>
                          </td>
                          <td>{user.occ.replace(/_/g, " ")}</td>
                          <td>{formattedNumber(user.dni)}</td>
                          <td>{user.date}</td>
                          <td style={{ width: "10%" }}>
                            <div>
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

              {/* Paginación */}
              <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                pageCount={totalPages} // Usar la lista filtrada para calcular el pageCount
                onPageChange={handlePageChange}
                containerClassName={"pagination"}
                pageLinkClassName={"btn mx-1 btn-outline-primary"}
                activeLinkClassName={"btn btn-primary text-white"}
                nextLinkClassName={"btn btn-outline-primary "}
                previousLinkClassName={"btn btn-outline-primary"}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Table;
