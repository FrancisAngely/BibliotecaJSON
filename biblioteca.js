// const categorias_libros = document.getElementById("categorias_libros");

// function cargarCategoria(datos) {
//   const categoria = [];
//   for (let libro of datos.libros) {
//     let genero = libro.genero;
//     if (!categoria.includes(genero)) {
//       categoria.push(genero);
//     }
//   }
//   console.log(categoria);
// }

// fetch("./biblioteca.json")
//   .then((response) => {
//     if (response.ok) {
//       return response.json();
//     } else {
//       return response.status;
//     }
//   })
//   .then((datos) => {
//     console.log(datos);
//     cargarCategoria(datos);
//   });

const categorias_libros = document.getElementById("categorias_libros");

function cargarCategoria(datos){
//const categoria = [];
const categoria = new Set();

for(let libro of datos.libros){
let genero = libro.genero;
categoria.add(genero);
/* if(!categoria.includes(genero)){
categoria.push(genero);
}*/
}
console.log(categoria);
categoria.forEach((elemento) => {
const option = document.createElement("option");
option.textContent = elemento;
option.value = elemento;
categorias_libros.appendChild(option);
});
}

fetch("./biblioteca.json").then((response) => {
if(response.ok){
return response.json();
}else{
return response.status;
}
}).then((datos) => {
console.log(datos);
cargarCategoria(datos);
});

