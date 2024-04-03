import { Navigate} from 'react-router-dom';
export const PrivateRouter = ({ component }) => {
  // Obtén el token del almacenamiento local
  const isAuthenticated = localStorage.getItem('_auth');
  
  console.log(isAuthenticated)
  return (
        isAuthenticated ? (
          component
        ) : (
          <Navigate to="/" replace />
        )    
  );
};