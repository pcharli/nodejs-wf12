const readline  = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const nb1 = 2
const nb2 = 5

rl.question('nb3?', nb3 => addition(nb3))

const addition = (nb3) => {
    console.log( nb1 + nb2 + Number(nb3) )
}
