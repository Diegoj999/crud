import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Form = ({ name, setName, dni, setDni, handleSubmit, isEdit, nameError, dniError }) => {
  return (
    <div className="d-flex flex-column container">
      <Link className="btn btn-primary mx-auto my-5" to={"/"}>
        <i className="fa fa-minus mx-1" aria-hidden="true"></i>Back
      </Link>
      <div className="row">
        <div className="col">
          <form className="form-container  mx-auto border" onSubmit={handleSubmit}>
            <div style={{ height: "2em", background: "#050d66" }} className="display-6 text-white">
              <p className="text-center pt-3">Contact Form</p>
            </div>

            <div className="mx-4 mt-4">
              <p style={{color:"#050d66", fontWeight:"bold"}}>{isEdit ? "Edit" : "Create"} User in the next fields</p>
            </div>
            <div className="py-3 mx-3">
              <label className="form-label">Name:</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="form-control"
                placeholder="Enter user.."
                required
              />
            </div>
            {nameError && <p className="errorMessage mx-3 text-danger">({nameError}*)</p>}
            <div className="mb-3 mx-3">
              <label className="form-label">DNI:</label>
              <input
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                type="number"
                className="form-control"
                placeholder="Enter DNI.."
                required
              />
            </div>
            {dniError && <p className="errorMessage mx-3 text-danger">({dniError}*)</p>}
            <div className="d-flex justify-content-center my-3">
              <button type="submit" style={{ background: "#050d66" }} className="btn btn-lg btn-primary">
                Send
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
    name: PropTypes.string.isRequired,
    setName: PropTypes.func.isRequired,
    dni: PropTypes.string.isRequired,
    setDni: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    isEdit: PropTypes.bool.isRequired,
    nameError: PropTypes.string.isRequired,
    dniError: PropTypes.string.isRequired
  };

