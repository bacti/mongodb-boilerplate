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

// MongoClient.connect(url, (err, db) =>
// {
//     if (err) throw err
//     let dbo = db.db('mydb')

//     // dbo.collection('gift').drop((err, result) =>
//     // {
//     //     if (err) throw err

//     //     db.close()
//     // })

//     // dbo.collection('gift').insertOne({ _id: GiftCode.random }, (err, res) =>
//     // {
//     //     if (err) throw err
//     //     console.log(res)
//     //     db.close()
//     // })

//     // dbo.collection('gift').find({},).toArray((err, result) =>
//     // {
//     //     if (err) throw err
//     //     console.log(result)
//     //     db.close()
//     // })

// })

let DropCollection = alias =>
{
    return new Promise((resolve, reject) =>
    {
        dbo.collection(alias).drop((error, result) =>
        {
            error && reject()
            resolve(result)
        })
    })
}

class Database
{
    constructor(name)
    {
        this.name = name
    }

    Connect(url)
    {
        return new Promise((resolve, reject) =>
        {
            MongoClient.connect(url, (error, database) =>
            {
                error && reject()
                resolve(database)
            })
        })
    }
}

let database = new Database('mydb')
database.Connect(url).then(database =>
{
    let dbo = database.db('mydb')
    dbo.collection('gift').find({},).toArray((err, result) =>
    {
        if (err) throw err
        console.log(result)
        database.close()
    })
})
