import './App.css'
import { useCallback, useEffect, useState } from 'react'
import CurrentUserContext from '../contexts/CurrentUserContext.js'
import api from '../utils/api.js'
import Header from './Header/Header.jsx'
import Main from './Main/Main.jsx'
import Footer from './Footer/Footer.jsx'
import ImagePopup from './ImagePopup/ImagePopup.jsx'
import EditProfilePopup from './EditProfilePopup/EditProfilePopup.jsx'
import EditAvatarPopup from './EditAvatarPopup/EditAvatarPopup.jsx'
import AddPlacePopup from './AddPlacePopup/AddPlacePopup.jsx'
import InfoTooltip from './InfoTooltip/InfoTooltip'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import DeletePopup from './DeletePopup/DeletePopup'
import ProtectedRoute from './ProtectedRoute/ProtectedRoute'
import { getUserData } from "../utils/auth";
import SendContext from '../contexts/SendContext'

function App() {
  const navigate = useNavigate()
  //стейты для попапов
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false)
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false)
  const [isImagePopupOpen, setImagePopup] = useState(false)
  const [isSend, setIsSend] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})
  //стейт для контекста
  const [currentUser, setCurrentUser] = useState({})
  const [dataUser, setDataUser] = useState('')
  //стейты для карточек
  const [isLoadingCards, setIsLoadingCards] = useState(true)
  const [cards, setCards] = useState([])
  const [deleteCardId, setDeleteCardId] = useState('')
  //стейты для регистрации и логина
  const [isSuccessful, setIsSuccessful] = useState(false)
  const [isError, setIsError] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  //переменная состояния попапов
  const isOpen = isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || isDeletePopupOpen || isImagePopupOpen || isSuccessful || isError

  const closeAllPopups = useCallback(() => {
    setEditProfilePopupOpen(false)
    setAddPlacePopupOpen(false)
    setEditAvatarPopupOpen(false)
    setDeletePopupOpen(false)
    setImagePopup(false)
    setIsSuccessful(false)
    setIsError(false)
  }, [])

  useEffect(() => {
    function closePopupsByEsc(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups()
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', closePopupsByEsc)
      return () => {
        document.removeEventListener('keydown', closePopupsByEsc)
      }
    }
  }, [isOpen, closeAllPopups])

  useEffect(() => {
    if (localStorage.jwt) {
      getUserData(localStorage.jwt)
        .then(res => {
          setDataUser(res.data.email)
          setLoggedIn(true)
          navigate('/')
        })
        .catch(err => console.log(`Ошибкак авторизации повторном входе ${err}`))
    }
  }, [navigate])

  const handleAddPlaceClick = useCallback(() => {
    setAddPlacePopupOpen(true)
  }, [])

  const handleEditAvatarClick = useCallback(() => {
    setEditAvatarPopupOpen(true)
  }, [])

  const handleDeletePopupClick = useCallback((cardId) => {
    setDeleteCardId(cardId)
    setDeletePopupOpen(true)
  }, [])

  const handleCardClick = useCallback((card) => {
    setSelectedCard(card)
    setImagePopup(true)
  }, [])

  const handleEditProfileClick = useCallback(() => {
    setEditProfilePopupOpen(true)
  }, [])

  useEffect(() => {
    setIsLoadingCards(true)
    Promise.all([api.getInfo(), api.getCards()])
      .then(([dataUser, dataCards]) => {
        setCurrentUser(dataUser)
        setCards(dataCards)
        setIsLoadingCards(false)
      })
      .catch((err) => console.error(`Ошибка при загрузке начальных данных ${err}`))
  }, [])

  const handleSubmit = useCallback((request, textError) => {
    setIsSend(true)
    request()
      .then(closeAllPopups)
      .catch((err) => console.error(`${textError} ${err}`))
      .finally(() => setIsSend(false))
  }, [closeAllPopups])

  const handleDeleteSubmit = useCallback(() => {
    function makeRequest() {
      return (api.deleteCard(deleteCardId)
        .then(() => {
          setCards(cards.filter(card => { return card._id !== deleteCardId }))
        })
      )
    }
    handleSubmit(makeRequest, 'Ошибка при удалении карточки')
  }, [cards, deleteCardId, handleSubmit])

  const handleUpdateUser = useCallback((dataUser) => {
    function makeRequest() {
      return (api.setUserInfo(dataUser)
        .then(res => {
          setCurrentUser(res)
        }))
    }
    handleSubmit(makeRequest, 'Ошибка при редактировании профиля')
  }, [handleSubmit])

  const handleUpdateAvatar = useCallback((dataUser) => {
    function makeRequest() {
      return (api.setNewAvatar(dataUser)
        .then(res => {
          setCurrentUser(res)
        }))
    }
    handleSubmit(makeRequest, 'Ошибка при редактировании аватара')
  }, [handleSubmit])

  const handleAddCard = useCallback((dataCard) => {
    function makeRequest() {
      return (api.addCard(dataCard)
        .then(res => {
          setCards([res, ...cards]);
        }))
    }
    handleSubmit(makeRequest, 'Ошибка при добавлении карточки')
  }, [cards, handleSubmit])

  const handleLike = useCallback((card) => {
    const isLike = card.likes.some(element => currentUser._id === element._id)
    if (isLike) {
      api.deleteLike(card._id)
        .then(res => {
          setCards(cards => cards.map((item) => item._id === card._id ? res : item))
        })
        .catch((err) => console.error(`Ошибка при снятии лайка ${err}`))
    } else {
      api.addLike(card._id)
        .then(res => {
          setCards(cards => cards.map((item) => item._id === card._id ? res : item))
        })
        .catch((err) => console.error(`Ошибка при установке лайка ${err}`))
    }
  }, [currentUser._id])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__container">

        <SendContext.Provider value={isSend}>
          <Routes>
            <Route path='/' element={<ProtectedRoute
              dataUser={dataUser}
              openCard={handleAddPlaceClick}
              openProfile={handleEditProfileClick}
              openAvatar={handleEditAvatarClick}
              openDelete={handleDeletePopupClick}
              onCardClick={handleCardClick}
              onCardLike={handleLike}
              cards={cards}
              isLoading={isLoadingCards}
              loggedIn={loggedIn} />
            } />
            <Route path='/sign-up' element={
              <>
                <Header name='signup' />
                <Main name='signup' setIsSend={setIsSend} setIsSuccessful={setIsSuccessful} setIsError={setIsError} />
              </>
            } />
            <Route path='/sign-in' element={
              <>
                <Header name='signin' />
                <Main name='signin' setLoggedIn={setLoggedIn} setIsSend={setIsSend} setIsSuccessful={setIsSuccessful} setIsError={setIsError} />
              </>
            } />
            <Route path='*' element={<Navigate to='/' />} />
          </Routes>
        </SendContext.Provider>

        <Footer />

        <SendContext.Provider value={isSend}>
          <EditAvatarPopup
            onUpdateAvatar={handleUpdateAvatar}
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
          />

          <EditProfilePopup
            onUpdateUser={handleUpdateUser}
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
          />

          <AddPlacePopup
            onAddCard={handleAddCard}
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
          />

          <DeletePopup
            isOpen={isDeletePopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleDeleteSubmit}
          />
        </SendContext.Provider>

        <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups} />

        <InfoTooltip
          name='successful'
          isOpen={isSuccessful}
          onClose={closeAllPopups}
        />

        <InfoTooltip
          name='error'
          isOpen={isError}
          onClose={closeAllPopups}
        />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
