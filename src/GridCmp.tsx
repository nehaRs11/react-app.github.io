import React from 'react'
import { Grid, Box, Link, Paper, Card, CardActions, CardMedia, Button, CardContent, Typography, Stack } from '@mui/material'
import { } from 'react-router-dom'

export const GridCmp = () => {
    const share=()=> {alert('Share button clicked!')}
    const learn=()=> {alert('Learn more button clicked!')}
    return (
        <Grid item md={2}>
            <Box>
                <Card sx={{ maxWidth: 350, maxHeight: 350, marginTop: '40px', marginBlock: '30px' }}>
                    {/* <CardMedia component='img'
                        image='https://source.unsplash.com/random/400x450/?nature' /> */}
                    <CardContent>
                        <Typography gutterBottom variant='h5'>
                            React
                        </Typography>
                        <Typography gutterBottom variant='body2' color='text.secondary'>
                            React makes it painless to create interactive UIs. React will efficiently update and render just the right components when your data changes.
                        </Typography>
                    </CardContent>
                    <CardContent>
                        <CardActions>
                            <Button size='small' onClick={share}>Share</Button>
                            <Button size='small' onClick={learn}>Learn More</Button>

                        </CardActions>
                    </CardContent>
                </Card></Box>

        </Grid>
    )
}
