const generateUsername = (email) => {
    if (!email.includes("@")) {
        throw new Error("Invalid email format");
    }

    let usernameBase = email.split("@")[0];

    // Remove special characters (except letters and numbers)
    usernameBase = usernameBase.replace(/[^a-zA-Z0-9]/g, "")

    // Appending a random **two-digit** number to ensure uniqueness
    const randomNum = Math.floor(10 + Math.random() * 90); 

    return `${usernameBase}${randomNum}`.toLowerCase();
};

export {
    generateUsername 
}