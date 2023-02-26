class Transaccion{
    constructor (fecha, saldo,moneda){
        this.fecha = fecha,
        this.saldo = saldo;
        this.moneda = moneda;

    }
        
}

let transacciones = [] 
if(localStorage.getItem("transaccion")){
    transacciones = JSON.parse(localStorage.getItem("transaccion"))
}