const mssql = require('mssql');
const config = require('../config')


module.exports = {
    getAllBooks: async () => {
        try {
            let sql = await mssql.connect(config);
            let results = await sql.request()
                                   .execute("get_all_available_books");
            results.json({
                success: true,
                message: "returned all books",
                results: results.recordset
            })
        } catch (error) {
            console.log(error);
        }

    }
}