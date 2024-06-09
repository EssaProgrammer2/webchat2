let selectedorang = ""
let mycontact = []


function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function deleteCookie(cname) {
    setCookie(cname, null, null)
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

function getlocalstorage(name){
    const lolxd = window.localStorage.getItem(name)
    return lolxd
}

function setlocalstorage(name, valuess){
    const xdxdlololol = window.localStorage.setItem(name, valuess)
    return xdxdlololol
}
if (window.localStorage.getItem("username") == null && window.localStorage.getItem("username") == "null"){
    document.getElementById("namany").textContent = "belum login"
    const newel = document.createElement("option")
    newel.textContent = "sign up"
    const newel2 = document.createElement("option")
    newel2.textContent = "login"
    document.getElementById("divapainiya").append(newel)
    document.getElementById("divapainiya").append(newel2)
    document.getElementById("divapainiya").addEventListener("change", () => {
        if (document.getElementById("divapainiya").value == "sign up"){
            window.location.replace("singup.html")
        }else if (document.getElementById("divapainiya").value == "login"){
            window.location.replace("login.html")
        }
    })
}else{
    document.getElementById("namany").textContent = getlocalstorage("username")
    const newel = document.createElement("option")
    newel.textContent = "sign out"
    document.getElementById("divapainiya").append(newel)
    document.getElementById("divapainiya").addEventListener("change", () => {
        if (document.getElementById("divapainiya").value == "sign out"){
            setlocalstorage("username", "null")
            setlocalstorage("password", "null")
            window.location.reload()
        }
    })
}
document.getElementById("chating").addEventListener("click", () => {
    if (selectedorang != ""){
        if (document.getElementById("buatnulis").value != ""){
        fetch(`https://essaprogrammer2.pythonanywhere.com/post/chat/username=${getlocalstorage("username")}&password=${getlocalstorage("password")}&haghagjiso=${selectedorang}&message=${document.getElementById("buatnulis").value}`, {method: "GET"})
    .then(response => response.json())
    .then(data => {
        document.getElementById("buatnulis").value = ""
    })
    .catch(error => console.error(error));
}
}
})
document.getElementById("buatnulis").addEventListener("keyup", (e) => {
    if (selectedorang != ""){
      if (e.keyCode == 13){
        if (document.getElementById("buatnulis").value != ""){
            fetch(`https://essaprogrammer2.pythonanywhere.com/post/chat/username=${getlocalstorage("username")}&password=${getlocalstorage("password")}&haghagjiso=${selectedorang}&message=${document.getElementById("buatnulis").value}`, {method: "GET"})
        .then(response => response.json())
        .then(data => {
          document.getElementById("buatnulis").value = ""
        })
        .catch(error => console.error(error));
    }
      }
    }
  })

document.getElementById("addcon").addEventListener("click", () => {
    let = inputancontact = prompt("username: ")
    if (inputancontact != "" && inputancontact != null){
    fetch(`https://essaprogrammer2.pythonanywhere.com/post/friend/myusername=${getlocalstorage("username")}&username=${inputancontact}`, {method: "POST"})
    .then(response => response.json())
    .then(data => {
        if (data == "berhasil"){
        window.location.reload()
        }
    })
    .catch(error => console.error(error));
}
})

document.getElementById("remcon").addEventListener("click", () => {
    let = inputancontact = prompt("username: ")
    if (inputancontact != "" && inputancontact != null){
    fetch(`https://essaprogrammer2.pythonanywhere.com/post/delfriends/myusername=${getlocalstorage("username")}&username=${inputancontact}`, {method: "POST"})
    .then(response => response.json())
    .then(data => {
        if (data == "berhasil"){
        window.location.reload()
        }
    })
    .catch(error => console.error(error));
}
})

fetch(`https://essaprogrammer2.pythonanywhere.com/get/userdata/username=${getlocalstorage("username")}`, {method: "GET"})
    .then(response => response.json())
    .then(data => {
        for(let i = 0; i < data.friends.length; i++){
            mycontact.push(data.friends[i])
            const mynewel = document.createElement("button")
            mynewel.textContent = data.friends[i]
            mynewel.id = data.friends[i]
            mynewel.addEventListener("click", () => {
                document.getElementById("buatnulis").placeholder = "write text to " + data.friends[i]
                selectedorang = data.friends[i]
            })
            document.getElementById("containerfriend").append(mynewel)
        }
    })
    .catch(error => console.error(error));

let mymessagess = []
let mymessagessid = []
let orangmessagesids = []
let orangmessagess = []
let lastedselectedorang = ""
let newelmy = document.getElementById("thecon")
setInterval(() => {
    if (selectedorang != ""){
        //console.log(`https://essaprogrammer2.pythonanywhere.com/get/chat/username=${getlocalstorage("username")}&penerima=${selectedorang}`)
    fetch(`https://essaprogrammer2.pythonanywhere.com/get/chat/username=${getlocalstorage("username")}&penerima=${selectedorang}`, {method: "GET"})
    .then(response => response.json())
    .then(data => {
        if (data.penerima == selectedorang){
        mymessagess = []
        mymessagessid = []
        let pengirimm = []
        for(let i = 0; i < data.message.length; i++){
            mymessagessid.push(data.id[i])
            mymessagess.push(data.message[i])
            pengirimm.push(data.pengirim[i])
        }
        //if (document.getElementById("containerchat").childElementCount != 0){
          //  document.getElementById("containerchat").removeChild(newelmy)
        //}
        newelmy.innerHTML = ""
        const thefinallengh = mymessagessid.length
        let realtimechat = []
        //console.log(mymessagess)
        for(let i = 0; i < thefinallengh; i++){
            if (mymessagessid.includes(String(i))){
                realtimechat.push(pengirimm[mymessagessid.indexOf(String(i))] + ": " + mymessagess[mymessagessid.indexOf(String(i))])
            }
        }
        //newelmy = document.createElement("div")
        for(let i = 0; i < realtimechat.length; i++){
            const neweltoolololol = document.createElement("div")
            neweltoolololol.textContent = realtimechat[i]
            newelmy.append(neweltoolololol)
            document.getElementById("containerchat").append(newelmy)
        }
    }
    })
    .catch(error => console.error(error));
    }
}, 100);
