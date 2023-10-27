function tidTilJuleaften() {
    let nu = new Date();
    let juleaften = new Date(nu.getFullYear(), 11, 24);
    if (nu.getMonth() == 11 && nu.getDate() > 24) {
        juleaften.setFullYear(nu.getFullYear() + 1);
    }
    let tidTilJuleaften = juleaften - nu;

    let dage = Math.floor(tidTilJuleaften / (1000 * 60 * 60 * 24));
    let timer = Math.floor((tidTilJuleaften % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutter = Math.floor((tidTilJuleaften % (1000 * 60 * 60)) / (1000 * 60));
    let sekunder = Math.floor((tidTilJuleaften % (1000 * 60)) / 1000);

    return {
        dage: dage,
        timer: timer,
        minutter: minutter,
        sekunder: sekunder
    };
}

function opdaterCountdown() {
    let tid = tidTilJuleaften();
    document.getElementById("countdown").textContent = tid.dage + " dage, " + tid.timer + " timer, " + tid.minutter + " minutter, og " + tid.sekunder + " sekunder";
}

setInterval(opdaterCountdown, 1000);

opdaterCountdown();