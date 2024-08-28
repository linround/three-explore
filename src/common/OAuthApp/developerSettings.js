
import { Octokit } from '@octokit/core'


export function getGithubAccessToken({ code, }) {
  const data = {
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
    .then((response) => response.json())
    .catch((error) => {
      console.log('error+++++++++', error)
    })
}

export  function getGithubUser({ accessToken, }) {
  const octokit = new Octokit({ auth: accessToken, })
  return octokit.request('GET /user')
}
