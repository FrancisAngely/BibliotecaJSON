const categorias_libros = document.getElementById("categorias_libros");
const boton_categoria = document.getElementById("buscar_categoria");
const div_categoria_libros = document.getElementById("div_categoria");

function buscarLibrosCategoria(categoria_seleccionada,datos){
div_categoria_libros.innerHTML = "";
const filtrado_libros = datos.libros.filter(libros => libros.genero === categoria_seleccionada);
console.log(filtrado_libros);
const lista_libros = document.createElement("ul");
filtrado_libros.forEach(libro =>{
const elemento = document.createElement("li");
elemento.textContent = `${libro.titulo} - ${libro.autor}`
lista_libros.appendChild(elemento);
})
div_categoria_libros.appendChild(lista_libros);
}

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
boton_categoria.addEventListener("click", function(){
const categoria_seleccionada = categorias_libros.value;
console.log(categoria_seleccionada);
buscarLibrosCategoria(categoria_seleccionada,datos);
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



