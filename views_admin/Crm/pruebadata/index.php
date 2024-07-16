<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tabla con DataTables</title>
    <link rel="stylesheet" href="https://cdn.datatables.net/1.11.5/css/jquery.dataTables.min.css">
    <style>
        /* Estilos opcionales para mejorar la apariencia */
        table.dataTable thead .sorting {
            background-image: none;
        }

        table.dataTable thead .sorting_asc,
        table.dataTable thead .sorting_desc {
            background-image: none;
        }

        .select-checkbox {
            width: 20px;
        }
    </style>
</head>

<body>

    <table id="miTabla" class="display">
        <thead>
            <tr>
                <th class="select-checkbox"><input type="checkbox" id="select-all-checkbox"></th>
                <th>ID</th>
                <th>Nombre</th>
                <!-- Agrega más columnas según tus necesidades -->
            </tr>
        </thead>
        <tbody>
            <!-- Aquí debes generar dinámicamente tus filas con datos -->
            <tr>
                <td class="select-checkbox"><input type="checkbox" class="row-checkbox" data-id="1"></td>
                <td>1</td>
                <td>Empleado 1</td>
                <!-- Agrega más celdas según tus necesidades -->
            </tr>
            <tr>
                <td class="select-checkbox"><input type="checkbox" class="row-checkbox" data-id="2"></td>
                <td>2</td>
                <td>Empleado 2</td>
                <!-- Agrega más celdas según tus necesidades -->
            </tr>
            <tr>
                <td class="select-checkbox"><input type="checkbox" class="row-checkbox" data-id="3"></td>
                <td>3</td>
                <td>Empleado 2</td>
                <!-- Agrega más celdas según tus necesidades -->
            </tr>
            <tr>
                <td class="select-checkbox"><input type="checkbox" class="row-checkbox" data-id="4"></td>
                <td>4</td>
                <td>Empleado 2</td>
                <!-- Agrega más celdas según tus necesidades -->
            </tr>
            <tr>
                <td class="select-checkbox"><input type="checkbox" class="row-checkbox" data-id="5"></td>
                <td>5</td>
                <td>Empleado 2</td>
                <!-- Agrega más celdas según tus necesidades -->
            </tr>
            <tr>
                <td class="select-checkbox"><input type="checkbox" class="row-checkbox" data-id="6"></td>
                <td>6</td>
                <td>Empleado 2</td>
                <!-- Agrega más celdas según tus necesidades -->
            </tr>
            <!-- ... -->
        </tbody>
    </table>

    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
    <script src="https://cdn.datatables.net/1.11.5/js/jquery.dataTables.min.js"></script>
    <script>
        $(document).ready(function() {
            var selectedRows = [];

            var table = $('#miTabla').DataTable({
                columnDefs: [{
                    orderable: false,
                    className: 'select-checkbox',
                    targets: 0
                }],
                order: [
                    [1, 'asc']
                ],
                lengthMenu: [5, 10, 25, 50],
                language: {
                    lengthMenu: "Mostrar _MENU_ registros por página",
                    zeroRecords: "No se encontraron resultados",
                    info: "Mostrando página _PAGE_ de _PAGES_",
                    infoEmpty: "No hay registros disponibles",
                    infoFiltered: "(filtrado de _MAX_ registros totales)",
                    search: "Buscar:",
                    paginate: {
                        first: "Primero",
                        last: "Último",
                        next: "Siguiente",
                        previous: "Anterior",
                    },
                },
                pageLength: 5
            });

            // Evento para seleccionar/deseleccionar filas al hacer clic en el checkbox de cada fila
            $('#miTabla tbody').on('click', '.row-checkbox', function() {
                var id = $(this).data('id');
                if (this.checked) {
                    selectedRows.push(id);
                } else {
                    var index = selectedRows.indexOf(id);
                    if (index !== -1) {
                        selectedRows.splice(index, 1);
                    }
                }
                console.log('IDs seleccionados:', selectedRows);

                // Verificar si todos los checkboxes están seleccionados
                var allCheckboxes = $('.row-checkbox');
                var allSelected = allCheckboxes.length === allCheckboxes.filter(':checked').length;
                $('#select-all-checkbox').prop('checked', allSelected);
            });

            // Evento para seleccionar/deseleccionar todos al hacer clic en el checkbox de la cabecera
            $('#select-all-checkbox').on('click', function() {
                var checkboxes = $('.row-checkbox');
                checkboxes.prop('checked', this.checked);
                selectedRows = this.checked ? checkboxes.map(function() {
                    return $(this).data('id');
                }).get() : [];
                console.log('IDs seleccionados:', selectedRows);
            });

            // Evento para deseleccionar todos los checkboxes al cambiar de página
            $('#miTabla').on('page.dt', function() {
                $('.row-checkbox').prop('checked', false);
                selectedRows = [];
                console.log('IDs seleccionados:', selectedRows);
            });
        });
    </script>

</body>

</html>