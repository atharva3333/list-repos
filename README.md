# GitHub Profile Viewer

This simple web application allows users to search for a GitHub profile and view basic information along with repositories. It is built using HTML, CSS, and JavaScript with Bootstrap and jQuery.

## Features

- Search for a GitHub profile using the username.
- View basic profile information including name, username, and profile picture.
- Display repositories for the user with pagination.
- Handle edge cases such as user not found, API rate limiting, and network errors.

## Edge Cases Handling

### User Not Found
If the entered GitHub username is not found, the application displays a "User not found" message.

### GitHub API Rate Limiting
If the GitHub API rate limit is exceeded, the application displays a message informing the user about the rate limit and suggesting they wait and try again later.

### Network Errors
In case of network errors, the application displays a message indicating a network error and suggests the user check their internet connection.


