class Store {

    getStore() {
        return JSON.parse(localStorage.getItem('tags'))
    }

    setStore(value) {

        let obj = {
            id: 0,
            value
        }
        if (this.getStore() === null || this.getStore().length === 0) {
            localStorage.setItem('tags', JSON.stringify([obj]))
        } else {
            obj.id = this.getStore()[this.getStore().length - 1].id + 1
            localStorage.setItem('tags', JSON.stringify([...this.getStore(), obj]))
        }
    }

    clearStore() {
        localStorage.clear()
    }

    removeStore(id) {
        let array = this.getStore().filter((el) => el.id !== +id)
        localStorage.setItem('tags', JSON.stringify(array))
    }

}

class Render {

    tagsHTML = document.getElementsByClassName("tags")
    closeHTML = document.getElementsByClassName("close")

    create(id, value) {
        let tag = document.createElement("div")
        tag.id = id
        tag.className = "tag"
        tag.innerHTML = `<div class="text">${value}</div><div class="close">+</div>`
        return tag
    }

    render(store) {

        this.tagsHTML[0].innerHTML = ''

        if (store.getStore() === null || store.getStore().length === 0) return

        store.getStore().forEach((el) => {
            const tag = this.create(el.id, el.value)
            this.tagsHTML[0].append(tag)
        })

        Array.from(this.closeHTML).forEach((e) => {
            e.addEventListener('click', () => {
                store.removeStore(e.parentElement.id)
                e.parentElement.remove()
            })
        })
    }
}

class HZ {

    closeHTML = document.getElementsByClassName("close")
    button = document.getElementById("button")
    input = document.getElementById('input')
    clear = document.getElementById('clear')
    checkbox = document.getElementById('checkbox')

    readOnly = false

    setCheckBox() {
        this.readOnly = !this.readOnly
    }
}

const store = new Store()
const render = new Render()
const hz = new HZ()


render.render(store)

hz.checkbox.addEventListener('click', () => {
    hz.setCheckBox()
    if (hz.readOnly) {
        hz.button.disabled = true
        hz.input.disabled = true
        hz.clear.className = "clear disabled"
        Array.from(hz.closeHTML).forEach((el) => {
            el.className = "close disabled"
        })
    } else {
        hz.button.disabled = false
        hz.input.disabled = false
        hz.clear.className = "clear"
        Array.from(hz.closeHTML).forEach((el) => {
            el.className = "close"
        })
    }
})

hz.clear.addEventListener('click', () => {
    store.clearStore()
    render.render(store)
})

hz.button.addEventListener('click', () => {
    if (hz.input.value.length !== 0) {
        store.setStore(hz.input.value)
        render.render(store)
        hz.input.value = ""
    }
})
