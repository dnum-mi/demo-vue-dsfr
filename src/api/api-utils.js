import { getHealthCheck } from './index.js'

function promiseWithTimeout (promise, timeout) {
  const rejected = new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error('Timeout')), timeout)
  })

  return Promise.race([promise, rejected])
}

export function checkHealth () {
  promiseWithTimeout(getHealthCheck(), 5000)
    .then(() => console.info('L’application peut communiquer avec le serveur'))
    .catch(error => {
      if (error.message === 'Timeout') {
        console.warn('L’application n’a pas pu communiquer avec le serveur')
        return
      }

      console.error(error)
    })
}
