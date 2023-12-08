document.addEventListener('DOMContentLoaded', function () {

    const csvFilePath = '../static/amazon-reviews.csv';

    // Get reference to the table body
    const tableBody = document.getElementById('reviews-table').getElementsByTagName('tbody')[0];

    // Function to fetch and parse CSV data
    function fetchCSV() {
        fetch(csvFilePath)
            .then(response => response.text())
            .then(data => parseCSV(data))
            .catch(error => console.error('Error fetching CSV:', error));
    }

    // Function to parse CSV data
    function parseCSV(csvData) {
        // Split the CSV data into rows
        const rows = csvData.split('\n');

        // Iterate over rows
        for (let i = 1; i < rows.length; i++) { // Start from index 1 to skip header
            const rowData = rows[i].split('","');
            // 去除每列数据的双引号
            for (var j = 0; j < rowData.length; j++) {
                rowData[j] = rowData[j].replace(/^"|"$/g, ''); // 使用正则表达式去除首尾的双引号
                rowData[j] = rowData[j].replace(/""/g, '"'); // 将两个双引号替换为一个
            }
            // Create a new row in the table
            const newRow = tableBody.insertRow();

            // Populate cells with data
            for (let j = 0; j <= rowData.length; j++) {
                const cell = newRow.insertCell(j);
                if (j == rowData.length){
                    var score = parseInt(rowData[0]);
                    cell.innerHTML = '<img src="../static/score-' + score + '.jpg" alt="scoreImage" width="50px">';
                }
                else {
                    if (j == 1){
                        cell.innerHTML = '<a href="/city/' + encodeURIComponent(rowData[j]) + '" target="_blank">' + rowData[j] + '</a>'
                    }
                    else {
                        cell.textContent = rowData[j];
                    }

                }


            }
        }
    }

    // Fetch and parse CSV data when the page is loaded
    fetchCSV();
});
