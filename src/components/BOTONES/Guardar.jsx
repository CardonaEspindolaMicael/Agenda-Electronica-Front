import { Link, useNavigate } from "react-router-dom";

export const SaveButton = ({ titulo = "Cancelar", navigateTo = "/" }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (navigateTo === "back") {
      navigate(-1);
    } else {
      navigate(navigateTo);
    }
  };
  return (
    <button type="button" className="btn btn-danger col-4 mt-4" onClick={handleClick}>
      {titulo}
    </button>
  );
};
export default SaveButton;
