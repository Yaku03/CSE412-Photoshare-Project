function validation(values) {
    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if(values.fname === "") {
        error.firstName = "Error: First Name field cannot be empty"
    }
    else {
        error.firstName = ""
    }

    if(values.lname === "") {
        error.lastName = "Error: Last Name field cannot be empty"
    }
    else {
        error.lastName = ""
    }

    if(values.email === "") {
        error.email = "Error: Email field cannot be empty"
    }
    else if(!email_pattern.test(values.email)) {
        error.email_pattern = "Error: Invalid email format"
    }
    else {
        error.email = ""
    }


    if(values.password === "") {
        error.password = "Error: Password field cannot be empty"
    }
    else {
        error.password = ""
    }

    if(values.gender === "") {
        error.gender = "Error: Gender field cannot be empty"
    }
    else {
        error.gender = ""
    }

    if(values.hometown === "") {
        error.hometown = "Error: Hometown field cannot be empty"
    }
    else {
        error.hometown = ""
    }

    if(values.dob === "") {
        error.dob = "Error: Gender field cannot be empty"
    }
    else {
        error.dob = ""
    }

    return error;
}

export default validation