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
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonText: "Yes, delete it!",
  cancelButtonText: "No, cancel!",
  reverseButtons: true
}).then((result) => {
  if (result.isConfirmed) {
    eliminarEstudiante(id)
    swalWithBootstrapButtons.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    });
  } else if (
    /* Read more about handling dismissals below */
    result.dismiss === Swal.DismissReason.cancel
  ) {
    swalWithBootstrapButtons.fire({
      title: "Cancelled",
      text: "Your imaginary file is safe :)",
      icon: "error"
    });
  }
}); 
}

