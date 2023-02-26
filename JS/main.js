let ListaMonedas = document.getElementById("listaMonedas")
let ListaTransacciones = document.getElementById("ListaTransacciones")
let agregarMonedaBtn = document.getElementById("cargarMoneda")
let comprarMonedaBtn = document.getElementById("comprarMoneda")
let verListaMonedasBtn = document.getElementById("verListaMonedas")
let coincidencia = document.getElementById("coincidencia")
let selectOrden = document.getElementById("selectOrden")
let buscador = document.getElementById("buscador")
let loader = document.getElementById("loader")

//FUNCTIONS PROYECTO:
function verListaMonedas(array){
    ListaMonedas.innerHTML = ""
    for(let moneda of array){
        let nuevaMoneda = document.createElement("li")
        nuevaMoneda.innerHTML = `<li class="list-group-item">${moneda.Nombre} - valor compra: ${moneda.valorCompra} - valor venta: ${moneda.valorVenta}</li>`
        ListaMonedas.appendChild(nuevaMoneda)
    }
}
//Declaro datetime para luxon
const DateTime = luxon.DateTime
const fechaActual = DateTime.now()

function AgregarMoneda(array){
    let inputValorCompra = document.getElementById("valorCompraInput")
    let inputValorVenta = document.getElementById("valorVentaInput")
    let inputNombre = document.getElementById("nombreInput")

   const monedaNueva = new Moneda(array.length+1, inputNombre.value, inputValorCompra.value, inputValorVenta.value)
   console.log(monedaNueva)
   array.push(monedaNueva)
   console.log(array)
   localStorage.setItem("monedas", JSON.stringify(array))
   monedaSelect.innerHTML+=`<option value="${monedaNueva.id}">${monedaNueva.Nombre}</option>`
   verListaMonedas(array)

   inputNombre.value = ""
   inputValorCompra.value = ""
   inputValorVenta.value = ""
   Toastify({
    text: "Usted ha agregado un nueva moneda",
    className: "info",
    gravity:"top",
    position:"left",
    newWindow: true,
    style: {
      background: "#198754"
    }
  }).showToast()

}
//variables para transacciones 
let saldo = 0
let idEncontrado

function verListaTransacciones(array){
    if (array.length === 0){
         ListaTransacciones.innerHTML = "<h3>Usted no tiene transacciones recientes</h3>"
    }
   else{
    ListaTransacciones.innerHTML = ""
    for(let transaccion of array){
        let nuevaTransaccion = document.createElement("li")
        ListaTransacciones.innerHTML += `<li class="list-group-item">${transaccion.fecha} usted ha comprado ${transaccion.saldo} ${transaccion.moneda}(s)</li>`
        ListaTransacciones.appendChild(nuevaTransaccion)
    }
   }
    
}

function finalizarCompra(array){
    Swal.fire({
        title: '¿Está seguro de realizar el cambio?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: 'blue',
        cancelButtonColor: 'red',
    }).then((result)=>{
        if(result.isConfirmed){
            Swal.fire({
                title: 'Transacción exitosa',
                icon: 'success',
                confirmButtonColor: 'green'
            })
            let fecha = DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
            const transaccionNueva = new Transaccion (fecha, saldo.toFixed(2),idEncontrado.Nombre)
            console.log(transaccionNueva)
            array.push(transaccionNueva)
            console.log(array)
            localStorage.setItem("transaccion", JSON.stringify(array))
            verListaTransacciones(transacciones)
                
        }else{
            Swal.fire({
                title: 'Transacción cancelada',
                icon: 'error',
                text: `Usted ha cancelado la transacción`,
                confirmButtonColor: 'blue',
                timer:3500
            })
            
        }
    }

    )
}
  
function ComprarMoneda(array, array2){
    let inputPesos = document.getElementById("pesosInput")
    idEncontrado = array.find(
    (moneda)=> moneda.id == monedaSelect.value)
    idEncontrado == undefined ? (Toastify({
        text: "Seleccione una moneda",
        className: "info",
        gravity:"top",
        position:"left",
        newWindow: true,
        style: {
          background: "#dc3545"
        }
      }).showToast())
    :
    (saldo = inputPesos.value/idEncontrado.valorVenta,finalizarCompra(transacciones),console.log(idEncontrado))
    
}



function buscarPorNombre(buscado, array){
    let busqueda = array.filter(
        (moneda) => moneda.Nombre.toLowerCase().includes(buscado.toLowerCase())
    )
    busqueda.length==0 ?(coincidencia.innerHTML = `<center><h3>No hay coincidencias con su búsqueda</h3><center>`,verListaMonedas(busqueda))
    :
    (coincidencia.innerHTML = "", verListaMonedas(busqueda)) 
}

//ordenar:

function ordenarMenorMayor(array){
    const menorMayor = [].concat(array)
    menorMayor.sort((a,b) => a.valorVenta - b.valorVenta)
    verListaMonedas(menorMayor)
}

function ordenarMayorMenor(arr){
const mayorMenor = [].concat(arr)
mayorMenor.sort((a, b)=>{
    return b.valorVenta - a.valorVenta
})
verListaMonedas(mayorMenor)
}

function ordenarAlfabeticamenteNombre(array){
const ordenadoAlfabeticamente = [].concat(array)
 ordenadoAlfabeticamente.sort((a,b) => {
      if(a.Nombre > b.Nombre) {
        return 1
      }
      if (a.Nombre < b.Nombre) {
        return -1
      }
      return 0;
})
verListaMonedas(ordenadoAlfabeticamente)
}


//EVENTOS:
agregarMonedaBtn.addEventListener("click", ()=>{
    AgregarMoneda(monedas)
})
comprarMonedaBtn.onclick = ()=>{
    ComprarMoneda(monedas, transacciones)
}
buscador.addEventListener("input", () =>{
    console.log(buscador.value)
    buscarPorNombre(buscador.value, monedas)
})
selectOrden.addEventListener("change", ()=>{
    console.log(selectOrden.value)
    if(selectOrden.value == 1){
        ordenarMayorMenor(monedas)
    }else if(selectOrden.value == 2){
        ordenarMenorMayor(monedas)
    }else if(selectOrden.value == 3){
        ordenarAlfabeticamenteNombre(monedas)
    }else{
        verListaMonedas(monedas)
    }
})
setTimeout(()=>{
    loader.remove()
    verListaMonedas(monedas)
    verListaTransacciones (transacciones)
}, 2000)