// Obtener perfiles de la empresa
export const getCompanys = async () => {
    
    const response = await fetch('http://localhost:3001/api/company')
    const result = await response.json()
    return result
}

//Obtener Perfil por Id 
export const getCompanyById = async (id) => {
    
    const response = await fetch(`http://localhost:3001/api/companyProfile/${id}`)
    const result = await response.json()
    return result
}

//Crear un Perfil
export const postCompanyProfile = async (data) => {    

    const response = await fetch('http://localhost:3001/api/companyProfile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
}

//Modificar un Perfil
export const putCompanyProfile = async (data, id) => {

    const response = await fetch(`http://localhost:3001/api/companyProfile/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
}

//Modificar un Perfil parcialmente
export const patchCompanyProfile = async (data, id) => {
    
    const response = await fetch(`http://localhost:3001/api/companyProfile/${id}`, {
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
export const deleteCompanyProfile = async (id) => {
    const response = await fetch(`http://localhost:3001/api/companyProfile/${id}`, {
      method: 'DELETE',
    });
    const result = await response.json();
    return result;
  };
