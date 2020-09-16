const express = require('express');
const fs = require('fs');
const path = require('path');

const srcPath = 'F:/Files';

function getMasterArr() {
    let masterArray = []

    masterArray = fs.readdirSync(srcPath).map(file => [path.join(srcPath, file), fs.statSync(path.join(srcPath, file)).isDirectory(), path.extname(file)])
    return masterArray;
}
const masterArray = getMasterArr();


const app = express();

const iconMap = {
    "": "target.ico",
    ".mp4": "mp4.png",
    ".mkv": "mp4.png",
    ".wav": "mp4.png",
    ".zip": "zip.png",
    ".exe": "exe.ico",
    ".pdf": "pdf.png",
    ".xls": "off.png",
    ".ppt": "off.png",
    ".doc": "off.png",
    ".docx": "off.png",
    ".pptx": "off.png",
    ".xlsx": "off.png",
    ".png": "image.png",
    ".jpeg": "image.png",
    ".jpg": "image.png",
}

app.get('/', (req, res) => {
    let html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <style>
        .container {
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            align-self: start;
            
        }
    
        .individual {
            border: 1px solid black;
            border-radius: 5px;
            margin: 10px;
            text-align: center;
        }
        .folder{
            border: 2px solid black;
            border-radius: 5px;
            margin: 10px;
            text-align: center;
            font-style: italic;
            font-weight: bold;
        }
        .folder:hover{
            border: 2px solid blueviolet;
            border-radius: 5px;
            margin: 10px;
            text-align: center;
            font-style: italic;
            font-weight: bold;
        }
    </style>
    <body>
        <div class="container">`;
    for(var i = 0; i < masterArray.length; i++) {
        const fullPath = masterArray[i][0];
        const name = masterArray[i][0].split('\\').pop();
        const dir = masterArray[i][1];
        const ext = masterArray[i][2];

        // console.log(fullPath);


        if(dir) {
            html += `<div onclick="folderClick()" class="individual folder">
            <img src="/foldericon/folder" alt="" srcset="" width="50" height="50">
            <p>${name}</p>
        </div>`
        } else {
            html += `<div onclick="location.assign('/show/${i}')" class="individual">
            <img src="/foldericon/${ext}" alt="" srcset="" width="50" height="50">
            <p>${name}</p></div>`
        }
        
        
        
    }
    html += `</div></body><script>function folderClick(){alert("permission denied!");}</script></html>`
    res.send(html);
})


app.get('/foldericon/:icon', (req, res) => {
    let icon = req.params.icon;
    // console.log("Recieved: " , icon);
    if(icon === "folder") {
        icon = "target.ico";
    } else if(iconMap[icon] === undefined) {
        icon = "crash.png";
    }else {
        icon = iconMap[icon];
    }
    res.sendFile(path.join(__dirname, `/imgs/${icon}`));
});

app.get('/show/:name', (req, res) => {
    let name = masterArray[req.params.name][0];
    console.log("Requested to show: " , name);
    res.sendFile(name);
});


const PORT = process.env.PORT || 9999
app.listen(9999);