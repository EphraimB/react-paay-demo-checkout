import AppBar from '../../components/AppBar/AppBar';

export default function CartPage({ loggedIn, isAdmin }) {
    return (
        <>
            <AppBar loggedIn={loggedIn} />
            <p>Testing</p>
        </>
    )
}