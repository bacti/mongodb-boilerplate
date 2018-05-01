var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/mydb'

MongoClient.connect(url, (err, db) =>
{
    if (err) throw err
    var dbo = db.db('mydb')
    var myobj =
    [
        { name: 'John', address: 'Highway 71'},
        { name: 'Peter', address: 'Lowstreet 4'},
        { name: 'Amy', address: 'Apple st 652'},
        { name: 'Hannah', address: 'Mountain 21'},
        { name: 'Michael', address: 'Valley 345'},
        { name: 'Sandy', address: 'Ocean blvd 2'},
        { name: 'Betty', address: 'Green Grass 1'},
        { name: 'Richard', address: 'Sky st 331'},
        { name: 'Susan', address: 'One way 98'},
        { name: 'Vicky', address: 'Yellow Garden 2'},
        { name: 'Ben', address: 'Park Lane 38'},
        { name: 'William', address: 'Central st 954'},
        { name: 'Chuck', address: 'Main Road 989'},
        { name: 'Viola', address: 'Sideway 1633'}
    ]
    // var myobj =
    // [
    //     { _id: 154, name: 'Chocolate Heaven'},
    //     { _id: 155, name: 'Tasty Lemon'},
    //     { _id: 156, name: 'Vanilla Dream'}
    // ]
    // dbo.collection('customers').insertMany(myobj, (err, res) =>
    // {
    //     if (err) throw err
    //     console.log(res)
    //     db.close()
    // })
    // dbo.collection('customers').findOne({}, (err, result) =>
    // {
    //     if (err) throw err
    //     console.log(result)
    //     db.close()
    // })

    var query = { address: /^S/ }
    dbo.collection('customers').find(query).toArray((err, result) =>
    {
        if (err) throw err
        console.log(result)
        db.close()
    })

    // var mysort = { address: -1 }
    // dbo.collection('customers').find().sort(mysort).toArray((err, result) =>
    // {
    //     if (err) throw err
    //     console.log(result)
    //     db.close()
    // })

    // dbo.collection('customers').find({}, { _id: 0 }).toArray((err, result) =>
    // {
    //     if (err) throw err
    //     console.log(result)
    //     db.close()
    // })

    // dbo.collection('customers').drop((err, delOK) =>
    // {
    //     if (err) throw err
    //     if (delOK) console.log('Collection deleted')
    //     db.close()
    // })
})
