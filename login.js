function setlocalstorage(name, valuess){
    const xdxdlololol = window.localStorage.setItem(name, valuess)
    return xdxdlololol
}

document.getElementById("loginbtn").addEventListener("click", () => {
fetch('https://essaprogrammer2.pythonanywhere.com/get/all/userdata', {method: "GET"})
    .then(response => response.json())
    .then(data => {
        let allusernames = []
        let passwordsss = []
        for(let i = 0; i < data.usernames.length; i++){
            allusernames.push(data.usernames[i])
            passwordsss.push(data.passwords[i])
        }

        if (allusernames.includes(document.getElementById("userinput").value)){
            if (document.getElementById("passinput").value == passwordsss[allusernames.indexOf(document.getElementById("userinput").value)]){
                setlocalstorage("username", document.getElementById("userinput").value)
                setlocalstorage("password", document.getElementById("passinput").value)
                window.location.replace("index.html")
            }else {
                alert("password salah")
            }
        }else {
            alert("password salah")
        }
    })
    .catch(error => console.error(error));
})