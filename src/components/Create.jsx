import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDateInit } from "../helper/dates";
import { CrudContext } from "../context/crudContext";
import "../App.css";
import Form from "./Form";
import { toast } from "react-hot-toast";
import { validateForm } from "../helper/validations";

const Create = () => {
  const [name, setName] = useState("");
  const [dni, setDni] = useState("");
  const [nameError, setNameError] = useState("");
  const [dniError, setDniError] = useState("");

  const { createUser } = useContext(CrudContext);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationResult = validateForm(name, dni);
    if (!validationResult.isValid) {
      setNameError(validationResult.nameError);
      setDniError(validationResult.dniError);
      return;
    }
    console.log(name, dni, getDateInit())
    createUser(name, dni, getDateInit().day).then(() => {
      console.log("User created succesful");
      navigate("/");
      toast(name + " ha sido creado exitosamente", {
        icon: <i className="fa fa-check text-success" aria-hidden="true"></i>,
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    });
  };

  return (
    <Form
          name={name}
          setName={setName}
          dni={dni}
          setDni={setDni}
          handleSubmit={handleSubmit}
          isEdit={false}
          nameError={nameError}
          dniError={dniError}
        />
  );
};

export default Create;
