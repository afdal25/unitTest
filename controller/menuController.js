const conn = require('../config/connection')

exports.getMenu = async(req,res) =>{
    let result = []
    try{
        let sql = `select * from tbl_menu`
        conn.query(sql,(err,data)=>{
            if(err) throw err
            res.json({
                status:true,
                msg : 'Successfull',
                result : data
            })
        })
    }
    catch(err){
        return res.json(
            {
                status:false,
                msg : 'Failed load data'
            }
        )
    }
}

exports.insertMenu = async(req,res) =>{
    
    try{

        let nama = req.query.nama
        let deskripsi =  req.query.deskripsi
        let harga = req.query.harga

        let sql = `insert into tbl_menu (nama,deskripsi,harga) values(?,?,?)`
        let values = [nama,deskripsi,harga]
        conn.query(sql,values,(err,data)=>{
            if(err) throw err
            if(data.affectedRows > 0)
            res.json({
                status:true,
                msg : 'Successfull Insert'
            })
        })
    }
    catch(err){
        return res.json(
            {
                status:false,
                msg : 'Failed load data'
            }
        )
    }
}

exports.updateMenu = async(req,res) =>{
    
    try{
        let id = req.params.id
        let nama = req.query.nama
        let deskripsi =  req.query.deskripsi
        let harga = req.query.harga

        let sql = `update tbl_menu set nama=?,deskripsi=?,harga=? where id=?`
        let values = [nama,deskripsi,harga,id]
        conn.query(sql,values,(err,data)=>{
            if(err) throw err
            if(data.affectedRows > 0)
            res.json({
                status:true,
                msg : 'Successfull Updated'
            })
        })
    }
    catch(err){
        return res.json(
            {
                status:false,
                msg : 'Failed load data'
            }
        )
    }
}

exports.deleteMenu = async(req,res) =>{
    
    try{
        let id = req.params.id
        let sql = `delete from tbl_menu where id=?`
        let values = [id]
        conn.query(sql,values,(err,data)=>{
            if(err) throw err
            
            res.json({
                status:true,
                msg : 'Delete Successfull'
            })
        })
    }
    catch(err){
        return res.json(
            {
                status:false,
                msg : 'Delete Failed'
            }
        )
    }
}
