let inputText = document.getElementById("usuario_input");
//inputText.addEventListener('keyup', load);

const instance = axios.create({
    baseURL: 'https://api.github.com/',
    timeout: 1000
});

function load(){
    let nomeUsuario = inputText.value;
    displayLoader();
    instance.get(`users/${nomeUsuario}`)
    .then(function (response) {
        document.getElementById("usuario_git").innerHTML = response.data.login;
        document.getElementById("foto_git").setAttribute("src", response.data.avatar_url);
    })
    .catch(function (error) {
        console.log(error);
    })
    .then(function () {
        hideLoader();
    });
}

const loader = document.getElementById('loader');
function displayLoader(){
    loader.classList.add("display");
    setTimeout(() => {
        loader.classList.remove("display");
    }, 2900);
}
function hideLoader(){
    loader.classList.remove("display");
}
