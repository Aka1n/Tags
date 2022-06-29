class Tags {

    #_tags = localStorage
    closeHTML = document.getElementsByClassName("close")
    button = document.getElementById("button")
    input = document.getElementById('input')
    clear = document.getElementById('clear')
    tagsHTML = document.getElementsByClassName("tags")
    checkbox = document.getElementById('checkbox')

    getTags() {
        return this.#_tags
    }

    getTagsArray() {
        return JSON.parse(this.#_tags.getItem('tags'))
    }

    setTag(text) {
        const obj = {
            id: 0,
            value: text
        }
        if (this.getTagsArray() === null || this.getTagsArray().length === 0) {
            this.#_tags.setItem('tags', JSON.stringify([obj]))
        } else {
            obj.id = this.getTagsArray()[this.getTagsArray().length - 1].id + 1
            this.#_tags.setItem('tags', JSON.stringify([...this.getTagsArray(), obj]))
        }
    }

    clearTags() {
        this.#_tags.clear()
    }

}

class Render extends Tags {

    getTagsArray() {
        return super.getTagsArray();
    }

    render() {

        const deleteTag = new Delete()
        const createTag = new Create()

        this.tagsHTML[0].innerHTML = ''

        if (this.getTagsArray() === null || this.getTagsArray().length === 0) return

        this.getTagsArray().forEach((el) => {
            createTag.setTag(el.id, el.value)
            this.tagsHTML[0].append(createTag.getTag())
        })

        Array.from(this.closeHTML).forEach((e) => {
            e.addEventListener('click', () => {
                deleteTag.setDelete(e.parentElement.id)
                e.parentElement.remove()
            })
        })
    }
}

class ReadOnly {

    #_readOnly = false

    getReadOnly() {
        return this.#_readOnly
    }
    setReadOnly(){
        this.#_readOnly = !this.#_readOnly
    }
}

class Create {

    #_tag

    getTag() {
        return this.#_tag
    }
    setTag(id, value) {
        let tag = document.createElement("div")
        tag.id = id
        tag.className = "tag"
        tag.innerHTML = `<div class="text">${value}</div><div class="close">+</div>`
        this.#_tag = tag
    }
}

class Delete extends Tags {

    getTags() {
        return super.getTags();
    }
    getTagsArray() {
        return super.getTagsArray();
    }

    setDelete(id) {
        let array = this.getTagsArray().filter((el) => el.id !== +id)
        this.getTags().setItem('tags', JSON.stringify(array))

    }
}


const tags = new Tags()
const render = new Render()
const readOnly = new ReadOnly()
render.render()

tags.button.addEventListener('click', () => {
    if (tags.input.value.length !== 0) {
        tags.setTag(tags.input.value)
        render.render()
        tags.input.value = ""
    }
})

tags.clear.addEventListener('click', () => {
    tags.clearTags()
    render.render()
})

tags.checkbox.addEventListener('click', () => {
    readOnly.setReadOnly()
    if (readOnly.getReadOnly()) {
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