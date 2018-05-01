// https://stackoverflow.com/questions/1073956/how-to-generate-63-million-prize-codes

const alfabet = '0123456789ABDEFGHJKLMNPRSTUVXYZ'
let GiftCode =
{
    get random()
    {
        let code = ''
        ;[...Array(5)].map( _ =>
        {
            code += alfabet[Math.floor(Math.random() * 32)]
        })
        code += '-'
        ;[...Array(5)].map( _ =>
        {
            code += alfabet[Math.floor(Math.random() * 32)]
        })
        return code    
    }
}

console.log(GiftCode.random)
