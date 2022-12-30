#Steps for deploying app on fly.io

Run the Powershell install script:

`iwr https://fly.io/install.ps1 -useb | iex`

After installing fly.io

If it’s your first time using Fly.io, you’ll need to sign up for an account. To do so, run:
`flyctl auth signup`
All you need to do now is sign in with :
`flyctl auth login`
Launch an App on Fly
`flyctl launch --region ord --name mstitane-phonebook-2022 --build-only`
with :
* --name  a name of your domain
* --region The target region (see 'flyctl platform regions')

add env variables :
`flyctl secrets set MONGODB_URI='mongodb+srv://mstitane:${pass}@cluster0.eyyfo0t.mongodb.net/phoneBook?retryWrites=true&w=majority' `
`flyctl secrets set PORT=8080  `

deploy it using :
`flyctl deploy`

open in browser using :
`flyctl open`

https://mstitane-phonebook-2022np.fly.dev/
