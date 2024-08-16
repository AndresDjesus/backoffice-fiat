//Obtener Categories 
export const getCategory = async () => {

    const response = await fetch('http://localhost:3001/api/categories')
    const result = await response.json()
    return result
    
}

//Crear una Category
export const postCategory = async (data) => {

    const response = await fetch('http://localhost:3001/api/categories', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
}

//Modificar una Category
export const putCategory = async (data, id) => {

    const response = await fetch(`http://localhost:3001/api/categories/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
}

//Modificar una categoria Parcialmente
export const patchCategory = async (data) => {

    const response = await fetch('http://localhost:3001/api/categories', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

//Eliminar una Category
export const deleteCategory = async (id) => {
    const response = await fetch(`http://localhost:3001/api/categories/${id}`, {
      method: 'DELETE',
    });
    const result = await response.json();
    return result;
  };

//Obtener Category por Id 

 export const getCategoryById = async (id) => {
    const response = await fetch(`http://localhost:3001/api/categories/${id}`)
    const result = await response.json()
    return result
}
