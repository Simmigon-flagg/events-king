import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';

export default function InputField({ formLabel, placeholder, helperText }) {
    return (
        <FormControl>
            <FormLabel>{`${formLabel || ""}`}</FormLabel>
            <Input placeholder={`${placeholder}`} />
            <FormHelperText>{`${helperText}`}</FormHelperText>
        </FormControl>
    );
}
