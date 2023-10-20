import { Navigate } from "react-router-dom"
// import Main from "../Main/Main"
// import Header from "../Header/Header"

export default function ProtectedRoute({ element: ProtectedHomeElement, loggedIn, ...props }) {

  return (
    loggedIn ?
      <ProtectedHomeElement {...props}/>
      : <Navigate to={'/sign-in'} replace />
  )
}
