// Obtener imagenes 
export const getImages = async () => {
    
    const response = await fetch('http://localhost:3001/api/images')
    const result = await response.json()
    return result
}

// Obtener Imagen por ID
export const getImageById = async (id) => {
    const response = await fetch(`http://localhost:3001/api/images/${id}`)
    const result = await response.json()
    return result
}

// Crear imagen 
export const postImage = async (data) => {

    const response = await fetch('http://localhost:3001/api/images', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
}

//Modificar imagen usando Put
export const putImage = async (data, id) => {
    const response = await fetch(`http://localhost:3001/api/images/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
}

// Modificar imagen con patch
export const patchImage = async (data, id) => {
    const response = await fetch(`http://localhost:3001/api/images/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
}

// Eliminar imagen
export const deleteImage = async (id) => {
    const response = await fetch(`http://localhost:3001/api/images/${id}`, {
        method: 'DELETE'
    })
    const result = await response.json()
    return result
}
