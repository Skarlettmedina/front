import { create } from 'html-pdf';
import { exec } from 'child_process';


export const generar = async (req, res) => {
    const { nombrep, precio, cantidad, totalcompra } = req.query;

    // HTML que quieres convertir a PDF
    const htmlContent = `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Factura</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 100px;
            background-color: #d09ef2;
        }
        .container {
            max-width: 600px;
            height: 800px;
            margin: 20px auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            position: relative;
            overflow: hidden;
            page-break-inside: avoid;
        }
        .header-image {
            position: absolute;
            top: 10px;
            right: 10px;
            max-width: 150px;
            height: auto;
            border-radius: 100px;
            margin: 35px;
        }
        h1 {
            color: #1b0129;
            text-align: center;
            margin-bottom: 80px;
        }
        p {
            color: #0d0202;
            line-height: 1.6;
        }
        .invoice-details {
            margin-bottom: 20px;
            border-bottom: 1px solid #1b0129;
            padding-bottom: 10px;
        }
        .invoice-details p {
            margin: 5px 0;
        }
    </style>
</head>
<body>
    <div class="container">

        <img src="	https://avatars.githubusercontent.com/u/148906923?v=4" alt="Imagen" class="header-image">
        <h1>Factura</h1>
        <div class="invoice-details">
            <p><strong>Nombre del producto:</strong> ${nombrep}</p>
            <p><strong>Precio unitario:</strong> ${precio}</p>
            <p><strong>Cantidad:</strong> ${cantidad}</p>
            <p><strong>Total:</strong> ${totalcompra}</p>
        </div>
    </div>
</body>
</html>
`;

    // Opciones para la generación del PDF
    const options = {
      format: 'Letter',
      border: {
          top: "1in", 
          right: "0.5in",
          bottom: "1in",
          left: "0.5in"
      }
  };

    // Convertir HTML a PDF
    create(htmlContent, options).toFile(`./documento${nombrep}.pdf`, function (err, res) {
        if (err) {
            console.log(err);
            return res.status(500).send('Error al generar el PDF');
        }

        // Abrir el archivo PDF en una nueva ventana después de crearlo
        exec(`start ./documento${nombrep}.pdf`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error al abrir el archivo: ${error.message}`);
                return res.status(500).send('Error al abrir el PDF');
            }
            if (stderr) {
                console.error(`Error: ${stderr}`);
                return res.status(500).send('Error al abrir el PDF');
            }
            console.log(`Archivo PDF abierto correctamente.`);
        });
    });
};
