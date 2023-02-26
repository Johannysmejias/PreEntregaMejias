class Moneda{
    //constructor 
    constructor (id,Nombre, valorCompra, valorVenta){
    this.id = id,
    this.Nombre = Nombre;
    this.valorCompra = valorCompra;
    this.valorVenta = valorVenta
}
//metodos
mostrarInfoMoneda(){
    console.log(`${this.id} - ${this.Nombre} Compra: ${this.valorCompra} Venta:${this.valorVenta}`)
}
}
let monedas = []
const cargarMonedas = async () =>{
    const response = await fetch("monedas.json")
    const data = await response.json()
    console.log(data)
    for(let moneda of data){
        let monedaNueva = new Moneda(moneda.id,moneda.Nombre,moneda.valorCompra,moneda.valorVenta)
        monedas.push(monedaNueva)
    }
    localStorage.setItem("monedas",JSON.stringify(monedas))
}
if(localStorage.getItem("monedas")){
    monedas = JSON.parse(localStorage.getItem("monedas"))
}else{
    console.log("Cargando monedas")
    cargarMonedas()
}