const BD = require('../config/oracleConnection');

exports.getUsuarios = async (req, res) => {
    try{
        let query = "SELECT * FROM PRODUCTO";
        let result = await BD.Open(query, [], false);
        let estudiantes = [];

        estudiantes = result.rows.map(user =>{
            let estudianteSchema = {
                "idProducto": user[0],
                "NombreProducto": user[1],
                "PrecioProducto": user[2]
            }

            return estudianteSchema
        })
        res.json(estudiantes);
    }
    catch(error)
    {
        console.log("Error al realizar la consulta => ",error)
        res.json({})
    }
}

exports.addUsuario = async(req,res) => {
    try{
        const { nombre, email, password } = req.body
        
        const body = req.body
        const n = body.nombreProducto
        const c = body.precioProducto
        
        console.log(n)
        console.log(c)
        let sql = `INSERT INTO PRODUCTO(nombreProducto, precioProducto) VALUES ('${n}',${c})`
        await BD.Open(sql, [], true);

        res.json({"Info": "Producto creado exitosamente"})
    }
    catch(error){
        console.log("Error al crear el usuario => ",error)
        res.json({"mensaje": "Error al crear el usuario"})
    }
}

exports.login = async(req,res) => {
    try{
        const body = req.body
        const email = body.email
        const pass = body.password

        console.log(email)
        console.log(pass)

        let query = `SELECT * FROM USUARIO WHERE emailusuario='${email}' and passusuario='${pass}'`
        let result = await BD.Open(query, [], false);
        let estudiantes = [];

        estudiantes = result.rows.map(user =>{
            let estudianteSchema = {
                "Nombre": user[0],
                "Email": user[1],
                "Password": user[2]
            }

            return estudianteSchema
        })

        if (estudiantes.length == 1) {
            res.json({"auth": true})
        }else{
            res.json({"auth": false})
        }

    }
    catch(error){
        console.log("Error al loguear el usuario => ",error)
        res.json({"mensaje": "Error al loguear el usuario"})
    }
}

exports.getFac = async (req, res) => {
    try{
        let query = "SELECT DETALLE_FACTURA .idFactura, SUM( DETALLE_FACTURA .Cantidad * Producto.precioproducto ) as TOTAL FROM factura" +
         " inner join detalle_factura on detalle_factura.idFactura = factura.idfactura" + 
         " inner join producto on Producto.idProducto = detalle_factura.idproducto" + 
         " group by detalle_factura.idfactura" + 
         " order by TOTAL DESC FETCH NEXT 3 ROWS ONLY";
        let result = await BD.Open(query, [], false);
        let estudiantes = [];

        estudiantes = result.rows.map(user =>{
            let estudianteSchema = {
                "idFactura": user[0],
                "Total": user[1]
            }

            return estudianteSchema
        })
        res.json(estudiantes);
    }
    catch(error)
    {
        console.log("Error al realizar la consulta => ",error)
        res.json({})
    }
}

exports.verCliente = async(req,res) => {
    try{
        const { nombre, email, password } = req.body
        
        const body = req.body
        const n = body.idCliente
        
        console.log(n)
        let sql = `SELECT factura.idcliente, cliente.nombreCliente,  SUM( DETALLE_FACTURA .Cantidad * Producto.precioproducto ) as TOTAL FROM factura`+
        ` inner join detalle_factura on detalle_factura.idFactura = factura.idfactura ` +
        ` inner join producto on Producto.idProducto = detalle_factura.idproducto ` +
        ` inner join cliente on Cliente.idCliente = Factura .idCLiente `+
        ` WHERE factura.idCliente =(${n})`+ ` group by factura.idcliente, cliente.nombreCliente `
        await BD.Open(sql, [], true);

        let estudiantes = [];

        estudiantes = result.rows.map(user =>{
            let estudianteSchema = {
                "idCliente": user[0],
                "NombreCliente": user[1],
                "Total": user[2]
            }

            return estudianteSchema
        })
        res.json(estudiantes);
    }
    catch(error){
        console.log("Error al crear el usuario => ",error)
        res.json({"mensaje": "Error al crear el usuario"})
    }
}