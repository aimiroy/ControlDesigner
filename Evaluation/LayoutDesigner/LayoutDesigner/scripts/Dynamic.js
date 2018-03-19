var addCount = 0;
$("body").on("change", "#selectType", function ()
{
    var value = this.value;
    $('#Textbox').hide();
    $('#Number').hide();
    $('#Dropdown').hide();
    $('#TextArea').hide();
    $('#' + this.value).show();
});

//id of current option input box
var count = 1;

$("body").on("click", "#btnMore", function () 
{
    count++;
    var form = document.getElementById("Dropdown");
    var input = document.createElement("input");
    input.type = "text";
    input.id = count;
    input.className = "form-control";
    form.appendChild(input);
});
function LargestControlId()
{
    $("#tblControls TBODY TR").each(function ()
    {
        var row = $(this);
        var controlCount = parseInt(row.find("TD").eq(0).html(), 0);
        if (!isNaN(controlCount))
        {
            addCount = Math.max(controlCount, parseInt(addCount, 0));
        }
            
    });
    return addCount;
}
$("body").on("click", "#btnAdd", function ()
{
    if (validateForm())
    {
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

        var controlId;
        //Add ControlId cell.
        var cell = $(row.insertCell(-1));
        if (validateControlId())
        {
            cell.html(txtControlId.val());
            controlId = txtControlId.val();
        }
            
        else
        {
           var id= LargestControlId();
            id++;
            cell.html(id);
            controlId = id;
        }

        //Add Label cell.
        cell = $(row.insertCell(-1));
        cell.html(txtLabel.val());

        //Add Type cell.
        cell = $(row.insertCell(-1));
        cell.html(selectType.find('option:selected').text());

        //Add Attribute cell.
        cell = $(row.insertCell(-1));
        if (selectType.find('option:selected').text() == "Textbox")
        {
            cell.html('<label>MaxLength : </label>');
            cell.append('<span id=' + controlId + "maxlength" + '>' + document.getElementById("txtMaxLength").value + '</span>');
        }
            
        
        else if (selectType.find('option:selected').text() == "TextArea")
        {
            cell.html('<label>MaxLength : </label>');
            cell.append('<span id=' + controlId + "maxlength" + '>' + document.getElementById("txtAreaMaxLength").value + '</span>');
        }
            
        else if (selectType.find('option:selected').text() == "Number")
        {
            cell.html('<label>Max : </label>');
            cell.append('<span id='+ controlId + "max" + '>' + document.getElementById("txtMax").value + '</span><br /><label>Min : </label><span id=' + controlId + "min" + '>' + document.getElementById("txtMin").value + '</span>');
        }
        else if (selectType.find('option:selected').text() == "Dropdown")
        {
            cell.html('<label>Option(s) : </label>');
            cell.append('<span id=' + controlId + "count" + '>' + count + '</span><br />');
            for (var loop = 1; loop <= count;loop++)
            {
                cell.append('<span id=' + controlId + "option" + loop + '>' + document.getElementById(loop).value + '</span><br />');
                if(loop!=1)
                {
                    var textbox = document.getElementById(loop);
                    removing(textbox);
                }
                else
                {
                    document.getElementById(loop).innerHTML = "";
                }

            }
            count = 1;
        }
        else
            cell.html("");


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

        //Get select object
        var objSelect = document.getElementById("selectType");

        //Set selected
        setSelectedValue(objSelect, "Textbox");    

        document.getElementById("txtMaxLength").value = "";
        document.getElementById("txtMax").value = "";
        document.getElementById("txtMin").value = "";
        document.getElementById("txtAreaMaxLength").value = "";

        $('#Textbox').show();
        $('#Number').hide();
        $('#Dropdown').hide();
        $('#TextArea').hide();
        chkVisible.prop('checked', false);
        chkReadOnly.prop('checked', false);
        txtOrder.val("");
    }
    else
    {
        alert("Invalid Data! Enter valid control information");
    }

});

function Remove(button)
{
    //Determine the reference of the Row using the Button.
    var row = $(button).closest("TR");
    var name = $("TD", row).eq(0).html();
    if (confirm("Do you want to delete: " + name))
    {

        //Get the reference of the Table.
        var table = $("#tblControls")[0];

        //Delete the Table row using it's Index.
        table.deleteRow(row[0].rowIndex);
    }
};

