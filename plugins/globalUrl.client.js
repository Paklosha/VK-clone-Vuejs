export default (context,inject) => {
      const protocol = window.location.protocol
      const hostname = window.location.hostname
      const port = window.location.port
      const url = `${protocol}//${hostname}:${port}`
      if(port)  url.replace(':','')
    // Inject $url in Vue, context and store.
      inject('url', url)
  }