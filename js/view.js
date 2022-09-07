class View {
    constructor(parent) {
        this.root = parent
        this.newFriendAddedEvent = new Event()
    }

    newFriendFormShow() {
        // Si ya existe el formulario, no hacer nada
        if (document.querySelector("div .new-friend")) {
            return
        }
        // Construir el formulario
        const form = document.createElement("div")
        form.className = "new-friend"
        // Necesito input boxes para name, date, importance, periodicity, note
        form.innerHTML = `
        <label>Nombre: <input type="text" id="name"></label>
        <label>Próx. cita: <input type="date" id="date"></label>
        <label>Importancia: <input type="range" min="0" max="100" id="importance"></label>
        <label>Periodicidad: <input type="number" min="1" id="periodicity" value="7"></label>
        <label>Notas: <textarea id="note"></textarea></label>
        <button id="accept">Aceptar</button>
        <button id="cancel">Cancelar</button>
        `
        // Añadir el formulario al DOM
        this.root.appendChild(form)

        // El botón Accept recoge la información del nuevo friend
        const btnAccept = document.getElementById("accept")
        btnAccept.addEventListener("click", () => {
            // Construir el objeto de datos para Friend
            const data = {
                name: document.getElementById("name").value,
                date: document.getElementById("date").value,
                importance: document.getElementById("importance").value,
                periodicity: document.getElementById("periodicity").value,
                note: document.getElementById("note").value
            }
            // Eliminar el formulario
            this.root.removeChild(form)
            // Disparar el evento Nuevo Friend con los datos recogidos
            this.newFriendAddedEvent.trigger(data)
        })

        // El botón Cancel elimina el formulario, sin hacer nada más
        const btnCancel = document.getElementById("cancel")
        btnCancel.addEventListener("click", () => {
            this.root.removeChild(form)
            // newFriendModelCallback({})
        })
    }

    redraw(friends) {
        // Eliminar todos los nodos
        while (this.root.firstChild) {
            this.root.removeChild(this.root.lastChild);
        }

        for(const f of friends) {
            const elem = document.createElement("div")
            elem.className = "container"

            const name = document.createElement("div")
            name.textContent = "Nombre: " + f.name
            const date = document.createElement("div")
            date.textContent = "Cita: " + f.date
            const importance = document.createElement("div")
            importance.textContent = "Importancia: " + f.importance
            const periodicity = document.createElement("div")
            periodicity.textContent = "Periodicidad: " + f.periodicity
            const note = document.createElement("div")
            note.textContent = "Nota: " + f.note
            const history = document.createElement("div")
            history.textContent = "Historia: " + f.history

            elem.appendChild(name)
            elem.appendChild(date)
            elem.appendChild(importance)
            elem.appendChild(periodicity)
            elem.appendChild(note)
            elem.appendChild(history)

            this.root.appendChild(elem)
        }
    }
}