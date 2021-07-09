const messages = {};


/////////////////////
//      login      //
/////////////////////

messages.loggedInFailedUserNotFound = () => {
    return `User not found. Please sign up!`;
}; 

messages.loggedInFailedIncorrectCredentials = () => {
    return `Incorrect credentials. Please provide valid email and password!`;
};

messages.loggedInSuccessful = () => {
    return `Log in successful!`;
};


/////////////////////
//     sign up     //
/////////////////////

messages.signedUpFailed = () => {
    return `User already exists with this email!`;
};

messages.signedUpSuccessful = () => {
    return `Sign up successful!`;
};


/////////////////////
//    authToken    //
/////////////////////

messages.authFailedTokenNotAdded = () => {
    return `Please add authentication token!`;
};

messages.authFailedTokenExpired = () => {
    return `Authentication token expired!`;
};


/////////////////////
//     article     //
/////////////////////

messages.articleCreated = () => {
    return `Article created successfully!`;
};

messages.articleUpdated = () => {
    return `Article updated successfully!`;
};

messages.articleDeleted = () => {
    return `Article deleted successfully!`;
};

messages.articleFetched = () => {
    return `Article fetched!`;
};

messages.articleNotFound = () => {
    return `Article not found!`;
};

messages.articleList = () => {
    return `Article List!`;
};



module.exports = messages;