////////////////////////////////////////////////////////////////////////////////
///   M o d e l
////////////////////////////////////////////////////////////////////////////////

// This is an array to keep track of all the constacts that have been entered.
var contactList = [];

// This is an internal ID that we give each new contact object.  This will make each
// record easier to edit (in a later assignment).
var nextContactId = 1000;

/************************************************/
function Contact(name, number, numberType, age, ringtone) {
    this.id = nextContactId++;
    this.name = name;
    this.number = number;
    this.numberType = numberType;
    this.age = age;
    this.ringtone = ringtone;
}

/************************************************/
function modelCreateContact(name, number, numberType, age, ringtone) {
    var newContact = new Contact(
        name,
        number,
        numberType,
        age,
        ringtone);

    // Add the new Contact object to the model.
    contactList.push(newContact);

    // Return the new contact
    return newContact;
}

/************************************************/
function modelReadAllContacts() {
    return contactList;
}

/************************************************/
function modelReadContact(id) {
    for (x in contactList) {
        if (contactList[x].id === id) {
            return contactList[x];
        }
    }

    return null;
}

/************************************************/
function modelUpdateContact(id, name, number, numberType, age, ringtone) {
    for (x in contactList) {
        if (contactList[x].id === id) {
            contactList[x].name = name;
            contactList[x].number = number;
            contactList[x].numberType = numberType;
            contactList[x].age = age;
            contactList[x].ringtone = ringtone;

            return contactList[x];
        }
    }

    return null;
}

/************************************************/
function modelDeleteContact(id) {
    for (x in contactList) {
        if (contactList[x].id === id) {
            contactList.splice(x, 1);
        }
    }
}
