//Obtener Advertising
export const getAdvertising = async () => {
    
    const response = await fetch('http://localhost:3001/api/advertising')
    const result = await response.json()
    return result
}

//Obtener Advertising por ID
export const getAdvertisingById = async (id) => {
    
    const response = await fetch(`http://localhost:3001/api/advertising/${id}`)
    const result = await response.json()
    return result
}

//Crear Advertising
export const postAdvertising = async (data) => {

    const response = await fetch('http://localhost:3001/api/advertising', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
}

// Modificar Advertising Put 

export const putAdvertising = async (data, id) => {

    const response = await fetch(`http://localhost:3001/api/advertising/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
}

// Modificar Advertising Patch

export const patchAdvertising = async (data) => {
    
    const response = await fetch('http://localhost:3001/api/advertising', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
}

//Eliminar Advertising

export const deleteAdvertising = async (id) => {
    const response = await fetch(`http://localhost:3001/api/advertising/${id}`, {
      method: 'DELETE',
    });
    const result = await response.json();
    return result;
  };