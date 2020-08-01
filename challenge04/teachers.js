const fs = require("fs")
const data = require(__dirname+"/data.json")

exports.post = function ( req, res ) {    
    
    const keys = Object.keys(req.body)

    for (let key of keys) {
        if (req.body[key] == "") {
            return res.send("Please, fill all fields!")
        }
    }

    const { avatar_url, fullname, birth, education_level, classes, occupation_area } = req.body
    req.body.birth = Date.parse(birth)
    const id = Number(data.teachers.length + 1)
    const created_at = Date.now()
    
    data.teachers.push ( {
        id,
        avatar_url, 
        fullname, 
        birth, 
        education_level, 
        classes, 
        occupation_area,
        created_at
    })

    fs.writeFile("challenge04/data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) {
            return res.send("Write file error!")
        }

        return res.redirect("/teachers")
    })

}