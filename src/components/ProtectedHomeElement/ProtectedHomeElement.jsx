import Header from "../Header/Header";
import Main from "../Main/Main";

export default function ProtectedElement({dataUser, ...props}) {
  return (
    <>
      <Header dataUser={dataUser} />
      <Main
        name='main'
        {...props}
      />
    </>
  )
}
