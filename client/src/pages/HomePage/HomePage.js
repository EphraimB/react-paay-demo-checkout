import React, { useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AppBar from '../../components/AppBar/AppBar';
import ImageIcon from '@mui/icons-material/Image';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/system';
import Alerts from '../../Alerts/Alerts';

function HomePage({ products, loggedIn, isAdmin }) {
    const [showAddProductForm, setShowAddProductForm] = useState(false);

    const showProductForm = () => {
        setShowAddProductForm(true);
    }

    const hideProductForm = () => {
        setShowAddProductForm(false);
    }

    const AddProductForm = () => {
        return (
            <div>
                <Card sx={{ maxWidth: 512 }} component="form">
                    {/* {product.image === null ? <ImageIcon /> :
                    <CardMedia
                        component="img"
                        height="140"
                        image={product.image}
                        alt={product.imageDescription}
                    />
                } */}
                    <Box sx={{
                        display: "flex",
                        justifyContent: "flex-end"
                    }}>
                        <IconButton>
                            <CloseIcon onClick={hideProductForm} />
                        </IconButton>
                    </Box>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            <TextField id="title" label="Title" variant="standard" />
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <TextField id="description" label="Description" variant="standard" />
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <TextField id="price" label="Price" type="number" min="1" step="any" variant="standard" />
                        </Typography>
                    </CardContent>
                    <Button type="submit" variant="contained">Add Product</Button>
                </Card>
            </div>
        )
    }

    return (
        <div>
            <AppBar loggedIn={loggedIn} />
            <Grid container spacing={{ xs: 0, md: 2 }} columns={{ xs: 12, md: 4 }} sx={{ m: 2 }}>
                {showAddProductForm ? <AddProductForm /> : null}
                {Object.values(products).map((product) => {
                    return (
                        <Card sx={{ maxWidth: 512 }}>
                            {/* {product.image === null ? <ImageIcon /> :
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={product.image}
                                    alt={product.imageDescription}
                                />
                            } */}
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {product.product_title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {product.product_description}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {product.product_price}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Add to cart</Button>
                                <Button size="small">Details</Button>
                            </CardActions>
                        </Card>
                    )
                })
                }
            </Grid>
            {isAdmin === 1 ? <Fab color="primary" aria-label="add" sx={{
                position: "absolute",
                bottom: 16,
                right: 16,
            }}>
                <AddIcon onClick={showProductForm} />
            </Fab> : null}
        </div>
    );
}

export default HomePage;