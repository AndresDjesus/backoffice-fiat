//Obtener Combustibles

export const getCombustible = async () => {

    const response = await fetch('http://localhost:3001/api/combustible')
    const result = await response.json()
    return result
}

//Obtener combustible por id 
export const getCombustibleById = async (id) => {
    
    const response = await fetch(`http://localhost:3001/api/combustible/${id}`)
    const result = await response.json()
    return result
}

//Crear un Combustible
export const postCombustible = async (data) => {

    const response = await fetch('http://localhost:3001/api/combustible', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
}

//Modificar un Combustible
export const putCombustible = async (data, id) => {

    const response = await fetch(`http://localhost:3001/api/combustible/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
}

//Modificar un Combustible parcialmente
export const patchCombustible = async (data) => {

    const response = await fetch('http://localhost:3001/api/combustible', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
}

//Eliminar un Combustible

export const deleteCombustible = async (id) => {
    const response = await fetch(`http://localhost:3001/api/combustible/${id}`, {
      method: 'DELETE',
    });
    const result = await response.json();
    return result;
  };

