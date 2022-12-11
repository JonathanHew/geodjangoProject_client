const Home =  ({name}) => {

    return (
        <div className="text-center mt-5">
            {name ? "Hi " + name : 'You are not logged in. Please login above!'}
        </div>
    )
}

export default Home