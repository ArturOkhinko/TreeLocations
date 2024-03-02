
class TreeModule {
    #currentNode
    #locations
    #setIsOpen
    #setModalWindowProps
    #citiesInfo

    #findGroup (location, groupType) {
        return location.groups.find((group) => group.type === groupType)
    }
    #openModalWindow (setIsOpen, setModalWindowProps, citiesInfo, DOMElement, name) {
        setIsOpen(true)
        citiesInfo.forEach((city) => city.id === Number(DOMElement.cityId) && setModalWindowProps({city: city.name, residents: city.data, name: name}))
    }

    buildTree (locations = this.#locations, currentNode = this.#currentNode, setIsOpen = this.#setIsOpen, setModalWindowProps = this.#setModalWindowProps, citiesInfo = this.#citiesInfo) {
        this.#currentNode = currentNode
        this.#locations = locations
        this.#setIsOpen = setIsOpen
        this.#setModalWindowProps = setModalWindowProps
        this.#citiesInfo = citiesInfo
        currentNode.innerHTML = ""
        var prioritySystem = {country: 5, city: 4, district: 3, street: 2, home: 1}
        var groupsType = []
        groupsType = locations[0].groups.map((group) => group.type)
        groupsType = groupsType.sort((a,b) => prioritySystem[b] - prioritySystem[a])

        var groupMaxPriority = locations[0].groups.reduce((acc, group) => {
            if(prioritySystem[group] > prioritySystem[acc]) {
                return group
            }
            return acc
        })
        var div = document.createElement("div")
        div.priority = prioritySystem[groupMaxPriority.type]
        div.name = groupMaxPriority.name
        div.type = groupMaxPriority.type
        div.id = locations[0].city_id
        div.innerHTML = groupMaxPriority.name
        currentNode.append(div)
        
        locations.forEach((location) => {
            var i = 0
            var node = currentNode
            var group = this.#findGroup(location, groupsType[i])
            while (i <= groupsType.length) {
                var isNode = false
                for(var child of node.childNodes) {
                    if(group && group.name === child.name) {
                        node = child
                        i++
                        group = this.#findGroup(location, groupsType[i])
                        isNode = true
                        break
                    }
                    if(group === undefined && child.name === location.name) {
                        i++
                        isNode = true
                        break
                    }
                    
                }
                if(isNode === false) {
                    if(group === undefined) {
                        var divFinal = document.createElement("div")
                        divFinal.name = location.name
                        divFinal.type = "name"
                        divFinal.cityId = location.id
                        divFinal.innerHTML = location.name
                        divFinal.style = "cursor:pointer"
                        divFinal.onclick = (e) => this.#openModalWindow(setIsOpen, setModalWindowProps, citiesInfo, e.target , location.name )
                        node.append(divFinal)
                        break
                    } 
                    var div = document.createElement('div')
                    div.name = group.name
                    div.type = group.type
                    div.innerHTML = group.name
                    node.append(div)
                    node = div
                    i++
                    group = this.#findGroup(location, groupsType[i])
                }
            }
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