const cordOptions = {
    // ERROR AQUÍ: Decía 'orgin'. Debe ser 'origin'
    origin: true, 
    credentials: true,
    methods: "GET,POST,PUT,DELETE,PATCH,OPTIONS",
    allowedHeaders: "Content-Type,Authorization"
}

export { cordOptions }