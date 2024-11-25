import background from "./../assets/salon-image.jpg";

function Home() {

  const myStyle = {
    backgroundImage:`url(${background})`,
    height: "88vh",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    display: "flex",
    fontSize: "6vw",
    justifyContent: "center",
    fontFamily: "Satisfy",
    color: "grey"
};

// alignItems: "center"

  return (
    <div style={myStyle}>
      <p>Welcome to Bright Salon Site</p>
    </div>
  );
}

export default Home;
