
// Generamos una funcion para que envie la informacion del estudiante para que lo elimine
function eliminarEstudiante(id) {
  ///Obtenemos el token csrf 

  const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

  fetch(`/eliminar-estudiante/${id}/`, {
      method: 'POST',
      headers: {
          'X-CSRFToken': csrftoken
      }
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
          Swal.fire('Eliminado', 'Estudiante eliminado correctamente', 'success')
              .then(() => location.reload());
      }
    
  });
}

// Funcion de confirmar para mostrar la alerta de eliminar
function confirmarEliminar(id){
const swalWithBootstrapButtons = Swal.mixin({
customClass: {
  confirmButton: "btn btn-success",
  cancelButton: "btn btn-danger"
},
buttonsStyling: false
});
swalWithBootstrapButtons.fire({
title: "Estas seguro?",
text: "Ya no podrás revertir esto!",
icon: "warning",
showCancelButton: true,
confirmButtonText: "Sí, Bórralo!",
cancelButtonText: "No, Cancelar!",
reverseButtons: true
}).then((result) => {
if (result.isConfirmed) {
  eliminarEstudiante(id)
  swalWithBootstrapButtons.fire({
    title: "Borrado!!",
    text: "Se ha borrrado satisfactoriamente.",
    icon: "success"
  });
} else if (
  /* Read more about handling dismissals below */
  result.dismiss === Swal.DismissReason.cancel
) {
  swalWithBootstrapButtons.fire({
    title: "Cancelado!",
    text: "Uy! casi lo borras eh!... :)",
    icon: "error"
  });
}
}); 
}

// Funcion para obtener la cookie
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let cookie of cookies) {
          cookie = cookie.trim();
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}

// Se toma el id del curos y lsita las materias que estan agregadas a ese curso 
document.getElementById("curso").addEventListener("change", function () {
  const cursoId = this.value;
  const ul = document.getElementById("materias");
  ul.innerHTML = "";


  fetch(`/materias-por-curso/${cursoId}/`)
      .then(res => res.json())
      .then(data => {
          data.forEach(materia => {
              
              ul.innerHTML += `<li>${materia.materia__nombre}</li>`;
          });
      });
});

// Se toma la clase ".curso_e" para que aparezcan las materias que estan en ese curso
document.querySelectorAll(".curso_e").forEach(select => {

  select.addEventListener("change", function () {

      const cursoId = this.value;

      // buscar SOLO el ul del modal actual
      const ul = this
          .closest(".modal-body")
          .querySelector(".materias_e");

      ul.innerHTML = "";


      fetch(`/materias-por-curso/${cursoId}/`)
          .then(res => res.json())
          .then(data => {
              data.forEach(materia => {
                  ul.innerHTML += `<li>${materia.materia__nombre}</li>`;
              });
          });
  });

});


// Funcion de edicion para que no se recargue la pagina
document.addEventListener("DOMContentLoaded", function () {

  document.querySelectorAll(".formularioEdicion").forEach(form => {

      form.addEventListener("submit", function (e) {
          e.preventDefault(); //  EVITA QUE SE ENVÍE NORMAL EL FORMULARIO

          const formData = new FormData(this);

          fetch(this.action, {
              method: "POST",
              body: formData,
              headers: {
                  "X-CSRFToken": this.querySelector(
                      "input[name='csrfmiddlewaretoken']"
                  ).value
              }
          })
          .then(res => res.json())
          .then(data => {

                
              if (data.success) {

                  const fila = document.getElementById(`fila-${data.id}`)
                  const modal = bootstrap.Modal.getInstance(
                  document.getElementById(`modalEditar${data.id}`)
                  );
                  modal.hide();

                  fila.querySelector(".nombre").textContent = data.nombre;
                  fila.querySelector(".edad").textContent = `${data.edad} Años` ;
                  fila.querySelector(".curso").textContent = data.curso;
              
                  // Mensaje de Éxito 
                  Swal.fire({
                      icon: "success",
                      title: "Correcto",
                      text: data.message
                  });
                  
          
              }
          });
      });

  });

});

