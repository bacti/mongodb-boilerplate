var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/mydb'

const alfabet = '0123456789ABDEFGHJKLMNPRSTUVXYZ'
let GiftCode =
{
    // https://stackoverflow.com/questions/1073956/how-to-generate-63-million-prize-codes
    get random()
    {
        let code = ''
        ;[...Array(5)].map( _ =>
        {
            code += alfabet[Math.floor(Math.random() * 31)]
        })
        code += '-'
        ;[...Array(5)].map( _ =>
        {
            code += alfabet[Math.floor(Math.random() * 31)]
        })
        return code    
    }
}

MongoClient.connect(url, (err, db) =>
{
    if (err) throw err
    var dbo = db.db('mydb')

    // dbo.collection('gift').insertOne({ _id: GiftCode.random }, (err, res) =>
    // {
    //     if (err) throw err
    //     console.log(res)
    //     db.close()
    // })

    dbo.collection('gift').find({},).toArray((err, result) =>
    {
        if (err) throw err
        console.log(result)
        db.close()
    })

    // dbo.collection('gift').drop((err, delOK) =>
    // {
    //     if (err) throw err
    //     if (delOK) console.log('Collection deleted')
    //     db.close()
    // })
})
