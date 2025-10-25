USER LOGGED IN CHECK
Verify if the user is logged in using server session.
If user is logged in, proceed to next step.
If not logged in, return “Please login first.”

REQUEST ID PROVIDED CHECK
Extract requestId from query parameters.
If provided, decode and validate it.
If not provided, return “Request ID not provided.”

REQUEST ID VALIDATION
Validate the requestId using schema validation.
If valid, continue.
If invalid, return “Request ID validation failed.”

PENDING REQUEST EXISTENCE CHECK
Check if a pending request exists for the given requestId.
If exists, continue.
If not found, return “No pending request found.”

SENDER AND RECEIVER VALIDATION
Fetch sender and receiver users using their IDs from the request document.
If both users exist, proceed.
If either is missing, return “Sender or Receiver not found.”

FRIENDSHIP DUPLICATE CHECK
Check if the sender already exists in receiver’s friends list.
If already a friend, return “Already friends.”
If not, proceed.

UPDATE FRIEND LISTS
Add receiver to sender’s friends list.
Add sender to receiver’s friends list.

UPDATE REQUEST STATUS
Update the request document status to “ACCEPTED.”

REMOVE REQUEST REFERENCES
Remove the request ID from both sender’s and receiver’s requests arrays.

SAVE CHANGES
Save both updated user documents and the updated request document.

RETURN SUCCESS RESPONSE
Return success message confirming the request has been accepted.
