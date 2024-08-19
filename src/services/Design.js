//Obtener Designs
export const getDesigns = async () => {
    
    const response = await fetch('http://localhost:3001/api/design')
    const result = await response.json()
    return result
}

//Obtener Design por Id 
export const getDesignById = async (id) => {
    
    const response = await fetch(`http://localhost:3001/api/design/${id}`)
    const result = await response.json()
    return result
}

//Crear un Design
export const postDesign = async (data) => {    

    const response = await fetch('http://localhost:3001/api/design', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
}

//Modificar un Design
export const putDesign = async (data, id) => {

    const response = await fetch(`http://localhost:3001/api/design/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
}

//Modificar un Design parcialmente
export const patchDesign = async (data, id) => {
    
    const response = await fetch(`http://localhost:3001/api/design/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
}

//Eliminar un Design
export const deleteDesign = async (id) => {
    const response = await fetch(`http://localhost:3001/api/design/${id}`, {
      method: 'DELETE',
    });
    const result = await response.json();
    return result;
  };
