# zoom-clone

This **Node.js** project is bootstrapped with [`yarn2`](https://yarnpkg.com/). This is a simple implementation of a Video Chat App built with [`Socker.io`](https://socket.io/) and [`Peerjs`](https://peerjs.com/) 

  

## Run the Demo

  
First Install peerjs globally :

```bash
npm i -g peer
```

then, run the express server :

```bash

npm run start:dev

# or

yarn start:dev

```

finally run the peerjs server :

```bash
peerjs --port 3004 # change the default port  as you want
```
  

- Open [http://localhost:3003](http://localhost:3003). 
- Authorize your browser to access to your camera
- Copy the url with the generated **roomId** and open it in a new tab (you should now see 2 users connected to the room with their video stream)


## Try Multiple Users in Local


If you want to make a quick demo with different users on different networks (Other computer, smartphones etc.). You can try [NgRok](https://ngrok.com/)

First install it : 
```bash
# Macos
brew install ngrok/ngrok/ngrok
# Windows
choco install ngrok
# Linux 
sudo tar xvzf ~/Downloads/ngrok-v3-stable-linux-amd64.tgz -C /usr/local/bin
```

Connect to the [NgRok Dashboard](https://dashboard.ngrok.com/get-started/setup) and follow the installation process

Update your local ngRok config file (`~/.ngrok2/ngrok.yml`) like this : 

```yml
authtoken: <YourAuthToken>
tunnels:
  peer: # give the name you want
    addr: 3004
    proto: http
  node: # give the name you want
    addr: 3003
    proto: http
```

Run **ngrok** tunnel : 
```bash
ngrok start --all
```

Copy **ngRok's** generated urls (free plan) :
#### Example :
```bash
Forwarding    https://d18b-93-1-15-153.ngrok.io -> http://localhost:3004
Forwarding    https://faaf-93-1-15-153.ngrok.io -> http://localhost:3003
```

Go to `public/script.js` and replace `myPeer` `host` and `port` by the **ngRok's** url pinned on port `3004` :

```js
const  myPeer = new  Peer(undefined, {
	host:  'd18b-93-1-15-153.ngrok.io',
	port:  '443' // default port for https
});
```

Now you can visit the **ngRok's** url pinned on port `3003` (`https://faaf-93-1-15-153.ngrok.io` in the example) and share the link with the **roomId** to a friend.