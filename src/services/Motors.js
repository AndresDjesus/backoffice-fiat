//Obtener Motors
export const getMotors = async () => {

    const response = await fetch('http://localhost:3001/api/motors')
    const result = await response.json()
    return result
}

//Obtener Motor por ID
export const getMotorById = async (id) => {

    const response = await fetch(`http://localhost:3001/api/motors/${id}`)
    const result = await response.json()
    return result   
}

//Crear un Motor
export const postMotor = async (data) => {
    
    const response = await fetch('http://localhost:3001/api/motors', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
}

//Modificar un Motor 
export const putMotor = async (data) => {

    const response = await fetch('http://localhost:3001/api/motors', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
}

//Modificar un Motor Parcialmente
export const patchMotor = async (data) => {
    
    const response = await fetch('http://localhost:3001/api/motors', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
}

//Eliminar un Motor
export const deleteMotor = async (id) => {
    const response = await fetch(`http://localhost:3001/api/motors/${id}`, {
      method: 'DELETE',
    });
    const result = await response.json();
    return result;
  };

