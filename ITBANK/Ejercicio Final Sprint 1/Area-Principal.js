document.addEventListener('DOMContentLoaded', function() {
    // Función para manejar el formulario de transferencias
    const formTransferencias = document.querySelector('#Transferencias form');
    formTransferencias.addEventListener('submit', function(event) {
        event.preventDefault();

        const cuentaOrigen = document.querySelector('#cuenta-origen').value;
        const cuentaDestino = document.querySelector('#cuenta-destino').value;
        const monto = parseFloat(document.querySelector('#monto1').value);

        if (isNaN(monto) || monto <= 0) {
            alert('Por favor, ingrese un monto válido.');
            return;
        }

        // Actualizar saldo de cuenta de origen y destino (ejemplo básico)
        alert(`Transferencia realizada con éxito de la cuenta ${cuentaOrigen} a la cuenta ${cuentaDestino} por un monto de $${monto.toFixed(2)}.`);

        // Aquí puedes actualizar los saldos en la tabla de cuentas si fuera necesario
    });

    // Función para manejar el formulario de pagos
    const formPagos = document.querySelector('#Pagos form');
    formPagos.addEventListener('submit', function(event) {
        event.preventDefault();

        const tipoServicio = document.querySelector('#tipo-servicio').value;
        const numeroFactura = document.querySelector('#numero-factura').value;
        const monto = parseFloat(document.querySelector('#monto2').value);

        if (isNaN(monto) || monto <= 0) {
            alert('Por favor, ingrese un monto válido.');
            return;
        }

        // Mostrar mensaje de confirmación de pago
        alert(`Pago realizado con éxito para el servicio de ${tipoServicio} con número de factura ${numeroFactura} por un monto de $${monto.toFixed(2)}.`);

        // Aquí puedes actualizar los saldos o historial de pagos si fuera necesario
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const formTransferencias = document.querySelector('#Transferencias form');
    const cuentas = {
        "cuenta-1": { saldo: 5000 },
        "cuenta-2": { saldo: 3000 },
        "cuenta-3": { saldo: 10000 },
        "cuenta-4": { saldo: 2000 }
    };

    function actualizarSaldos(cuentaOrigenId, cuentaDestinoId, monto) {
        const cuentaOrigen = document.querySelector(`#${cuentaOrigenId} .saldo`);
        const cuentaDestino = document.querySelector(`#${cuentaDestinoId} .saldo`);
        const movimientoOrigen = document.querySelector(`#${cuentaOrigenId} .movimiento`);
        const movimientoDestino = document.querySelector(`#${cuentaDestinoId} .movimiento`);

        // Actualizar los saldos en el objeto cuentas
        cuentas[cuentaOrigenId].saldo -= monto;
        cuentas[cuentaDestinoId].saldo += monto;

        // Reflejar los nuevos saldos en la interfaz
        cuentaOrigen.textContent = `$${cuentas[cuentaOrigenId].saldo.toFixed(2)}`;
        cuentaDestino.textContent = `$${cuentas[cuentaDestinoId].saldo.toFixed(2)}`;

        // Mostrar el movimiento reciente
        movimientoOrigen.textContent = `-$${monto.toFixed(2)}`;
        movimientoDestino.textContent = `+$${monto.toFixed(2)}`;
    }

    formTransferencias.addEventListener('submit', function(event) {
        event.preventDefault();

        const cuentaOrigenId = document.querySelector('#cuenta-origen').value;
        const cuentaDestinoNumero = document.querySelector('#cuenta-destino').value;
        const monto = parseFloat(document.querySelector('#monto1').value);

        // Encontrar la cuenta de destino por su número
        const cuentaDestinoId = Object.keys(cuentas).find(id => {
            return document.querySelector(`#${id} td:nth-child(2)`).textContent === cuentaDestinoNumero;
        });

        if (!cuentaDestinoId) {
            alert('Cuenta de destino no encontrada.');
            return;
        }

        if (isNaN(monto) || monto <= 0 || monto > cuentas[cuentaOrigenId].saldo) {
            alert('Por favor, ingrese un monto válido que no exceda el saldo disponible.');
            return;
        }

        // Actualizar saldos y mostrar mensaje de confirmación
        actualizarSaldos(cuentaOrigenId, cuentaDestinoId, monto);
        alert(`Transferencia realizada con éxito de la cuenta ${cuentaOrigenId} a la cuenta ${cuentaDestinoNumero} por un monto de $${monto.toFixed(2)}.`);
    });
});