const apiUrl = 'https://www.datos.gov.co/resource/kxhm-gdhk.json';
const dataPerPage = 13;
let currentPage = 1;

const dataTable = document.getElementById('data-table');
const dataBody = document.getElementById('data-body');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const pageIndicator = document.getElementById('page-indicator');

function fetchData(page) {
    // Calcular los índices de inicio y fin de los datos a mostrar en la página actual
    const startIndex = (page - 1) * dataPerPage;
    const endIndex = startIndex + dataPerPage;

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

        totalRecords = data.length;
        const totalPages = Math.ceil(totalRecords / dataPerPage);
        
        // Mostrar los datos de la API en la página actual
        for (let i = startIndex; i < endIndex && i < data.length; i++) {
          const item = data[i];
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
        }

        // Actualizar el indicador de página actual del total de páginas
        pageIndicator.textContent = `Página ${page} de ${totalPages}`;

        // Habilitar o deshabilitar los botones de navegación
        prevButton.disabled = page === 1;
        nextButton.disabled = endIndex >= data.length;
      })
      .catch(error => {
        // Manejar errores
        console.error('Error:', error);
      });
}

// Manejar los botones de navegación
prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        fetchData(currentPage);
    }
});

nextButton.addEventListener('click', () => {
    currentPage++;
    fetchData(currentPage);
});

// Cargar la primera página al cargar la página
fetchData(currentPage);
