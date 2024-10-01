//Crear un Role
export const postRole = async (data) => {

    const response = await fetch('http://localhost:3001/api/role', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
}

//Modificar Role
export const putRole = async (data, id) => {
    const response = await fetch(`http://localhost:3001/api/role/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
  }
  

//Modificar un Role parcialmente
export const patchRole = async (data) => {

    const response = await fetch('http://localhost:3001/api/role', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
}

//Eliminar role
export const deleteRole = async (id) => {
    const response = await fetch(`http://localhost:3001/api/role/${id}`, {
      method: 'DELETE',
    });
    const result = await response.json();
    return result;
  };

//Obtener todos los roles
export const getRole = async () => {
    const response = await fetch('http://localhost:3001/api/role')
    const result = await response.json()
    return result
}

//Obtener un vehiculo por id
export const getRoleById = async (id) => {
    const response = await fetch(`http://localhost:3001/api/role/${id}`)
    const result = await response.json()
    return result
}