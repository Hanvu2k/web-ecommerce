import getFromStorage from "./getFromStorage";

// Retrieving the usersArr array from storage or initializing it as an empty array
const usersArr = JSON.parse(getFromStorage("usersArr")) || [];

const validation = (value) => {
    // Initialize an empty errors object to store validation errors
    let errors = {
        login: {},
        register: {},
    };

    // Check if the fullName property is missing and add an error message to errors.register.fullName if it is
    if (!value.fullName) {
        errors.register.fullName = "Fullname required!";
    }

    // Check if the email property is missing, has an invalid format, or is already used by an existing user
    const userEmail = usersArr.some((user) => user.email === value.email);
    if (!value.email) {
        errors.login.email = errors.register.email = "Email required!";
    } else if (!value.email.includes("@")) {
        errors.login.email = errors.register.email = "Invalid email!";
    } else if (userEmail) {
        errors.register.email = "Email already in use!";
    } else if (!userEmail) {
        errors.login.email = "Incorrect email!";
    }

    // Check if the password property is missing, has less than 8 characters, or is incorrect
    const userPassword = usersArr.some(
        (user) => user.password === value.password
    );
    if (!value.password) {
        errors.login.password = errors.register.password = "Password required!";
    } else if (value.password.length < 8) {
        errors.login.password = errors.register.password =
            "Password must be at least 8 characters!";
    } else if (!userPassword) {
        errors.login.password = "Incorrect password!";
    }

    // Check if the phone property is missing or has less than 9 characters
    if (!value.phone) {
        errors.register.phone = "Phone number required!";
    } else if (value.phone.length < 9) {
        errors.register.phone = "Invalid phone number!";
    }

    // Set the login or register error object to null if there are no errors
    if (Object.keys(errors.login).length === 0) {
        errors.login = null;
    }
    if (Object.keys(errors.register).length === 0) {
        errors.register = null;
    }

    return errors;
};

export default validation;
