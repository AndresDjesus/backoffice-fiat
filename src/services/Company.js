// Obtener empresa
export const getCompanys = async () => {
    
    const response = await fetch('http://localhost:3001/api/company')
    const result = await response.json()
    return result
}

//Obtener empresa por Id 
export const getCompanyById = async (id) => {
    
    const response = await fetch(`http://localhost:3001/api/company/${id}`)
    const result = await response.json()
    return result
}

//Crear una Empresa
export const postCompany = async (data) => {    

    const response = await fetch('http://localhost:3001/api/company', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
}

//Modificar una Empresa
export const putCompany = async (data, id) => {

    const response = await fetch(`http://localhost:3001/api/company/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
}

//Modificar una emepresa parcialmente
export const patchCompany = async (data, id) => {
    
    const response = await fetch(`http://localhost:3001/api/company/${id}`, {
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
export const deleteCompany = async (id) => {
    const response = await fetch(`http://localhost:3001/api/company/${id}`, {
      method: 'DELETE',
    });
    const result = await response.json();
    return result;
  };
