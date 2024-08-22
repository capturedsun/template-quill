class Con extends Shadow {
    connectedCallback() {
        console.log("it is what it is")
    }
}
window.register(Con, 'con-');