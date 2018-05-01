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
                this.dbo = database.db(this.name)
                resolve(database)
            })
        })
    }

    DropCollection(alias)
    {
        return new Promise((resolve, reject) =>
        {
            this.dbo.collection(alias).drop((error, result) =>
            {
                resolve(error ? undefined : result)
            })
        })
    }

    Insert(alias, objects)
    {
        return new Promise((resolve, reject) =>
        {
            this.dbo.collection(alias).insertMany(objects, (error, result) =>
            {
                resolve(error ? undefined : result)
            })
        })
    }
}

let redeem = new Database('mydb')
redeem.Connect(url).then(database =>
{
    redeem.DropCollection('gift')
    .then(result =>
    {
        if (result == undefined)
        {
            database.close()
            return
        }

        let codes = [...Array(3000000)].map( _ =>
        {
            return { _id: GiftCode.random }
        })

        redeem.Insert('gift', codes)
        .then(result =>
        {
            if (result == undefined)
            {
                database.close()
                return
            }

            console.log(result)
            database.close()
        })
    })
})
