class Home extends Shadow {
    connectedCallback() {
        console.log("home")
    }
}
window.register(Home, 'home-');