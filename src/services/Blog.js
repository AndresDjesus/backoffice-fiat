//Obtener Blog 
export const getBlog = async () => {

    const response = await fetch('http://localhost:3001/api/blog')
    const result = await response.json()
    return result
    
}

//Obtener Blog por ID
export const getBlogById = async (id) => {
   const response = await fetch(`http://localhost:3001/api/blog/${id}`)
   const result = await response.json()
   return result
}

//Crear un Blog
export const postBlog = async (data) => {

    const response = await fetch('http://localhost:3001/api/blog', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
}

//Modificar un Blog
export const putBlog = async (data, id) => {

    const response = await fetch(`http://localhost:3001/api/blog/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
}

//Modificar un Blog Parcialmente
export const patchBlog = async (data) => {

    const response = await fetch('http://localhost:3001/api/blog', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

//Eliminar un Blog
export const deleteBlog = async (id) => {
    const response = await fetch(`http://localhost:3001/api/blog/${id}`, {
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