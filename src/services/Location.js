//Obtener Location
export const getLocation = async () => {
    
    const response = await fetch('http://localhost:3001/api/location')
    const result = await response.json()
    return result
}

//Obtener un Location por ID
export const getLocationById = async (id) => {
    
    const response = await fetch(`http://localhost:3001/api/location/${id}`)
    const result = await response.json()
    return result
}

//Crear una Location
export const postLocation = async (data) => {

    const response = await fetch('http://localhost:3001/api/location', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
}

//Modificar una Location
export const putLocation = async (data, id) => {

    const response = await fetch(`http://localhost:3001/api/location/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
}

//Modificar Location Parcialmente
export const patchLocation = async (data) => {
    
    const response = await fetch('http://localhost:3001/api/location', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
}

//Eliminar Location

export const deleteLocation = async (id) => {
    const response = await fetch(`http://localhost:3001/api/location/${id}`, {
      method: 'DELETE',
    });
    const result = await response.json();
    return result;
  };
