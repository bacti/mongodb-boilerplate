/*
https://stackoverflow.com/questions/1073956/how-to-generate-63-million-prize-codes

Syntax:

You probably will have people copying these codes, so that means these codes should be easy to copy. 10^10 is too small, as Gamecat points out. kgiannakakis has a better idea, but that causes another problem: "1" looks a lot like "I". "0", "C", "O" and "Q" are also quite similar. This is not a big problem. Define a safe alfabet: "0123456789ABDEFGHJKLMNPRSTUVXYZ" (leaves out COIQ) From the comments: depending on the fonts you pick, 5/S and U/V may also be visually ambiguous; replace as required. This is a 32 symbol (5 bit) code. A 10 character code is a 50 bits number. Those should be fairly trivial to generate, sort, copy, compare etc. Chances of being guessed are about 0.63E-7

Since the codes are too long to remember, users will need a resting point when copying them. So split the string in two or three parts and make sure the input field matches this breakdown.

E.g. AKG3L-45TEE => two groups of 5, and even if you can't remember 5 chars it's a lot easier to find the point back where you stopped reading.

How to generate them:

This is fairly simple. You don't need a particularly sophistciated algorithm to generate candidates. You can generate 10 random numbers per code needed, take 5 bits from each number (typically the middle bits are best, e.g. (rand()/64) modulo 32). Use this value [0-31] as index into your alphabet. Create a database table with this string as a primary key, and insert until the table has 63 million entries. You probably want to add "generated on" and "redeemed on" dates to this table.
*/

const alfabet = '0123456789ABDEFGHJKLMNPRSTUVXYZ'

let NewCode = function()
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

console.log(NewCode())
