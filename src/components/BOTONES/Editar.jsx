import { Link, useNavigate } from "react-router-dom";

export const EditButton = ({
  navigateTo = "/",
  object,
  identificador,
  idHistoriaClinica,
  OnClickFn,
  titulo,

}) => {
  const navigate = useNavigate();
  return OnClickFn ? (
    <button onClick={OnClickFn}
      type="button" className="btn btn-outline-warning mt-3">
      {titulo}
    </button>
  ) : (

    <button
      onClick={() => navigate(navigateTo, { state: { objeto: object, identificador: identificador, idHistoriaClinica: idHistoriaClinica } })}
      type="button" className="btn btn-outline-warning mt-3">
      {titulo}
    </button>
  );
};

export default EditButton;
