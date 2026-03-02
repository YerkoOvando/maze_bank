$(document).ready(function () {

    // Inicializar saldo
    if (localStorage.getItem("saldo") === null) {
        localStorage.setItem("saldo", 450000);
    }

    // Inicializar historial
    if (localStorage.getItem("historial") === null) {
        localStorage.setItem("historial", JSON.stringify([]));
    }

    // ------- LOGIN --------
    $("#btnLogin").click(function () {

        let userLogin = $("#userLogin").val();
        let passLogin = $("#passLogin").val();

        if (userLogin === "20401789-1" && passLogin === "1234") {
            localStorage.setItem("login", "true");
            window.location.href = "menu.html";
        } else {
            $("#error").text("RUT o PIN son incorrectos");
        }

    });

    // ---------- LOGOUT ----------
    $("#btnLogout").click(function () {
        localStorage.removeItem("login");
        window.location.href = "index.html";
    });

    // --------FUNCIONES NAVBAR----------

    $("#btnNavMenu").click(function () {
        window.location.href = "menu.html";
    });

    $("#btnNavSendMoney").click(function () {
        window.location.href = "sendmoney.html";
    });

    $("#btnNavDeposit").click(function () {
        window.location.href = "deposit.html";
    });

    $("#btnNavTransactions").click(function () {
        window.location.href = "transactions.html";
    });



    // ---------- SEGURIDAD ----------
    if (window.location.pathname.includes("menu.html")) {
        if (localStorage.getItem("login") !== "true") {
            window.location.href = "index.html";
        }
    }

    // ---------- DATOS ----------
    let saldo = Number(localStorage.getItem("saldo"));
    $("#saldo").text("$" + saldo);

    // ---------- DEPOSITAR ----------
    $("#btnDepositar").click(function () {

        let monto = Number($("#deposito").val());

        if (monto > 0) {
            saldo += monto;
            actualizar("Depósito", monto);
            alert("Depósito realizado con éxito");
        }

    });

    // ---------- ENVIAR ----------
    $("#btnEnviar").click(function () {

        let monto = Number($("#envio").val());
        let destino = $("#destino").val();

        if (monto <= saldo && monto > 0 && destino !== "") {
            saldo -= monto;
            actualizar("Envío a " + destino, monto)
            alert("Transferencia realizada con éxito");
        }

    });

    // ------ TRANSACCIONES --------------
    if (window.location.pathname.includes("transactions.html")) {

        let historial = JSON.parse(localStorage.getItem("historial"));

        historial.forEach(function (mov) {
            $("#historial").append(
                `<li class="list-group-item">
                ${mov.tipo} - $${mov.monto}
            </li>`
            );
        });
    }


    // ---------- HISTORIAL ----------
    function actualizar(tipo, monto) {

        localStorage.setItem("saldo", saldo);

        let historial = JSON.parse(localStorage.getItem("historial"));

        historial.unshift({
            tipo: tipo,
            monto: monto
        });

        localStorage.setItem("historial", JSON.stringify(historial));
    }

    if (window.location.pathname.includes("transactions.html")) {

        let historial = JSON.parse(localStorage.getItem("historial"));

        $("#historial").html(""); // limpiar

        historial.forEach(function (mov) {

            $("#historial").append(`
            <li class="list-group-item">
                ${mov.tipo} - $${mov.monto}
            </li>
        `);

        });

    }
});