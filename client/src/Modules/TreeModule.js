
class TreeModule {
    #currentNode
    #locations
    #setIsOpen
    #setModalWindowProps
    #citiesInfo

    #findGroup (location, groupType) {
        return location.groups.find((group) => group.type === groupType)
    }
    #createElement (type, name, innerHTML, city_id) {
        const div = document.createElement("div")
        div.name = name
        div.type = type
        div.innerHTML = innerHTML ? innerHTML : name
        if(city_id) {
            div.city_id = city_id
        }
        return div
    }
    #openModalWindow (setIsOpen, setModalWindowProps, citiesInfo, DOMElement, name) {
        setIsOpen(true)
        citiesInfo.forEach((city) => {
            city.id === Number(DOMElement.city_id) && setModalWindowProps({city: city.name, residents: city.data, name: name})
        })
    }

    buildTree (locations = this.#locations, currentNode = this.#currentNode, setIsOpen = this.#setIsOpen, setModalWindowProps = this.#setModalWindowProps, citiesInfo = this.#citiesInfo) {
        this.#currentNode = currentNode
        this.#locations = locations
        this.#setIsOpen = setIsOpen
        this.#setModalWindowProps = setModalWindowProps
        this.#citiesInfo = citiesInfo
        currentNode.innerHTML = ""
        currentNode.name = "currentNode"

        var prioritySystem = {country: 5, city: 4, district: 3, street: 2, home: 1}
        var groupsType = []
        groupsType = locations[0].groups.map((group) => group.type)
        groupsType = groupsType.sort((a,b) => prioritySystem[b] - prioritySystem[a])

        locations.forEach((location) => {
            var i = 0
            var build = (node) => {

                var groupLocation = this.#findGroup(location, groupsType[i])
        
                if(i === groupsType.length) {
                    var div = this.#createElement(location.type, location.name, location.name, location.id)
                    div.onclick = (e) => this.#openModalWindow(this.#setIsOpen, this.#setModalWindowProps, this.#citiesInfo, e.target, location.name)
                    div.style = "cursor:pointer"
                    node.append(div)
                    return
                }

                var isNode = false
                for(var child of node.childNodes) {
                    if(child.name === groupLocation.name) {
                        isNode = true
                        i++
                        build(child)
                    }
                }
                if(isNode === false) {
                    var div = this.#createElement(groupLocation.type, groupLocation.name)
                    node.append(div)
                    i++
                    build(div)
                }
            }
            build(this.#currentNode)
        })
    }

    changeConfiguration (configuration) {
        var removeLayers = (node) => {
            if (!node) {
                return;
            }
            var children = [...node.children]
            if(children[0] === undefined) {
                return
            }
            children.forEach((child) => {
                if(child.type && !configuration.has(child.type)) {
                    var parent = node
                    
                    for(var childNode of child.children) {
                        parent.append(childNode)
                    }
                    child.remove()
                    removeLayers(parent)
                }
                removeLayers(child)
            });
        }
        removeLayers(this.#currentNode)
    }

}

export default new TreeModule()