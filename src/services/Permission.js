//Crear un Permission
export const postPermission = async (data) => {

    const response = await fetch('http://localhost:3001/api/permission', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
}

//Modificar un Permission totalmente
export const putPermission = async (data, id) => {
    const response = await fetch(`http://localhost:3001/api/permission/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
  }
  

//Modificar un Permission parcialmente
export const patchPermission = async (data) => {

    const response = await fetch('http://localhost:3001/api/permission', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
}

//Eliminar permission
export const deletePermission = async (id) => {
    const response = await fetch(`http://localhost:3001/api/permission/${id}`, {
      method: 'DELETE',
    });
    const result = await response.json();
    return result;
  };

//Obtener todos los permissions
export const getPermission = async () => {
    const response = await fetch('http://localhost:3001/api/permission')
    const result = await response.json()
    return result
}

//Obtener un permission por id
export const getPermissionById = async (id) => {
    const response = await fetch(`http://localhost:3001/api/permission/${id}`)
    const result = await response.json()
    return result
}