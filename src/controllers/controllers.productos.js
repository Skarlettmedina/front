export const productos = (req, res)=>{

   const url = "https://proyecto-k4bf.onrender.com/api/productos";
    
    fetch(url)
    .then(respuesta => respuesta.json())
    .then(data=>{

        res.render("views.productos.ejs" , 
        {
            "datos":"productos" ,
            "data":data
        });
    })
    
    .catch(error=>console.error(error))
}
export const registrarProductos = (req, res)=>{
    res.render("views.registro.productos.ejs", {"datos":"skarlett"});
}
 