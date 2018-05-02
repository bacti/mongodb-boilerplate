var QRCode = require('qrcode')

QRCode.toDataURL('I am a pony!', function (err, url)
{
    console.log(url)

    var base64Data = url.replace(/^data:image\/png;base64,/, "")

    require("fs").writeFile("out.png", base64Data, 'base64', function(err)
    {
        console.log(err);
    });
})
