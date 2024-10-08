const methods = {
    GET: 'GET',
    POST: 'POST',
    PATCH: 'PATCH',
    PUT: 'PUT',
    DELETE: 'DELETE',
}

const paths = {
    me: () => '/users/me',
    cards: () => '/cards',
    card: (id) => `/cards/${id}`,
    likeCard: (id) => `/cards/likes/${id}`
}

const config = {
    baseUrl: 'https://nomoreparties.co/v1/cohort-magistr-2',
    headers: {
        authorization: '943f231f-d660-43df-8e7f-0756e8f3513d',
        'Content-Type': 'application/json'
    }
}

const checkResult = res => {
    if (res.ok) {
        return res.json()
    }
    return Promise.reject(`Упс...: ${res.status}`)
}

export const API = ({ url, method = methods.GET, body }) => {
    return fetch(`${config.baseUrl}/${url}`, {
        method,
        headers: config.headers,
        body: JSON.stringify(body),
    })
}

const getUser = () => API({ url: paths.me() }).then(checkResult)
const updateUser = (body) => API({ url: paths.me(), method: methods.PATCH, body }).then(checkResult)
const updateAvatar = (body) => API({ url: `${paths.me()}/avatar`, method: methods.PATCH, body }).then(checkResult)

const getCards = () => API({ url: paths.cards() }).then(checkResult)
const createCard = (body) => API({ url: paths.cards(), method: methods.POST, body }).then(checkResult)
const removeCard = (id) => API({ url: paths.card(id), method: methods.DELETE }).then(checkResult)

const addLike = (id) => API({ url: paths.likeCard(id), method: methods.PUT }).then(checkResult)
const removeLike = (id) => API({ url: paths.likeCard(id), method: methods.DELETE }).then(checkResult)

export const apiRequests = {
    getUser,updateUser,updateAvatar,getCards,createCard,removeCard,addLike,removeLike,
}