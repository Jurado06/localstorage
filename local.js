let nombrePro = document.querySelector(".nombre-producto");
let presentacionPro = document.querySelector(".presentacion-producto");
let precioPro = document.querySelector(".precio-producto");
let imagenPro = document.querySelector(".imagen-producto");
let btnGuardar = document.querySelector(".btn-guardar");
let tabla = document.querySelector(".table tbody");

//agregar evento al boton
btnGuardar.addEventListener("click", function() {
  let datos = obtenerProductos();
  if (datos) {
    guardardatos(datos);
    mostrasdatos();
  }
});

//funcion para obtener los productos del formulario
function obtenerProductos() {
  if (nombrePro.value == "" || presentacionPro.value == "" ||
    precioPro.value == "" || imagenPro.value == ""
  ) {
    alert("Todos los campos son obligatorios");
    return false;
  }

  let producto = {
    nombre: nombrePro.value,
    presentacion: presentacionPro.value,
    precio: precioPro.value,
    imagen: imagenPro.value
  };
  nombrePro.value = "";
  presentacionPro.value = "";
  precioPro.value = "";
  imagenPro.value = "";
  return producto;
}

const listadopedidos = "pedidos";

function guardardatos(datos) {
  //array para guardar todos los pedidos
  let pedidos = [];
  let pedidosprevios = JSON.parse(localStorage.getItem(listadopedidos));
  if (pedidosprevios!= null) {
    pedidos.push(pedidosprevios);
  }

  pedidos.push(datos);

  localStorage.setItem(listadopedidos, JSON.stringify(pedidos));
  alert("datos guardados");
}

function mostrasdatos() {
  let pedidos = [];
  let pedidosprevios = JSON.parse(localStorage.getItem(listadopedidos));
  if (pedidosprevios!= null) {
    pedidos.push(pedidosprevios);
  }
  pedidos.forEach((p, i) => {
    let fila = document.createElement("tr");
    fila.innerHTML = `
      <td> ${i + 1} </td>
      <td> ${p.nombre} </td>
      <td> ${p.presentacion} </td>
      <td> ${p.precio} </td>
      <td> <img src ="${p.imagen}" width="50%">  </td>
      <td> ${p.observacion || ""} </td>
      <td>
        <spam class="btn-editar btn btn-warning"> 🔰</spam>
        <spam class="btn-editar btn btn-danger"> ❎</spam>
      </td>
    `;
    tabla.appendChild(fila);
  });
}

document.addEventListener("DOMContentLoaded", function() {
  mostrasdatos();
});


function buscarProductos() {
  const searchQuery = document.querySelector('#search-box').value.toLowerCase();
  const pedidos = JSON.parse(localStorage.getItem(listadopedidos)) || [];
  const filteredPedidos = pedidos.filter(pedido => pedido.nombre.toLowerCase().includes(searchQuery));
  mostrasdatos(filteredPedidos);
}

document.querySelector('#search-btn').addEventListener('click', buscarProductos);
document.querySelector('#search-box').addEventListener('input', buscarProductos);