function Edit(button)
{

    //Determine the reference of the Row using the Button.
    var row = $(button).closest("TR");
    var controlId = row.find("TD").eq(0).html();
    txtControlId.value = controlId;
    txtLabel.value = row.find("TD").eq(1).html();

    //Get select object
    var objSelect = document.getElementById("selectType");

    //Set selected
    setSelectedValue(objSelect, row.find("TD").eq(2).html());

    if (row.find("TD").eq(2).html() == "Textbox")
    {
        
        $('#Textbox').show();
        $('#Number').hide();
        $('#Dropdown').hide();
        $('#TextArea').hide();
        document.getElementById("txtMaxLength").value = document.getElementById(controlId + "maxlength").innerHTML;
    }
    else if (row.find("TD").eq(2).html() == "TextArea")
    {
        
        
        $('#Textbox').hide();
        $('#Number').hide();
        $('#Dropdown').hide();
        $('#TextArea').show();
        document.getElementById("txtAreaMaxLength").value = document.getElementById(controlId + "maxlength").innerHTML;
    }
        
    else if (row.find("TD").eq(2).html() == "Number")
    {
        
        $('#Textbox').hide();
        $('#Number').show();
        $('#Dropdown').hide();
        $('#TextArea').hide();
        document.getElementById("txtMin").value = document.getElementById(controlId + "min").innerHTML;
        document.getElementById("txtMax").value = document.getElementById(controlId + "max").innerHTML;
    }
    else if (row.find("TD").eq(2).html() == "Dropdown")
    {
        $('#Textbox').hide();
        $('#Number').hide();
        $('#Dropdown').show();
        $('#TextArea').hide();
        var options = document.getElementById(row.find("TD").eq(0).html() + "count").innerHTML;
        var optioncount = parseInt(options, 0);
        count = optioncount;
        document.getElementById("1").value = document.getElementById(row.find("TD").eq(0).html() + "option1").innerHTML;
        for (var loop = 2; loop <= optioncount; loop++)
        {
            var form = document.getElementById("Dropdown");
            var input = document.createElement("input");
            input.type = "text";
            input.id = loop;
            input.className = "form-control";
            input.value = document.getElementById(row.find("TD").eq(0).html() + "option" + loop).innerHTML;
            form.appendChild(input);
        }
    }
    else
    {

    }

    if (row.find("TD").eq(4).html() == 'Yes' || row.find("TD").eq(4).html() == 'True')
        chkVisible.checked = true;
    else
        chkVisible.checked = false;
    if (row.find("TD").eq(5).html() == 'Yes' || row.find("TD").eq(5).html() == 'True')
        chkReadOnly.checked = true;
    else
        chkReadOnly.checked = false;
    txtOrder.value = row.find("TD").eq(6).html();

    //Get the reference of the Table.
    var table = $("#tblControls")[0];
    table.deleteRow(row[0].rowIndex);

};

$("body").on("click", "#btnSave", function ()
{

    //Loop through the Table rows and build a JSON array.
    var controls = new Array();
    var controlAttributes = new Array();
    $("#tblControls TBODY TR").each(function ()
    {
        var row = $(this);
        var control = {};
        var controlAttribute = {};
        control.ControlId = row.find("TD").eq(0).html();
        control.Label = row.find("TD").eq(1).html();
        control.Type = row.find("TD").eq(2).html();


        if (row.find("TD").eq(2).html() == "Textbox")
        {
            controlAttribute.ControlId = row.find("TD").eq(0).html();
            controlAttribute.AttributeName = "maxlength";
            controlAttribute.AttributeValue = document.getElementById(row.find("TD").eq(0).html() + "maxlength").innerHTML;
            controlAttributes.push(controlAttribute);
        }
        else if (row.find("TD").eq(2).html() == "TextArea")
        {
            controlAttribute.ControlId = row.find("TD").eq(0).html();
            controlAttribute.AttributeName = "maxlength";
            controlAttribute.AttributeValue = document.getElementById(row.find("TD").eq(0).html() + "maxlength").innerHTML;
            controlAttributes.push(controlAttribute);
        }

        else if (row.find("TD").eq(2).html() == "Number")
        {
            controlAttribute.ControlId = row.find("TD").eq(0).html();
            controlAttribute.AttributeName = "max";
            controlAttribute.AttributeValue = document.getElementById(row.find("TD").eq(0).html() + "max").innerHTML;
            controlAttributes.push(controlAttribute);
            var controlAttributeMin = {};
            controlAttributeMin.ControlId = row.find("TD").eq(0).html();
            controlAttributeMin.AttributeName = "min";
            controlAttributeMin.AttributeValue = document.getElementById(row.find("TD").eq(0).html() + "min").innerHTML;
            controlAttributes.push(controlAttributeMin);
        }
        else if (row.find("TD").eq(2).html() == "Dropdown")
        {

            var options = document.getElementById(row.find("TD").eq(0).html() + "count").innerHTML;
            var optioncount = parseInt(options, 0);
            for(var loop=1;loop<=optioncount;loop++)
            {
                var controlAttributeOption = {};
                controlAttributeOption.ControlId = row.find("TD").eq(0).html();
                controlAttributeOption.AttributeName = "option";
                controlAttributeOption.AttributeValue = document.getElementById(row.find("TD").eq(0).html() + "option"+ loop).innerHTML;
                controlAttributes.push(controlAttributeOption);
            }
        }
        else { }

        if (row.find("TD").eq(4).html() == 'Yes' || row.find("TD").eq(4).html() == 'True')
            control.IsVisible = 'true';
        else
            control.IsVisible = 'false';
        if (row.find("TD").eq(5).html() == 'Yes' || row.find("TD").eq(5).html() == 'True')
            control.IsReadOnly = 'true';
        else
            control.IsReadOnly = 'false';
        control.Order = row.find("TD").eq(6).html();
        
        controls.push(control);
    });
    if (controls.length == 0)
    {
        alert("Controls are needed to render the view!  Add Controls");
    }
    else
    {
        //Send the JSON array to Controller using AJAX.
        $.ajax({
            type: "POST",
            url: "/Home/InsertControls",
            data: {
                controlList: controls,
                attributeList: controlAttributes
                   },
            complete: function (result)
            {
                if (result.responseText)
                {
                    $('body').html(result.responseText);
                }
            }
        });
    }
});

