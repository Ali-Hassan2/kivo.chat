Check if the HTTP method is GET. If not, return "Please use the correct method."
Get the current user session. If the user is not logged in, return "No user logged in."
Use the logged-in user’s ID as the receiver ID.
Find all requests in the database where the receiver ID matches and the status is either PENDING or REJECTED.
Populate the sender’s username for each request.
Return a success response with the message and the list of requests.
If an error occurs, log it and return a server error message.
