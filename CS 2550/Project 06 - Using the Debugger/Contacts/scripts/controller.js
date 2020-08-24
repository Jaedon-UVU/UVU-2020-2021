////////////////////////////////////////////////////////////////////////////////
///   P a g e  E v e n t   H a n d l e r s
////////////////////////////////////////////////////////////////////////////////

/************************************************/
function onPageLoad() {
    // Wire up all button handlers
    document.getElementById('newBtn').onclick = onNewClick;
    //document.getElementById('cancelBtn').click = onEditCancelClick;
    document.getElementById('cancelBtn').onclick = onFormCancel;
    document.getElementById('saveBtn').onclick = onFormSave;

    modelCreateContact("John Smith", "(385) 390-2930", 0, 25, 1);
    modelCreateContact("Sarah Jensen", "(801) 439-9214", 1, 21, 2);
    modelCreateContact("Ricardo Torres", "(801) 328-0877", 0, 22, 5);
    modelCreateContact("Amy Perkins", "(801) 936-8764", 2, 19, 3);

    var items = modelReadAllContacts();
    for (var i = 0; i < items.length; i++)
        addTableRow(items[i]);

    clearInputForm();
}

/************************************************/
function onNewClick() {
    document.getElementById('formTitle').innerHTML = "New Contact";
    document.getElementById('contactEditArea').style.display = 'block';
    document.getElementById('contactsListArea').style.display = 'none';
}

/************************************************/
function onFormCancel() {
    clearInputForm();
}

/************************************************/
function onFormSave() {
    // Validate the data in all the controls.
    if (!validateForm())
        return;

    var form = document.forms['contactEditForm'];
    if (currentContactId > 0) {
        var contact = modelUpdateContact(
            currentContactId,
            form.nameEdit.value,
            form.phoneNumberEdit.value,
            form.phoneNumberTypeSelect.value,
            form.ageEdit.value,
            form.ringtoneRadio.value);

        updateTableRow(contact);
    } else {
        // Get the data from the form controls, and
        // create a new Contact object.
        var newContact = modelCreateContact(
            form.nameEdit.value,
            form.phoneNumberEdit.value,
            form.phoneNumberTypeSelect.value,
            form.ageEdit.value,
            form.ringtoneRadio.value);

        // Add the new contact to the view
        addTableRow(newContact);
    }

    // Clear the input form and all errors.
    clearInputForm()
}

/************************************************/
function onItemDelete(id) {
    // Fetch the student record from the model
    var contact = modelReadContact(id);
    if (contact == null) {
        alert("Error: unable to find contact ID " + id)
    }

    if (!confirm("Are you sure you want to delete " + contact.name + "?"))
        return;

    modelDeleteContact(id);

    var tr = document.getElementById('contact' + contact.id);
    tr.remove();
}

/************************************************/
function onItemEdit(itemId) {
    document.getElementById('formTitle').innerHTML = "Edit Contact";

    currentContactId = itemId;
    var form = document.forms['contactEditForm'];

    var item = modelReadContact(itemId);

    form.nameEdit.value = item.name;
    form.phoneNumberEdit.value = item.number;
    form.phoneNumberTypeSelect.selectedIndex = item.numberType;
    form.ageEdit.value = item.age;
    form.ringtoneRadio.value = item.ringtone;

    document.getElementById('contactEditArea').style.display = 'block';
    document.getElementById('contactsListArea').style.display = 'none';
}


////////////////////////////////////////////////////////////////////////////////
///   B u s i n e s s   L o g i c
////////////////////////////////////////////////////////////////////////////////

var currentContactId = 0;

/************************************************/
function clearInputForm() {
    // Hide the form, show the contact list.
    document.getElementById('contactEditArea').style.display = 'none';
    document.getElementById('contactsListArea').style.display = 'block';

    // Reset all form controls
    var form = document.forms['contactEditForm'];

    form.nameEdit.value = '';
    form.phoneNumberEdit.value = '';
    form.phoneNumberTypeSelect.selectedIndex = 0;
    form.ageEdit.value = '';
    form.ringtoneRadio.value = 0;

    // Reset all validation errors
    document.getElementById('nameError').innerHTML = '';
    document.getElementById('ageError').innerHTML = '';
}

/************************************************/
function validateForm() {
    var form = document.forms['contactEditForm'];
    var validated = true;

    // Name textbox
    if (form.nameEdit.value == "") {
        document.getElementById("nameError").innerHTML = "Name not given.";
        validated = false;
    } else
        document.getElementById("nameError").innerHTML = "";

    // Phone number textbox
    if (form.phoneNumberEdit.value == "") {
        document.getElementById("phoneNumberError").innerHTML = "Phone number not given.";
        validated = false;
    } else
        document.getElementById("phoneNumberError").innerHTML = "";

    // Age
    if (form.ageEdit.value == "") {
        document.getElementById("ageError").innerHTML = "Age not given.";
        validated = false;
    } else {
        var age = parseInt(form.ageEdit.value);
        if (isNaN(age)) {
            document.getElementById("ageError").innerHTML = "Age must be a number.";
            validated = false;
        } else if (age < 0 || age > 120) {
            document.getElementById("ageError").innerHTML = "Age must be between 0 and 120.";
            validated = false;
        } else
            document.getElementById("phoneNumberError").innerHTML = "";
    }

    // Return the final result
    return validated;
}

function updateTableRow(contact) {
    var id = 'contact' + contact.id.toString();
    var row = document.getElementById(id);
    row.childNodes[0].innerHTML = contact.name;
    row.childNodes[1].innerHTML = contact.number;
}

function addTableRow(contact) {
    // Compose a new row, and set its id attribute.  This helps us
    // if the user wants to change the student's info later.
    var row = "<tr id='contact" + contact.id + "'>";

    // Append whatever <td> elements we want to display.
    row += "<td>" + contact.name + "</td>";
    row += "<td>" + contact.number + "</td>";
    row += "<td><button type='button' onclick='onItemEdit(" + contact.id + ")'>Edit</button></td>";
    row += "<td><button type='button' onclick='onItemDelete(" + contact.id + ")'>Delete</button></td>";
    row += "</tr>";

    // We're done.  Add the new row to the table.
    document.getElementById("contactsTable").innerHTML += row;
}