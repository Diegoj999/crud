import "../App.css"

const Spinner = () => {
  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
     <div className="text-center">
  <div className="spinner-border" style={{width: "3rem", height: "3rem"}} role="status">
    <span className="visually-hidden">Cargando...</span>
  </div>
</div>
    </div>
  )
}

export default Spinner