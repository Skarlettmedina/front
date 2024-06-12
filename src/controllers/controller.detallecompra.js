export const detalle = (req, res)=>{

    const url = "https://proyecto-k4bf.onrender.com/api/detalle";
     
     fetch(url)
     .then(respuesta => respuesta.json())
     .then(data=>{
 
         res.render("views.detallecompra.ejs" , 
         {
             "datos":"detalle",
             "data":data
         });
     })
     
     .catch(error=>console.error(error))
 }

