const categorias_libros = document.getElementById("categorias_libros");
const boton_categoria = document.getElementById("buscar_categoria");
const div_categoria_libros = document.getElementById("div_categoria");

function buscarLibrosCategoria(categoria_seleccionada, datos) {
  div_categoria_libros.innerHTML = "";
  const filtrado_libros = datos.libros.filter(
    (libros) => libros.genero === categoria_seleccionada
  );
  console.log(filtrado_libros);
  const lista_libros = document.createElement("ul");
  filtrado_libros.forEach((libro) => {
    const elemento = document.createElement("li");
    elemento.textContent = `${libro.titulo} - ${libro.autor}`;
    lista_libros.appendChild(elemento);
  });
  div_categoria_libros.appendChild(lista_libros);
}

function cargarCategoria(datos) {
  //const categoria = [];
  const categoria = new Set();

  for (let libro of datos.libros) {
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
  boton_categoria.addEventListener("click", function () {
    const categoria_seleccionada = categorias_libros.value;
    console.log(categoria_seleccionada);
    buscarLibrosCategoria(categoria_seleccionada, datos);
  });
  document.getElementById("buscarAutor").addEventListener("click", function () {
    const autor = document.getElementById("introducir_autor").value;
    buscarLibrosPorAutor(autor, datos);
  });

  document.getElementById("btn_disponibles").addEventListener("click", function () {
    filtrarPorDisponibilidad(true, datos);
});

document.getElementById("btn_no_disponibles").addEventListener("click", function () {
    filtrarPorDisponibilidad(false, datos);
});

}


function buscarLibrosPorAutor(autor, datos) {
  const resultados = datos.libros.filter((libro) =>
    libro.autor.toLowerCase().includes(autor.toLowerCase())
  );
  const resultadoDiv = document.getElementById("resultados_busqueda");
  resultadoDiv.innerHTML = ""; 
  if (resultados.length > 0) {
    resultados.forEach((libro) => {
      const item = document.createElement("p");
      item.textContent = `${libro.titulo} (${
        libro.año_publicacion
      })`;
      resultadoDiv.appendChild(item);
    });
  } else {
    resultadoDiv.textContent =
      "No se encontraron libros para el autor especificado.";
  }

}

function filtrarPorDisponibilidad(disponible, datos) {
  const resultados = datos.libros.filter(
    (libro) => libro.disponible === disponible
  );
  const resultadoDiv = document.getElementById("resultados_disponibilidad");
  resultadoDiv.innerHTML = ""; 
  if (resultados.length > 0) {
    resultados.forEach((libro) => {
      const item = document.createElement("p");
      item.textContent = `${libro.titulo} - Autor: ${libro.autor} - Categoría: ${libro.genero}Disponible: ${libro.disponible ? "Sí" : "No"}`;
      resultadoDiv.appendChild(item);
    });
  } else {
    resultadoDiv.textContent =
      "No se encontraron libros con esa disponibilidad.";
  }
}

fetch("./biblioteca.json")
  .then((response) => {
    if (response.ok) {

      return response.json();
    } else {
      return response.status;
    }
  })
  .then((datos) => {
    console.log(datos);
    cargarCategoria(datos);
  });



