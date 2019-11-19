import React from 'react';
import TableHeader from './tableHeader';
import TableBody from './tableBody';

const Table = ( { columns, sortColumn, onSort, data } ) => {


    return(
        <table className="table mt-5">
            
            <TableHeader 
            columns = {columns}
            sortColumn = {sortColumn}
            onSort= {onSort}
            />

            <TableBody columns={columns} data={data} />

        </table>

    );
}

export default Table;