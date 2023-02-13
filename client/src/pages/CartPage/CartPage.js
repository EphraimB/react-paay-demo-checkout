import AppBar from '../../components/AppBar/AppBar';

export default function CartPage({ loggedIn, isAdmin, itemsCount }) {
    return (
        <>
            <AppBar loggedIn={loggedIn} itemsCount={itemsCount} />
            <p>Testing</p>
        </>
    )
}