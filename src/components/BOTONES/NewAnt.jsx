import {  useNavigate } from "react-router-dom";


export const NewAntButton = ({
  navigateTo = "/",
  identificador,
  titulo,
  OnClickFn,
}) => {
  const navigate = useNavigate();
  return OnClickFn ? (
    <button onClick={OnClickFn}
      type="button" className="btn btn-outline-info  mt-3">
      {titulo}
    </button>
  ) : (

    <button
      onClick={() => navigate(navigateTo, { state: { identificador: identificador } })}
      type="button" className="btn btn-outline-info  mt-3">
          {titulo}
    </button>
  );
};
export default NewAntButton;
