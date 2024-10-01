//Crear un usuario
export const postUser = async (data) => {

    const response = await fetch('http://localhost:3001/api/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
}

//Modificar Usuario
export const putUser = async (data, id) => {
    const response = await fetch(`http://localhost:3001/api/user/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
  }
  

//Modificar un Usuario parcialmente
export const patchUser = async (data) => {

    const response = await fetch('http://localhost:3001/api/user', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
}

//Eliminar usuario
export const deleteUser = async (id) => {
    const response = await fetch(`http://localhost:3001/api/user/${id}`, {
      method: 'DELETE',
    });
    const result = await response.json();
    return result;
  };

//Obtener todos los vehiculos
export const getUser = async () => {
    const response = await fetch('http://localhost:3001/api/user')
    const result = await response.json()
    return result
}

//Obtener un vehiculo por id
export const getUserById = async (id) => {
    const response = await fetch(`http://localhost:3001/api/user/${id}`)
    const result = await response.json()
    return result
}