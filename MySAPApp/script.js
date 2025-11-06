async function cargarDatos() {
    const url = "https://<tu_servidor>/sap/opu/odata/sap/Z_MYDATA_ODATA_SRV/Orders?$format=json";
    const usuario = "TU_USUARIO";
    const contrasena = "TU_PASSWORD";
  
    const headers = new Headers();
    headers.append("Authorization", "Basic " + btoa(usuario + ":" + contrasena));
  
    try {
      const res = await fetch(url, { headers });
      const data = await res.json();
  
      const items = data.d.results;
      const tabla = document.getElementById("tabla");
      tabla.innerHTML = `
        <tr><th>Order ID</th><th>Cliente</th><th>Importe</th></tr>
        ${items.map(i => `
          <tr>
            <td>${i.OrderID}</td>
            <td>${i.CustomerName}</td>
            <td>${i.Amount}</td>
          </tr>
        `).join("")}
      `;
    } catch (err) {
      console.error("Error al conectar con SAP:", err);
      alert("No se pudieron cargar los datos");
    }
  }
  