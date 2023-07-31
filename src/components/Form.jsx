import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Form = ({
  userData,
  handleUserDataChange,
  handleSubmit,
  isEdit,
  errors,
  isDisabled,
}) => {

  return (
    <div className="d-flex flex-column container">
      <Link className="btn btn-primary mx-auto my-5" to={"/"}>
        <i className="fa fa-minus mx-1" aria-hidden="true"></i>Volver
      </Link>
      <div className="row">
        <div className="col">
          <form
            className="form-container mx-auto border"
            onSubmit={handleSubmit}
          >
            <div
              style={{ height: "2em", background: "rgb(20,108,221)" }}
              className="display-6 text-white"
            >
              <p className="text-center pt-3">{isEdit ? "Editar" : "Crear"} Usuario</p>
            </div>

            <div className="mx-4 mt-4">
              <p style={{ color: "rgb(20,108,221)", fontWeight: "bold" }}>
                {isEdit ? "Editar" : "Crear"} usuario en los siguientes campos:
              </p>
            </div>
            <div className="py-3 mx-3">
              <label className="form-label">Nombre:</label>
              <input
                value={userData.name}
                onChange={handleUserDataChange}
                name="name"
                type="text"
                className="form-control"
                placeholder="Escribe el nombre.."
                required
              />
            </div>
            {errors?.name && (
              <p className="errorMessage mx-3 text-danger">({errors.name}*)</p>
            )}
            <div className="mb-3 mx-3">
              <label className="form-label">DNI:</label>
              <input
                value={userData.dni}
                onChange={handleUserDataChange}
                type="number"
                name="dni"
                className="form-control"
                placeholder="Escribe el DNI.."
                required
              />
            </div>
            {errors?.dni && (
              <p className="errorMessage mx-3 text-danger">({errors.dni}*)</p>
            )}

            <div className="d-flex py-3 mx-3">
              <select
                value={userData.occ}
                onChange={handleUserDataChange}
                className="form-select form-select mb-3"
                aria-label=".form-select-lg example"
                name="occ"
                required
              >
                <option value="">Abrir el menu</option>
                <option value="Junior_Developer">Junior Developer</option>
                <option value="Semis-Senior_Developer">
                  Semi-Senior Developer
                </option>
                <option value="Senior_Developer">Senior Developer</option>
              </select>
            </div>
            {errors?.occ && (
              <p className="errorMessage mx-3 text-danger">({errors.occ}*)</p>
            )}

            <div className="d-flex justify-content-center my-3">
              <button
                type="submit"
                style={{ background: "rgb(20,108,221)" }}
                className="btn btn-lg btn-primary"
                disabled={isDisabled}
              >
                {isEdit ? "Editar" : "Crear"} 
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;

Form.propTypes = {
  userData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    dni: PropTypes.string.isRequired,
    occ: PropTypes.string.isRequired,
  }).isRequired,
  errors: PropTypes.shape({
    name: PropTypes.string.isRequired,
    dni: PropTypes.string.isRequired,
    occ: PropTypes.string.isRequired,
  }).isRequired,
  handleUserDataChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isEdit: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool.isRequired,
};
