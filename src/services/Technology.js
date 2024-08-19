//Obtener Technologies 
export const getTechnology = async () => {

    const response = await fetch('http://localhost:3001/api/technology')
    const result = await response.json()
    return result
}

//Obtener technology por id

export const getTechnologyById = async (id) => {
    
    const response = await fetch(`http://localhost:3001/api/technology/${id}`)
    const result = await response.json()
    return result
}
//Crear una Technology
export const postTechnology = async (data) => {

    const response = await fetch('http://localhost:3001/api/technology', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
}

//Modificar una Technology
export const putTechnology = async (data, id) => {

    const response = await fetch(`http://localhost:3001/api/technology/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
}

//Modificar una Technology Parcialmente
export const patchTechnology = async (data) => {
    
    const response = await fetch('http://localhost:3001/api/technology', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
}

//Eliminar una Technology

export const deleteTechnology = async (id) => {
    const response = await fetch(`http://localhost:3001/api/technology/${id}`, {
      method: 'DELETE',
    });
    const result = await response.json();
    return result;
  };
