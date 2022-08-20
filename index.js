const rpc = require("discord-rpc"); // npm install discord-rpc
// url https://mstree.de/api/get.php + ? + api=token
fetch('https://mstree.de/api/get.php?api=token')
    .then(result => result.json())
    .then((output) => {
        var rpc = require("discord-rpc")
        const client = new rpc.Client({ transport: 'ipc' })
        client.on('ready', () => {
            client.request('SET_ACTIVITY', {
                pid: process.pid,
                activity : {
                    details : output["hashtag"],
                    assets : {
                        large_image : "picture",  // Picture need to be at the discord dev portal in Rich Presence -> Art Assets -> Rich Presence Assets
                        large_text : output["sentence"]
                    },
                    buttons : [{label : "Personal Mstree" , url : "https://mstree.de/"+output["name"]},{label : "Mstree Home" , url : "https://mstree.de/"}]
                }
            })
        })
        client.login({ clientId : "APPLICATION_ID" }).catch(console.error); // APPLICATION ID from your Aplication
    }).catch(err => console.error(err));
