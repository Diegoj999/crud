import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CrudContext } from "../context/crudContext";
import Spinner from "./Spinner";
import Form from "./Form";
import useForm from "../hooks/useForm";

const Edit = () => {
  const { id } = useParams();
  const { getUserById } = useContext(CrudContext);
  const { userData, handleUserDataChange, handleSubmit, errors, isDisabled } =
    useForm({ name: "", dni: "", occ: "" }, true, id);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const user = await getUserById(id);
      if (user) {
        handleUserDataChange({
          target: { name: "name", value: user.name },
        });
        handleUserDataChange({
          target: { name: "dni", value: user.dni },
        });
        handleUserDataChange({
          target: { name: "occ", value: user.occ },
        });
      } else {
        console.log("This user not found");
      }
    } catch (error) {
      console.log("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Form
          userData={userData}
          handleUserDataChange={handleUserDataChange}
          handleSubmit={handleSubmit}
          isEdit={true}
          errors={errors}
          isDisabled={isDisabled}
        />
      )}
    </>
  );
};

export default Edit;
