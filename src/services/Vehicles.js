//Crear un vehiculo
export const postVehicles = async (data) => {

    const response = await fetch('http://localhost:3001/api/vehicles', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
}

//Modificar un vehiculo totalmente
export const putVehicles = async (data, id) => {
    const response = await fetch(`http://localhost:3001/api/vehicles/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
  }
  

//Modificar un vehiculo parcialmente
export const patchVehicles = async (data) => {

    const response = await fetch('http://localhost:3001/api/vehicles', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
}

//Eliminar un vehiculo
export const deleteVehicles = async (data, id) => {

    const response = await fetch(`http://localhost:3001/api/vehicles${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
}

//Obtener todos los vehiculos
export const getVehicles = async () => {
    const response = await fetch('http://localhost:3001/api/vehicles')
    const result = await response.json()
    return result
}

//Obtener un vehiculo por id
export const getVehicleById = async (id) => {
    const response = await fetch(`http://localhost:3001/api/vehicles/${id}`)
    const result = await response.json()
    return result
}