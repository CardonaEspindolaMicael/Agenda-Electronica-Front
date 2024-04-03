import { Link } from "react-router-dom";

export const NewButton = ({

  titulo = "Agregar",
  navigateTo = "/",
  OnClickFn,
}) => {
  return OnClickFn ? (
    <button onClick={OnClickFn} type="submit" className="btn btn-success">{titulo}</button>
  ) : (
    <Link to={navigateTo}>
      <button onClick={OnClickFn} type="submit" className="btn btn-success">{titulo}</button>
    </Link>
  );
};
export default NewButton;
