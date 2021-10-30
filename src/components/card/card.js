import React from 'react';
import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';

import { Link } from '@mui/material';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 400,
        margin: '0 0 20px 20px',
        
    "&:hover": {
      boxShadow: "inset -12px -11px 40px 0px rgba(130,34,255,0.68), -12px -13px 9px -4px rgba(255,0,0,0.4)"
    }
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    
    

}));

export default function CardStyled( props ) {
    const {
        imageSrc,
        cameraName,
        earthDate
    } = props;

    const classes = useStyles();
    return (
        <Card className={classes.root}>
            
            <CardMedia
                className={classes.media}
                image={imageSrc}
                title="Paella dish"
            />
            <CardHeader
                title={cameraName}
                subheader={earthDate}
            />
            <CardContent>
                
                    <Link href={imageSrc} target="_blank">
                    Link
                    </Link>
                
            </CardContent>

        </Card>
    );
}