function validateForm()
{
    var validation = true;
    validation &= validateOrder();
    validation &= validateLabel();
    if ($("#selectType option:selected").text() == "Textbox")
    { 
        validation &= validateMaxLength();
    }
    else if ($("#selectType option:selected").text() == "TextArea")
    {
        validation &= validateAreaMaxLength();
    }

    else if ($("#selectType option:selected").text() == "Number")
    {
        
        validation &= validateMin();
        validation &= validateMax();
    }
    else if ($("#selectType option:selected").text() == "Dropdown")
    { 
        for (var loop = 1; loop <= count; loop++)
        {
            validation &= validateOption(loop);

        }
        
    }
    else{}
    return validation;
}
function validateControlId()
{
    var validation = true;

    if (isEmpty($("#txtControlId")))
    {
        validation = false;
    }
    return validation;
}
function validateOrder()
{
    var validation = true;
    if (isEmpty($("#txtOrder")))
    {
        validation = false;
        alert("Order cannot be empty or invalid number!.Enter valid order number.");
    }
    $("#tblControls TBODY TR").each(function ()
    {
        var row = $(this);
        if (row.find("TD").eq(5).html() == $.trim($("#txtOrder").val()))
        {
            alert("Order cannot be duplicate");
            validation = false;
        }

    });

    return validation;
}
function validateMaxLength()
{
    var validation = true;
    if (isEmpty($("#txtMaxLength")))
    {
        validation = false;
        alert("MaxLength cannot be empty");
    }
    return validation;
}
function validateAreaMaxLength()
{
    var validation = true;
    if (isEmpty($("#txtAreaMaxLength")))
    {
        validation = false;
        alert("MaxLength cannot be empty");
    }

    return validation;
}
function validateMax() {
    var validation = true;
    if (isEmpty($("#txtMax"))) {
        validation = false;
        alert("Max cannot be empty");
    }
    var max=document.getElementById("txtMax").value;
    var min = document.getElementById("txtMin").value;
    if(parseInt(max,0) < parseInt(min,0))
    {
        validation = false;
        alert("Max cannot be less than Min");
    }
    return validation;
}
function validateMin() {
    var validation = true;
    if (isEmpty($("#txtMin"))) {
        validation = false;
        alert("Min cannot be empty");
    }
    return validation;
}
function validateOption(positionId)
{
    var validation = true;
    if (isEmpty($('#'+(positionId))))
    {
        validation = false;
        alert("Option cannot be empty! Option is empty in textbox number : "+positionId);
    }
    for (loop = 1; loop < positionId; loop++)
    {
        if(document.getElementById(positionId).value == document.getElementById(loop).value)
        {
            validation = false;
            alert("Option cannot be repeated! Option in textbox number : " + positionId +"is same as option in textbox"+loop );
        }
    }
    return validation;
}
function validateLabel()
{
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
            alert("Label cannot be repeated");
            validation = false;
        }

    });
    var re = /^[A-Za-z]+$/;
    if (!(re.test(document.getElementById("txtLabel").value)))
    {
        alert('Invalid Label! Label cannot contain numbers and Spaces.');
        validation = false;
    }
    return validation;
}
function isEmpty(el)
{
    if ($.trim(el.val()).length == 0)
    {
        return true;
    }
    else
    {
        return false;
    }
}
function setSelectedValue(selectObj, valueToSet) {
    for (var i = 0; i < selectObj.options.length; i++) {
        if (selectObj.options[i].text == valueToSet) {
            selectObj.options[i].selected = true;
            return;
        }
    }
}
function removing(element)
{

    element.parentNode.removeChild(element);
}