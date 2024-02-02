


const Button = (props) => {



  return <button style={styles.button}>{props.children}</button>;
};

export default Button;

const styles = {
  button: {
    backgroundColor: "#1DB954",
    color: "white",
    width: "75%",
    padding: "15px",
    border: "none",
    borderRadius: "100px",
    cursor: "pointer",
    fontSize: "2em",
    fontWeight: "bold",
  },
};
