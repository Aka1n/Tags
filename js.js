class Tags {

    #_tags = localStorage
    #_readOnly = false
    tagsHTML = document.getElementsByClassName("tags")
    closeHTML = document.getElementsByClassName("close")
    button = document.getElementById("button")
    input = document.getElementById('input')
    clear = document.getElementById('clear')
    checkbox = document.getElementById('checkbox')

    createTag(id, value) {
        let tag = document.createElement("div")
        tag.id = id
        tag.className = "tag"
        tag.innerHTML = `<div class="text">${value}</div><div class="close">+</div>`
        return tag
    }

    getTags() {
        const tags = JSON.parse(this.#_tags.getItem('tags'))
        return tags
    }

    setTag(text) {
        let obj = {
            id: 0,
            value: text
        }
        if (this.getTags() === null || this.getTags().length === 0) {
            this.#_tags.setItem('tags', JSON.stringify([obj]))
        } else {
            obj.id = this.getTags()[this.getTags().length - 1].id + 1
            this.#_tags.setItem('tags', JSON.stringify([...this.getTags(), obj]))
        }
        this.addTags()
    }

    deleteTag(id) {
        let array = this.getTags().filter((el) => el.id !== +id)
        this.#_tags.setItem('tags', JSON.stringify(array))
    }

    clearTags() {
        this.#_tags.clear()
        this.addTags()
    }

    getCheckBox() {
        return this.#_readOnly
    }

    setCheckBox() {
        this.#_readOnly = !this.#_readOnly
    }

    addTags() {

        this.tagsHTML[0].innerHTML = ''

        if (this.getTags() === null || this.getTags().length === 0) return

        this.getTags().forEach((el) => {
            const tag = this.createTag(el.id, el.value)
            this.tagsHTML[0].append(tag)
        })

        Array.from(this.closeHTML).forEach((e) => {
            e.addEventListener('click', () => {
                this.deleteTag(e.parentElement.id)
                e.parentElement.remove()
            })
        })
    }

}


const tags = new Tags()

tags.addTags()

tags.button.addEventListener('click', () => {
    if (tags.input.value.length !== 0) {
        tags.setTag(tags.input.value)
        tags.input.value = ""
    }
})

tags.clear.addEventListener('click', () => tags.clearTags())

tags.checkbox.addEventListener('click', (e) => {
    tags.setCheckBox()
    if (tags.getCheckBox()) {
        tags.button.disabled = true
        tags.input.disabled = true
        tags.clear.className = "clear disabled"
        Array.from(tags.closeHTML).forEach((el) => {
            el.className = "close disabled"
        })
    } else {
        tags.button.disabled = false
        tags.input.disabled = false
        tags.clear.className = "clear"
        Array.from(tags.closeHTML).forEach((el) => {
            el.className = "close"
        })
    }
})