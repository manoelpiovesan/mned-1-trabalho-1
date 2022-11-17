
const alpha = 2 // 0 a 9
const beta = 5 // 0 a 9
const gama = 7 // 0 a 9

const A = 12 // 10 a  99
const B = 0 // fixo
const C = 45 // 10 a 99

const t = 0
const tMax = 5 // 1 a 9
var deltaT = 0.001

var cA = A
var cB = B
var cC = C

document.querySelector("#btn-rungekutta").addEventListener('click', ()=>{
    rungeKuttaIII(alpha, beta, gama, cA, cB, cC, deltaT)
})

let f = {
    dcAdt: (alpha, cA, cB, cC)=>{
        return ((-alpha*cA*cC) + cB)
    },
    dcBdt: (beta, cA, cB, cC)=>{
        return ((beta*cA*cC) - cB)
    },
    dcCdt: (gama, cA, cB, cC)=>{
        return ((-gama*cA*cC)+cB-(2*cC))
    }
}



function rungeKuttaIII(alpha, beta, gama, cA, cB, cC, deltaT){

    var fnA = cA 
    var fnB = cB 
    var fnC = cC 

    var k1A = f.dcAdt(alpha, cA, cB, cC)
    var k1B = f.dcBdt(beta, cA, cB, cC)
    var k1C = f.dcBdt(gama, cA, cB, cC)

    var k2A = f.dcAdt(alpha, (cA + ((k1A*deltaT)/2)), cB, cC)
    var k2B = f.dcAdt(beta, (cA + ((k1B*deltaT)/2)), cB, cC)
    var k2C = f.dcAdt(gama, (cA + ((k1C*deltaT)/2)), cB, cC)

    var k3A = f.dcAdt(alpha, (cA - (k1A*deltaT) + (2*k2A*deltaT)), cB, cC)
    var k3B = f.dcAdt(beta, (cA - (k1B*deltaT) + (2*k2B*deltaT)), cB, cC)
    var k3C = f.dcAdt(gama, (cA - (k1C*deltaT) + (2*k2C*deltaT)), cB, cC)


    for(var temp = t; temp < tMax; temp += deltaT){

        console.log(`Calculando para t = ${temp.toFixed(6)}:`)

        fnA = fnA + ((1/6) * (k1A + (4 * k2A) + k3A) * deltaT)
        fnB = fnB + ((1/6) * (k1B + (4 * k2B) + k3B) * deltaT)
        fnC = fnC + ((1/6) * (k1C + (4 * k2C) + k3C) * deltaT)

        console.log(`f(${temp.toFixed(6)})A = ${fnA}`)
        console.log(`f(${temp.toFixed(6)})B = ${fnB}`)
        console.log(`f(${temp.toFixed(6)})C = ${fnC}`)

    }


}