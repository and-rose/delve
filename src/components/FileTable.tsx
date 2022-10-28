import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import { useEffect, useState } from 'react';
import { ProductService } from '../service/ProductService';

function FileTable() {
    const [products, setProducts] = useState([]);
    const [multiSortMeta, setMultiSortMeta] = useState([{ field: 'category', order: -1 }]);
    const productService = new ProductService();

    useEffect(() => {
        productService.getProductsSmall().then(data => setProducts(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const formatCurrency = (value: any) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };
    const priceBodyTemplate = (rowData: any) => {
        return formatCurrency(rowData.price);
    };

    return (
        <div className="flex-row w-full">
            <h2 className="text-left ml-4">Samples</h2>
            <DataTable
                value={products}
                sortMode="multiple"
                responsiveLayout="scroll"
                scrollable
                scrollHeight="flex"
                removableSort
                resizableColumns
                reorderableColumns
                className="w-full">
                <Column field="code" header="Code" sortable></Column>
                <Column field="name" header="Name" sortable></Column>
                <Column field="category" header="Category" sortable></Column>
                <Column field="quantity" header="Quantity" sortable></Column>
                <Column field="price" header="Price" body={priceBodyTemplate} sortable></Column>
            </DataTable>
        </div>
    );
}

export default FileTable;
