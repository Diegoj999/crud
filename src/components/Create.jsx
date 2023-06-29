import Form from "./Form";
import useForm from "../hooks/useForm";

const Create = () => {

  const { userData, handleUserDataChange, handleSubmit, errors, isDisabled } =
    useForm({ name: "", dni: "", occ: "" }, false);

  return (
    <Form
      userData={userData}
      handleUserDataChange={handleUserDataChange}
      handleSubmit={handleSubmit}
      isEdit={false}
      errors={errors}
      isDisabled={isDisabled}
    />
  );
};

export default Create;