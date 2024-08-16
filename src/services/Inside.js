//Obtener Insides 
export const getInsides = async () => {
    
    const response = await fetch('http://localhost:3001/api/inside')
    const result = await response.json()
    return result
}

//Obtener un Inside por ID
export const getInsideById = async (id) => {
    
    const response = await fetch(`http://localhost:3001/api/inside/${id}`)
    const result = await response.json()
    return result
}

//Crear un Inside
export const postInside = async (data) => {

    const response = await fetch('http://localhost:3001/api/inside', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
}

//Modificar un Inside 
export const putInside = async (data, id) => {

    const response = await fetch(`http://localhost:3001/api/inside/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
}

//Modificar un Inside Parcialmente
export const patchInside = async (data) => {
    
    const response = await fetch('http://localhost:3001/api/inside', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
}

//Eliminar un Inside

export const deleteInside = async (id) => {
    const response = await fetch(`http://localhost:3001/api/categories/${id}`, {
      method: 'DELETE',
    });
    const result = await response.json();
    return result;
  };
