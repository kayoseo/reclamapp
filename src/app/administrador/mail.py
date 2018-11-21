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

curl --request POST \
--url https://api.sendgrid.com/v3/mail/send \
--header 'authorization: Bearer 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' \
--header 'content-type: application/json' \
--data '{"personalizations":[{"to":[{"email":"juan_i_roman@hotmail.com","name":"Juan Román"}],"subject":"Holaaa"}],"content": [{"type": "text/plain", "value": "Hola que hace"}],"from":{"email":"probadorprimero@gmail.com","name":"Juan Probador"},"reply_to":{"email":"probadorprimero@gmail.com","name":"Juan Probador"}}'


curl -s --user 'api:99fee0ed0d6be8fe74d44a5b543c2cac-9525e19d-a7dcea08'     https://api.mailgun.net/v3/sandbox22f92fedef964fb08ce5e769d1a67ace.mailgun.org/messages     -F from='mailgun@sandbox22f92fedef964fb08ce5e769d1a67ace.mailgun.org'     -F to='juan_i_roman@hotmail.com'     -F subject='Hello'     -F text='Testing some Mailgun awesomeness!'
