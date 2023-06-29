import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CrudContext } from "../context/crudContext";
import { toast } from "react-hot-toast";
import { validateForm } from "../helper/validations";
import { getDateInit } from "../helper/dates";

const useForm = (initialData, isEdit, idUser) => {
  const [userData, setUserData] = useState(initialData);
  const [errors, setErrors] = useState({ name: "", dni: "", occ: "" });
  const [isDisabled, setIsDisabled] = useState(false);

  const { createUser, updateUser } = useContext(CrudContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsDisabled(true);

    const { name, dni, occ } = userData;
    const { nameValidated, dniValidated, occValidated } = validateForm(
      name,
      dni,
      occ
    );

    if (nameValidated !== "" || dniValidated !== "" || occValidated !== "") {
      setErrors({
        name: nameValidated,
        dni: dniValidated,
        occ: occValidated,
      });
      setIsDisabled(false);
      return;
    }

    try {
      if (isEdit) {
        await updateUser(idUser, { name, dni, occ });
        toast(userData.name + " ha sido editado con éxito", {
          icon: <i className="fa fa-check text-success" aria-hidden="true"></i>,
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      } else {
        await createUser({ name, dni, occ, date: getDateInit().complete });
        toast(userData.name + " ha sido creado exitosamente", {
          icon: <i className="fa fa-check text-success" aria-hidden="true"></i>,
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      }

      navigate("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsDisabled(false);
    }
  };

  const handleUserDataChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  return {
    userData,
    handleUserDataChange,
    handleSubmit,
    errors,
    isDisabled,
  };
};

export default useForm;
