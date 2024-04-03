import {  useNavigate } from "react-router-dom";


export const UpdateButton = ({
  navigateTo = "/",
  object,
  identificador,
  OnClickFn,

}) => {
  const navigate = useNavigate();
  return OnClickFn ? (
    <button onClick={OnClickFn}
      style={{ height: '35px' }}
      type="button" className="btn btn-warning col-6 ">
      <img
        style={{ height: '25px', width: '25px' }}
        src="" alt="" />
    </button>
  ) : (

    <button
      style={{ height: '35px' }}
      onClick={() => navigate(navigateTo, { state: { objeto: object, identificador: identificador } })}
      type="button" className="btn btn-warning col-6">
      <img
        style={{ height: '25px', width: '25px' }}
        src="" alt="" />
    </button>



  );
};

export default UpdateButton;
