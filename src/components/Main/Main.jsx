import './Main.css'
import { memo } from "react"
import Spinner from "../Spinner/Spinner.jsx"
import Register from '../Register/Register'
import Login from '../Login/Login'
import HomePage from '../HomePage/HomePage'


const Main = memo(({ name, openCard, openProfile, openAvatar, openDelete, onCardClick, onCardLike, cards, isLoading, isCheckToken, handleLogin, handleRegister }) => {
  return (
    <main className='main'>
      {isCheckToken ?
        <Spinner check={isCheckToken}/>
        :
        { main:
          <HomePage
            openCard={openCard}
            openProfile={openProfile}
            openAvatar={openAvatar}
            openDelete={openDelete}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            cards={cards}
            isLoading={isLoading}
          />
          ,
          signup:  <Register name={name} handleRegister={handleRegister} />,
          signin: <Login name={name} handleLogin={handleLogin} />
          }[name]
      }
    </main>
  )
})

export default Main
