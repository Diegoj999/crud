import { useState, useEffect, useContext } from "react";
import Spinner from "./Spinner";
import { CrudContext } from "../context/crudContext";
import Table from "./Table";


const Show = () => {
  const [loading, setLoading] = useState(true);

  const { getUsers } = useContext(CrudContext);

  useEffect(() => {
    getUsers().then(() => {
      setLoading(false);
    }); // eslint-disable-next-line
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : <Table />}
    </>
  );
};

export default Show;
