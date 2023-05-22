import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CrudContext } from "../context/crudContext";
import Spinner from "./Spinner";
import Form from "./Form";
import { toast } from "react-hot-toast";
import { validateForm } from "../helper/validations";

const Edit = () => {
  const { updateUser, getUserById } = useContext(CrudContext);

  const [name, setName] = useState("");
  const [dni, setDni] = useState("");
  const [loading, setLoading] = useState(true);
  const [nameError, setNameError] = useState("");
  const [dniError, setDniError] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationResult = validateForm(name, dni);
    if (!validationResult.isValid) {
      setNameError(validationResult.nameError);
      setDniError(validationResult.dniError);
      return;
    }
   
    await updateUser(id, {name: name, dni: dni});
    navigate("/");
    toast(name + " ha sido editado con éxito", {
      icon: <i className="fa fa-check text-success" aria-hidden="true"></i>,
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const user = await getUserById(id);
      if (user) {
        setName(user.name);
        setDni(user.dni);
        setLoading(false);
      } else {
        console.log("This user not found");
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Form
          name={name}
          setName={setName}
          dni={dni}
          setDni={setDni}
          handleSubmit={handleSubmit}
          isEdit={true}
          nameError={nameError}
          dniError={dniError}
        />
      )}
    </>
  );
};

export default Edit;
