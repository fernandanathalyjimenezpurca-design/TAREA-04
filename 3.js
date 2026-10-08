const carrito = [];
const panel = document.getElementById("panel-carrito");

function dibujar() {
    let total = 0, cantidad = 0;
    panel.innerHTML = "<h3>Mi carrito</h3>" + (carrito.length ? "" : "<p>Está vacío</p>");
    carrito.forEach((p, i) => {
        total += p.precio * p.cant;
        cantidad += p.cant;
        panel.innerHTML += `
        <div class="item-carrito">
            <b>${p.nombre}</b>
            <div class="controles">
                <button data-accion="restar" data-i="${i}">−</button>
                <span>${p.cant}</span>
                <button data-accion="sumar" data-i="${i}">+</button>
                <span class="subtotal">S/. ${(p.precio * p.cant).toFixed(2)}</span>
                <button data-accion="quitar" data-i="${i}" title="Quitar">🗑</button>
            </div>
        </div>`;
    });
    if (carrito.length) {
        panel.innerHTML += `<div class="total-carrito">Total: S/. ${total.toFixed(2)}</div>
        <button class="vaciar" data-accion="vaciar">Vaciar carrito</button>`;
    }
    document.getElementById("cantidad").textContent = cantidad;
}

function agregar(nombre, precio) {
    const p = carrito.find(x => x.nombre === nombre);
    p ? p.cant++ : carrito.push({ nombre, precio, cant: 1 });
    dibujar();
}

panel.onclick = e => {
    const accion = e.target.dataset.accion;
    const i = e.target.dataset.i;
    if (accion === "sumar") carrito[i].cant++;
    if (accion === "restar") { carrito[i].cant--; if (carrito[i].cant === 0) carrito.splice(i, 1); }
    if (accion === "quitar") carrito.splice(i, 1);
    if (accion === "vaciar") carrito.length = 0;
    dibujar();
};

document.getElementById("btn-carrito").onclick = () => {
    panel.style.display = panel.style.display === "block" ? "none" : "block";
};

document.querySelectorAll(".producto").forEach(card => {

    if (!card.querySelector(".carrito")) {
        card.insertAdjacentHTML("beforeend", '<button class="carrito">Añadir al carrito</button>');
    }
    card.querySelectorAll(".carrito").forEach(btn => {
        btn.onclick = () => {
            agregar(
                card.querySelector("h3").textContent.trim(),
                parseFloat(card.querySelector(".precio").textContent.match(/\d+(\.\d+)?/)[0])
            );
            panel.style.display = "block"; 
            btn.textContent = "¡Añadido!";
            setTimeout(() => btn.textContent = "Añadir al carrito", 1000);
        };
    });
});

dibujar();