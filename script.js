// Nueva URL de la API que deseas consumir
const apiUrl = 'https://www.datos.gov.co/resource/kxhm-gdhk.json';

// Elementos HTML donde se mostrarán los datos
const dataTable = document.getElementById('data-table');
const dataBody = document.getElementById('data-body');

// Hacer una solicitud GET a la API
fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('La solicitud no fue exitosa');
    }
    return response.json(); // Convierte la respuesta en formato JSON
  })
  .then(data => {
    // Limpiar cualquier contenido previo en el cuerpo de la tabla
    dataBody.innerHTML = '';

    // Manejar los datos de la API y agregar filas a la tabla
    data.forEach(item => {
      const row = document.createElement('tr');
      const cell1 = document.createElement('td');
      const cell2 = document.createElement('td');
      const cell3 = document.createElement('td');
      const cell4 = document.createElement('td');
      const cell5 = document.createElement('td');
      const cell6 = document.createElement('td');
      const cell7 = document.createElement('td');

      cell1.textContent = item.razonsocial;
      cell2.textContent = item.nit;
      cell3.textContent = item.renovacion;
      cell4.textContent = item.municipio;
      cell5.textContent = item.email;
      cell6.textContent = item.ciiu;
      cell7.textContent = item.tamano;

      row.appendChild(cell1);
      row.appendChild(cell2);
      row.appendChild(cell3);
      row.appendChild(cell4);
      row.appendChild(cell5);
      row.appendChild(cell6);
      row.appendChild(cell7);

      dataBody.appendChild(row);
    });
  })
  .catch(error => {
    // Manejar errores
    console.error('Error:', error);
  });
