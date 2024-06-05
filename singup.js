function setlocalstorage(name, valuess){
    const xdxdlololol = window.localStorage.setItem(name, valuess)
    return xdxdlololol
}

document.getElementById("singups").addEventListener("click", () => {
    fetch(`https://essaprogrammer2.pythonanywhere.com/post/register/username=${document.getElementById("userinput").value}&password=${document.getElementById("passinput").value}&email=${document.getElementById("emailinput").value}`, {method: "POST"})
    .then(response => response.json())
    .then(data => {
       if (data == "berhasil"){
        setlocalstorage("username", document.getElementById("userinput").value)
        setlocalstorage("password", document.getElementById("passinput").value)
        window.location.replace("index.html")
       }
    })
    .catch(error => console.error(error));
})