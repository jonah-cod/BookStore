const mssql = require('mssql');
const config = require('../config')

async function getAllProducts(req, res){
    let sql = await mssql.connect(config);
    if(sql.connected){
        let results = await sql.query(`SELECT * from production.products`);
        let products = results.recordset;
        res.json({
            success: true,
            message: "fetched products successfully",
            results: products
        })
    }else{
        res.status(500).send("Internal server error")
    }
    
    
}


async function getProductById(req, res){

    let {product_id} = req.params;

    let sql = await mssql.connect(config);
    if(sql.connected){
        let results = await sql.query(`SELECT * from production.products WHERE product_id=${Number(product_id)}`)

        let product = results.recordset[0]

        res.json({
            success: true,
            message: 'fetched product successfully',
            results: product
        });
    }
    
}

async function getSalesPerYear(req, res){
    let {page, limit, year} = req.params
    
    let sql = await mssql.connect(config);
    if(sql.connected){
        let results =  await sql.request()
                          .input("_year", year)
                          .input("_limit", Number(limit))
                          .input("_page", page)
                          .execute("sales.paginated_sales")

        res.json({
            success: true,
            message: "sales for year" + year,
            results: {
                metadata: {
                    page,
                    record: results.recordset.length
                },

                data: results.recordset
            }
        })
    }
}


module.exports = { getAllProducts, getProductById, getSalesPerYear }