import { Box, Button, Input } from '@mui/material';
import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import "./search.css";
import { FaTrash } from 'react-icons/fa';
import UserFormDialog from '../Dialogs/UserFormDialog';

const SearchBar = ({ items }) => {
    const [ids, setIds] = useState([]);

    const getIds = (rowIds) => {
        setIds(rowIds);
        console.log(rowIds);
    };

    const handleDeleteSelected = () => {
        console.log("Deleting ids:", ids);
        // Add your delete logic here, for example, making a delete request to the server
    };

    const [searchTerm, setSearchTerm] = useState({
        firstname: ""
    });

    const handleSearch = (e) => {
        const { name, value } = e.target;
        setSearchTerm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const filteredItems = items?.filter(item => {
        if (searchTerm.firstname === "" || searchTerm.firstname == null) {
            return item;
        }
        if (item?.firstname?.toLowerCase().includes(searchTerm?.firstname?.toLowerCase())) {
            return item;
        }
        return null;
    });

    const columns = [
        { field: 'id', headerName: '#', width: 90 },
        { field: 'rowNumber', headerName: '#', width: 90 },
        { field: 'firstname', headerName: 'First name', width: 150 },
        { field: 'lastname', headerName: 'Last Name', width: 150 },
        { field: 'email', headerName: 'Email', width: 150 },
        { field: 'role', headerName: 'Role', width: 150 },

    ];

    const rows = filteredItems?.map((item, index) => {
        return {
            id: item._id,
            rowNumber: index + 1,
            firstname: item.firstname,
            lastname: item.lastname,
            email: item.email,
            role: item.role,
            date: item.date,
            time: item.time,
        };
    });

    return (
        <>
            <Input
                className="search-session-input"
                type='text'
                name="firstname"
                value={searchTerm.firstname}
                placeholder='Search Title'
                onChange={handleSearch}
            />
            <div className="search-container">
                <UserFormDialog text="NEW" />
                <Button onClick={handleDeleteSelected} startIcon={<FaTrash />}>
                    Remove
                </Button>
            </div>
            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 6,
                            },
                        },
                    }}
                    pageSizeOptions={[6]}
                    checkboxSelection
                    onRowSelectionModelChange={(newSelection) => { getIds(newSelection) }}
                />
            </Box>
        </>
    );
};

export default SearchBar;
