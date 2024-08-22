// Obtener Footer
export const getFooter = async () => {
    
    const response = await fetch('http://localhost:3001/api/footer')
    const result = await response.json()
    return result
}

//Obtener footer por Id 
export const getFooterById = async (id) => {
    
    const response = await fetch(`http://localhost:3001/api/footer/${id}`)
    const result = await response.json()
    return result
}

//Crear un Footer
export const postFooter = async (data) => {    

    const response = await fetch('http://localhost:3001/api/footer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
}

//Modificar un Footer 
export const putFooter = async (data, id) => {

    const response = await fetch(`http://localhost:3001/api/footer/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
}

//Modificar un Footer parcialmente
export const patchFooter = async (data, id) => {
    
    const response = await fetch(`http://localhost:3001/api/footer/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
}

//Eliminar un Perfil
export const deleteFooter = async (id) => {
    const response = await fetch(`http://localhost:3001/api/footer/${id}`, {
      method: 'DELETE',
    });
    const result = await response.json();
    return result;
  };
