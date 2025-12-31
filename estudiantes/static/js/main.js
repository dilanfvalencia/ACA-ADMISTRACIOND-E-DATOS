///Obtenemos el token csrf 

const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

// Generamos una funcion para que envie la informacion del estudiante para que lo elimine
function eliminarEstudiante(id) {
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
