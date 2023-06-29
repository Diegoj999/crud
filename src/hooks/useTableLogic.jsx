import { useContext, useEffect, useState } from "react";
import { CrudContext } from "../context/crudContext";
import Swal from "sweetalert2";


const useTableLogic = (data) => {

    const { deleteUsers } = useContext(CrudContext);

  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  const confirmDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "gray",
      cancelButtonColor: "#d45050",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUsers(id);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };


  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue);
    setCurrentPage(0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const search = e.target.elements.search;
    const searchValue = search.value.trim();
    handleSearch(searchValue);
  };


  useEffect(() => {
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(0); // Reiniciar la página al aplicar un filtro
  }, [data, searchTerm]);

  return {
    currentPage,
    filteredData: filteredData.slice(currentPage * 10, (currentPage + 1) * 10),
    totalPages: Math.ceil(filteredData.length / 10),
    handlePageChange,
    handleSearch,
    handleSubmit,
    confirmDelete
  };
};

export default useTableLogic;