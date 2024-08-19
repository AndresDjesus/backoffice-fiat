//Obtener Services
export const getServices = async () => {
    
    const response = await fetch('http://localhost:3001/api/services')
    const result = await response.json()
    return result
}

//Obtener un service por ID
export const getServiceById = async (id) => {
    
    const response = await fetch(`http://localhost:3001/api/services/${id}`)
    const result = await response.json()
    return result
}

//Crear un service
export const postService = async (data) => {

    const response = await fetch('http://localhost:3001/api/services', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
}

//Modificar un service 
export const putService = async (data, id) => {

    const response = await fetch(`http://localhost:3001/api/services/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
}

//Modificar un service Parcialmente
export const patchService = async (data) => {
    
    const response = await fetch('http://localhost:3001/api/services', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
}

//Eliminar un service

export const deleteService = async (id) => {
    const response = await fetch(`http://localhost:3001/api/services/${id}`, {
      method: 'DELETE',
    });
    const result = await response.json();
    return result;
  };
