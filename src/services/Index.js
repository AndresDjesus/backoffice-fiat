//Obtener Index
export const getIndex = async () => {

    const response = await fetch('http://localhost:3001/api/index')
    const result = await response.json()
    return result
    
}

//Crear una Index
export const postIndex = async (data) => {

    const response = await fetch('http://localhost:3001/api/index', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
}

//Modificar un Index
export const putIndex = async (data, id) => {

    const response = await fetch(`http://localhost:3001/api/index/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
}

//Modificar un Index Parcialmente
export const patchIndex = async (data) => {

    const response = await fetch('http://localhost:3001/api/index', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

//Eliminar un Index
export const deleteIndex = async (id) => {
    const response = await fetch(`http://localhost:3001/api/index/${id}`, {
      method: 'DELETE',
    });
    const result = await response.json();
    return result;
  };

//Obtener Index por Id 

 export const getIndexById = async (id) => {
    const response = await fetch(`http://localhost:3001/api/index/${id}`)
    const result = await response.json()
    return result
}