const postVehicles = async (data) => {

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

const getCategory = async () => {

    const response = await fetch('http://localhost:3001/api/categories')
    const result = await response.json()
    return result
    
}

const getCombustible = async () => {

    const response = await fetch('http://localhost:3001/api/combustible')
    const result = await response.json()
    return result
}

const getMotors = async () => {

    const response = await fetch('http://localhost:3001/api/motors')
    const result = await response.json()
    return result
}

const getInsides = async () => {
    
    const response = await fetch('http://localhost:3001/api/inside')
    const result = await response.json()
    return result
}

const getDesigns = async () => {
    
    const response = await fetch('http://localhost:3001/api/design')
    const result = await response.json()
    return result
}

const getTechnology = async () => {

    const response = await fetch('http://localhost:3001/api/technology')
    const result = await response.json()
    return result
}
module.exports = { 
    postVehicles,
    getCategory,
    getCombustible,
    getMotors,
    getInsides,
    getDesigns,
    getTechnology
}