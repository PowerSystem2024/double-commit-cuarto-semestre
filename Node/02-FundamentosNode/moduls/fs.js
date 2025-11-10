const fs = require('fs');

function leer(ruta, cb) {
    fs.readFileSync(ruta, (err, data) => {

    })
}

leer(`${__dirname}/archivo.txt`, console.log);

function escribir(ruta, contenido, cb) {
    fs.writeFile(ruta, contenido, function (err) {
        if (err) {
            console.log('No se ha podido escribir', err);
        } else {
            console.log('Se ha escrito correctamente');
        }
    })
}



function borrar(ruta, cb) {
    fs.unlink(ruta, cb); //elimina de manera asincrona
}

borrar(`${__dirname}/archivo1.txt`, console.log);

//escribir(`${__dirname}/archivo1.txt`, 'Reescribimos el archivo');
//leer(`${__dirname}/archivo.txt`, console.log);