import React from 'react';
import { makeStyles } from '@mui/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: 50,
        minWidth: 200,
        backgroundColor: '#ffffff',
        fontSize:20,
        
    },
    selectEmpty: {
        marginTop: 40,
    },
    }));

export default function SimpleSelect(props) {

    const {
        name,
        callback,
        activeQuery,
        options
    } = props;

    const classes = useStyles();

    return (
        <div>
            <FormControl color="error" sx={{ m: 1, minWidth: 160 }} variant="filled" className={classes.formControl}>
                <InputLabel id="simple-select-outlined-label">{name}</InputLabel>
                <Select
                    labelId="simple-select-outlined-label"
                    id="simple-select-outlined"
                    value={activeQuery}
                    onChange={callback}
                    label={name}
                >
                    <MenuItem value="">
                        <em>{name === 'Rover'? 'None': 'All'}</em>
                    </MenuItem>
                    {
                        options.map((option, index)=>
                            <MenuItem
                                value={option.toLocaleLowerCase()}
                                key={index}
                            >
                                {option}</MenuItem>
                        )
                    }
                </Select>
            </FormControl>
        </div>
    );
}