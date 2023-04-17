function validation(values) {
    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    
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

    return error;
}

export default validation