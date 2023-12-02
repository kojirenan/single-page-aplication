export class Router {
  routes = {}

  setObject = {
    "/": document.querySelector('#home'),
    "/universe": document.querySelector('#universe'),
    "/exploration": document.querySelector('#exploration'),
  }

  colorSet() {
    const { pathname } = window.location
    const object = this.setObject[pathname]

    this.setObject["/"].removeAttribute('class')
    this.setObject["/universe"].removeAttribute('class')
    this.setObject["/exploration"].removeAttribute('class')
    object.setAttribute('class', 'check')
  }

  add(routeName, page) {
    this.routes[routeName] = page
  }

  route(event) {
    event = event || window.event
    event.preventDefault()

    window.history.pushState({}, "", event.target.href)

    this.handle()
  }

  handle() {
    const { pathname } = window.location
    const route = this.routes[pathname]

    fetch(route)
      .then(data => data.text())
      .then(html => document.querySelector('#app').innerHTML = html)

    this.colorSet()
  }
}