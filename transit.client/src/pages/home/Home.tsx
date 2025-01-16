const Home = () => {
    return (
        <div>
            <h1>Home</h1>
            <button onClick={() => {
                console.log('clicked');
            }
            }>Click me
            </button>
        </div>
    );
}

export {Home};