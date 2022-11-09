import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AppBar from '../../components/AppBar/AppBar';

function HomePage(props) {
    const { products } = props;
    return (
        <div>
            <AppBar />
            <Grid container spacing={{ xs: 0, md: 2 }} columns={{ xs: 12, md: 4 }} sx={{m: 2}}>
                {products.map((product) => {
                    return (
                        <Card sx={{ maxWidth: 512 }}>
                            <CardMedia
                                component="img"
                                height="140"
                                image={product.image}
                                alt="blank image"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {product.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {product.description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Add to cart</Button>
                                <Button size="small">Details</Button>
                            </CardActions>
                        </Card>
                    )
                })}
            </Grid>
        </div>
    );
}

export default HomePage;