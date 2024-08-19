export  const clientID = 'Ov23liNiL6TklEJ3CZNV'
export const clientSecret = '2ee19f0a65fdb6e5f10ff359fa8cf43312694d2e'

export function getGithubAccessToken({ code, }) {
  const data = {
    // eslint-disable-next-line camelcase
    client_id: clientID,
    // eslint-disable-next-line camelcase
    client_secret: clientSecret,
    code,
  }
  return fetch('/githubAccessToken', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(data),

  })
    .then((response) => {

      console.log('response+++++++++', response)
      return  response.json()
    })
    .then((data) => {
      console.log('data++++++++++', data)
    })
    .catch((error) => {
      console.log('error+++++++++', error)
    })
}
