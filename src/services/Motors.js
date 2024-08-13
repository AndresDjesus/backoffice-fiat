//Obtener Motors
const getMotors = async () => {

    const response = await fetch('http://localhost:3001/api/motors')
    const result = await response.json()
    return result
}

//Crear un Motor
const postMotor = async (data) => {
    
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
const putMotor = async (data) => {

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
const patchMotor = async (data) => {
    
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
const deleteMotor = async (data) => {
    
    const response = await fetch('http://localhost:3001/api/motors', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
}

module.exports = { 
    getMotors,
    postMotor,
    putMotor,
    patchMotor,
    deleteMotor
}

