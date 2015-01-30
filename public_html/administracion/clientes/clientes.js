app.controller("ClientesController", ["$location", "$scope", "$http", function ClientesController($location, $scope, $http) {

        jQuery("#list").jqGrid({
            url: 'clientes/php/clientes.php',
            datatype: "json",
            colNames: ['Id', 'Email', 'Contraseña', 'Nombre', 'Apellido', 'DNI', 'Teléfono'],
            colModel: [
                {name: 'idCliente', index: 'idCliente', key: true, width: 25},
                {name: 'email', index: 'email', width: 150},
                {name: 'contraseña', index: 'contraseña', width: 110, sortable: false},
                {name: 'nombre', index: 'nombre', width: 120},
                {name: 'apellido', index: 'apellido', width: 150},
                {name: 'dni', index: 'dni', width: 90},
                {name: 'telefono', index: 'telefono', width: 90, sortable: false, align: "right"}
            ],
            rowNum: 10,
            rowList: [10, 20, 30],
            pager: '#pager',
            sortname: 'idCliente',
            sortorder: "asc",
            height: 250
        });
        jQuery("#list").jqGrid('navGrid', '#pager', {edit: false, add: false, del: false,search:false});



        $("#nuevo").click(function () {
            $(".id").css("display", "none");
            $(".editable").readonly = false;

            $scope.enableForm();

            $("input").val("");
            $("#dialog-form").dialog({
                resizable: false,
                modal: true,
                width: 500,
                title: "Insertar cliente",
                buttons: {
                    "Insertar": function () {
                        $.ajax({
                            method: "POST",
                            url: "clientes/php/clientes-insert.php",
                            data: $("#form").serialize(),
                            success: function () {
                                $("#dialog-form").dialog("close");
                                jQuery("#list").jqGrid().trigger("reloadGrid");
                            }
                        });
                    },
                    "Cancelar": function () {
                        $(this).dialog("close");
                    }
                }
            });
        });


        $("#editar").click(function () {

            var id = jQuery("#list").jqGrid('getGridParam', 'selrow');
            var ret = jQuery("#list").jqGrid('getRowData', id);

            if (!ret.idCliente) {
                $("#content-dialog").text("No se ha seleccionado ningún cliente.");
                $("#confirm-dialog").dialog({
                    resizable: false,
                    modal: true,
                    title: "Error: Modificar cliente",                    
                    buttons: {
                        "Aceptar": function () {
                            $(this).dialog("close");
                        }
                    }
                });
            } else {
                $(".id").css("display", "inherit");
                $(".editable").readonly = false;

                $scope.enableForm();

                $("input#id").val(ret.idCliente);
                $("input#email").val(ret.email);
                $("input#contraseña").val(ret.contraseña);
                $("input#nombre").val(ret.nombre);
                $("input#apellido").val(ret.apellido);
                $("input#dni").val(ret.dni);
                $("input#telefono").val(ret.telefono);

                $("#dialog-form").dialog({
                    resizable: false,
                    modal: true,
                    width: 500,
                    title: "Modificar cliente",
                    buttons: {
                        "Modificar": function () {
                            $.ajax({
                                method: "POST",
                                url: "clientes/php/clientes-update.php",
                                data: $("#form").serialize(),
                                success: function () {
                                    $("#dialog-form").dialog("close");
                                    jQuery("#list").jqGrid().trigger("reloadGrid");
                                }
                            });
                        },
                        "Cancelar": function () {
                            $(this).dialog("close");
                        }
                    }
                });
            }
        });


        $("#borrar").click(function () {
            var id = jQuery("#list").jqGrid('getGridParam', 'selrow');
            var ret = jQuery("#list").jqGrid('getRowData', id);

            if (!ret.idCliente) {
                $("#content-dialog").text("No se ha seleccionado ningún cliente.");
                $("#confirm-dialog").dialog({
                    resizable: false,
                    modal: true,
                    title: "Error: Borrar cliente",
                    buttons: {
                        "Aceptar": function () {
                            $(this).dialog("close");
                        }
                    }
                });
            } else {
                $(".id").css("display", "inherit");

                $scope.disableForm();

                $("input#id").val(ret.idCliente);
                $("input#email").val(ret.email);
                $("input#contraseña").val(ret.contraseña);
                $("input#nombre").val(ret.nombre);
                $("input#apellido").val(ret.apellido);
                $("input#dni").val(ret.dni);
                $("input#telefono").val(ret.telefono);

                $("#dialog-form").dialog({
                    resizable: false,
                    modal: true,
                    width: 500,
                    title: "Borrar cliente",
                    buttons: {
                        "Borrar": function () {
                            if (confirm("Are you sure you want to delete this Cliente?"))
                                $.ajax({
                                    method: "POST",
                                    url: "clientes/php/clientes-delete.php",
                                    data: $("#form").serialize(),
                                    success: function () {
                                        $("#dialog-form").dialog("close");
                                        jQuery("#list").jqGrid().trigger("reloadGrid");
                                    }
                                });
                        },
                        "Cancelar": function () {
                            $(this).dialog("close");
                        }
                    }
                });
            }
        });




        $scope.disableForm = function () {
            document.getElementById("email").readOnly = true;
            document.getElementById("contraseña").readOnly = true;
            document.getElementById("nombre").readOnly = true;
            document.getElementById("apellido").readOnly = true;
            document.getElementById("dni").readOnly = true;
            document.getElementById("telefono").readOnly = true;

        };

        $scope.enableForm = function () {
            document.getElementById("email").readOnly = false;
            document.getElementById("contraseña").readOnly = false;
            document.getElementById("nombre").readOnly = false;
            document.getElementById("apellido").readOnly = false;
            document.getElementById("dni").readOnly = false;
            document.getElementById("telefono").readOnly = false;

        };

    }]);