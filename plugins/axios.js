export default function({ $axios }) {
    if (process.client) {
      const protocol = window.location.protocol
      const hostname = window.location.hostname
      const port = 8000
      const url = `${protocol}//${hostname}:${port}`
      if(port)  url.replace(':','')
      $axios.defaults.baseURL = url
    }
}