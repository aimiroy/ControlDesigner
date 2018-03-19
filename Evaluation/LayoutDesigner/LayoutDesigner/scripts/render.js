$("body").on("click", "#btnAdd", function () {
    if (validateForm()) {
        //Reference the TextBoxes.
        var txtControlId = $("#txtControlId");
        var txtLabel = $("#txtLabel");
        var selectType = $("#selectType");
        var chkVisible = $("#chkVisible");
        var chkReadOnly = $("#chkReadOnly");
        var txtOrder = $("#txtOrder");

        //Get the reference of the Table's TBODY element.
        var tBody = $("#tblControls > TBODY")[0];

        //Add Row.
        var row = tBody.insertRow(-1);

        //Add ControlId cell.
        var cell = $(row.insertCell(-1));
        cell.html(txtControlId.val());

        //Add Label cell.
        cell = $(row.insertCell(-1));
        cell.html(txtLabel.val());

        //Add Type cell.
        cell = $(row.insertCell(-1));
        cell.html(selectType.find('option:selected').text());


        //Add Visible cell.
        cell = $(row.insertCell(-1));
        if (chkVisible.prop("checked") == true)
            cell.html('Yes');
        else
            cell.html('No');

        //Add ReadOnly cell.
        cell = $(row.insertCell(-1));
        if (chkReadOnly.prop("checked") == true)
            cell.html('Yes');
        else
            cell.html('No');


        //Add Order cell.
        cell = $(row.insertCell(-1));
        cell.html(txtOrder.val());

        //Add Button cell.
        cell = $(row.insertCell(-1));
        var btnRemove = $("<input />");
        btnRemove.attr("type", "button");
        btnRemove.attr("onclick", "Remove(this);");
        btnRemove.attr("class", "btn btn-warning");
        btnRemove.val("Remove");
        cell.append(btnRemove);

        //Add Edit Button cell.
        var btnEdit = $("<input />");
        btnEdit.attr("type", "button");
        btnEdit.attr("onclick", "Edit(this);");
        btnEdit.attr("class", "btn btn-info");
        btnEdit.attr("id", "btnEdit");
        btnEdit.val("Edit");
        cell.append(btnEdit);


        //Clear the TextBoxes and other controls.
        txtControlId.val("");
        txtLabel.val("");
        $("#selectType option").each(function () {
            if ($("#selectType").text() == "Textbox") {
                $("#selectType").attr('selected', 'selected');
            }
        });
        chkVisible.prop('checked', false);
        chkReadOnly.prop('checked', false);
        txtOrder.val("");
    }
    else
    {
        alert("Invalid Data! Enter valid control information");
    }

});

function Remove(button) {
    //Determine the reference of the Row using the Button.
    var row = $(button).closest("TR");
    var name = $("TD", row).eq(0).html();
    if (confirm("Do you want to delete: " + name)) {

        //Get the reference of the Table.
        var table = $("#tblControls")[0];

        //Delete the Table row using it's Index.
        table.deleteRow(row[0].rowIndex);
    }
};

function Edit(button) {

    //Determine the reference of the Row using the Button.
    var row = $(button).closest("TR");
    txtControlId.value = row.find("TD").eq(0).html();
    txtLabel.value = row.find("TD").eq(1).html();
    $("#selectType option").each(function () {
        if ($("#selectType").text() == row.find("TD").eq(2).html()) {
            $("#selectType").attr('selected', 'selected');
        }
    });
    if (row.find("TD").eq(3).html() == 'Yes' || row.find("TD").eq(3).html() == 'True')
        chkVisible.checked= true;
    else
        chkVisible.checked = false;
    if (row.find("TD").eq(4).html() == 'Yes' || row.find("TD").eq(4).html() == 'True')
        chkReadOnly.checked= true;
    else
        chkReadOnly.checked= false;
    txtOrder.value = row.find("TD").eq(5).html();

    //Get the reference of the Table.
    var table = $("#tblControls")[0];
    table.deleteRow(row[0].rowIndex);

};

$("body").on("click", "#btnSave", function () {
   
    //Loop through the Table rows and build a JSON array.
    var controls = new Array();
    $("#tblControls TBODY TR").each(function () {
        var row = $(this);
        var control = {};
        control.ControlId = row.find("TD").eq(0).html();
        control.Label = row.find("TD").eq(1).html();
        control.Type = row.find("TD").eq(2).html();
        if (row.find("TD").eq(3).html() == 'Yes' || row.find("TD").eq(3).html() == 'True')
            control.IsVisible = 'true';
        else
            control.IsVisible = 'false';
        if (row.find("TD").eq(4).html() == 'Yes' || row.find("TD").eq(4).html() == 'True')
            control.IsReadOnly = 'true';
        else
            control.IsReadOnly = 'false';
        control.Order = row.find("TD").eq(5).html();
        controls.push(control);
    });
    if (controls.length == 0) {
        alert("Controls are needed to render the view!  Add Controls");
    }
    else {
            //Send the JSON array to Controller using AJAX.
            $.ajax({
                type: "POST",
                url: "/Home/InsertControls",
                data: JSON.stringify(controls),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                complete: function (result) {
                if (result.responseText) {
                    $('body').html(result.responseText);
                }
            }
        });
    }
});

function validateForm() {
    var validation = true;
    validation &= validateControlId();
    validation &= validateOrder();
    validation &= validateLabel();
    return validation;
}
function validateControlId() {
    var validation = true;

    if (isEmpty($("#txtControlId"))) {
        validation = false;
        alert("control id cannot be empty");
    }
    $("#tblControls TBODY TR").each(function () {
        var row = $(this);
        if (row.find("TD").eq(0).html() == $.trim($("#txtControlId").val())) {
            alert("Control Id cannot be duplicate");
            validation = false;
        }

    });

    return validation;
}
function validateOrder() {
    var validation = true;
    if (isEmpty($("#txtOrder"))) {
        validation = false;
        alert("Order cannot be empty or invalid number!.Enter valid order number.");
    }
    $("#tblControls TBODY TR").each(function () {
        var row = $(this);
        if (row.find("TD").eq(5).html() == $.trim($("#txtOrder").val())) {
            alert("Order cannot be duplicate");
            validation = false;
        }

    });

    return validation;
}
function validateLabel() {
    var validation = true;
    if (isEmpty($("#txtLabel")))
    {
        validation = false;
        alert("Label cannot be empty");
    }
    $("#tblControls TBODY TR").each(function ()
    {
        var row = $(this);
        if (row.find("TD").eq(1).html() == $.trim($("#txtLabel").val()))
        {
            alert("Label cannot be duplicate");
            validation = false;
        }

    });

    return validation;
}
function isEmpty(el) {
    if ($.trim(el.val()).length == 0)
    {
        return true;
    }
    else
    {
        return false;
    }


    





}