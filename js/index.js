/*
Noah Rothgaber
02134094
noah_rothgaber@student.uml.edu
*/

function print_bounds() {
    console.log("Column Lower " + column_lower.value);
    console.log("Column Upper " + column_upper.value);
    console.log("Row Lower " + row_lower.value);
    console.log("Row Upper " + row_upper.value);
}

function validateInputs() {
    const colLower = parseFloat(column_lower.value);
    const colUpper = parseFloat(column_upper.value);
    const rowLower = parseFloat(row_lower.value);
    const rowUpper = parseFloat(row_upper.value);

    let errorMessage = '';

    if (isNaN(colLower) || isNaN(colUpper) || isNaN(rowLower) || isNaN(rowUpper)) {
        errorMessage = "All inputs must be numbers.";
    } else if (!Number.isInteger(colLower) || !Number.isInteger(colUpper) || !Number.isInteger(rowLower) || !Number.isInteger(rowUpper)) {
        errorMessage = "All inputs must be whole numbers (no decimals or fractions).";
    } else if (colLower < -50 || colUpper > 50 || rowLower < -50 || rowUpper > 50) {
        errorMessage = "All inputs must be between -50 and 50.";
    } else if (colLower >= colUpper) {
        errorMessage = "Column lower bound must be less than the column upper bound.";
    } else if (rowLower >= rowUpper) {
        errorMessage = "Row lower bound must be less than the row upper bound.";
    }

    const errorParagraph = document.getElementById("error-message");
    
    if (errorMessage) {
        // clear table on error
        const existingTableDiv = document.getElementById("generatedTable");
        if (existingTableDiv) existingTableDiv.remove();

        if (!errorParagraph) {
            const errorMsg = document.createElement("p");
            errorMsg.id = "error-message";
            errorMsg.style.color = "red";
            errorMsg.innerText = errorMessage;
            document.body.appendChild(errorMsg);
        } else {
            errorParagraph.innerText = errorMessage;
        }
        return false;
    } else if (errorParagraph) {
        errorParagraph.remove();
    }
    return true;
}

function generate_table() {
    if (!validateInputs()) return; // don't generate if error detected

    print_bounds(); // for the console

    const colLower = parseInt(column_lower.value);
    const colUpper = parseInt(column_upper.value);
    const rowLower = parseInt(row_lower.value);
    const rowUpper = parseInt(row_upper.value);
    // we already verified its not a float when we called the validate function

    const tableDiv = document.createElement("div"); // making a div for the madness
    tableDiv.id = "generatedTable";

    const tableContent = document.createElement("table");

    const headerRow = tableContent.insertRow();
    const emptyHeaderCell = document.createElement("th"); // make a table header for the bounds
    headerRow.appendChild(emptyHeaderCell); // add the header

    for (let col = colLower; col <= colUpper; col++) {
        const headerCell = document.createElement("th"); // make the individual header cells
        headerCell.innerText = col;
        headerRow.appendChild(headerCell);
    }

    for (let row = rowLower; row <= rowUpper; row++) { // this is basically the same as the above plus an inner for loop
        const tempRow = tableContent.insertRow();

        const headerCell = document.createElement("th");
        headerCell.innerText = row;
        tempRow.appendChild(headerCell);

        for (let col = colLower; col <= colUpper; col++) {
            const cell = tempRow.insertCell();
            cell.innerText = row * col; // the actual math being done for each cell
        }
    }

    const existingTableDiv = document.getElementById("generatedTable");
    if (existingTableDiv) existingTableDiv.remove(); // clear an old table if one exists blehhh

    tableDiv.appendChild(tableContent); // put the table in the div
    document.body.appendChild(tableDiv); // put the div in the body
}

// grabbin all the elements

generate_table_button = document.getElementById("generate_button");
column_lower = document.getElementById("columnLBoundInput");
column_upper = document.getElementById("columnUBoundInput");
row_lower = document.getElementById("rowLBoundInput");
row_upper = document.getElementById("rowUBoundInput");
generate_table_button.addEventListener('click', generate_table);
