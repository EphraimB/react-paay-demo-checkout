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

function HomePage({ products, loggedIn, isAdmin }) {
    console.log(products);
    return (
        <div>
            <AppBar loggedIn={loggedIn} />
            <Grid container spacing={{ xs: 0, md: 2 }} columns={{ xs: 12, md: 4 }} sx={{ m: 2 }}>
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
                <AddIcon />
            </Fab> : null}
        </div>
    );
}

export default HomePage;