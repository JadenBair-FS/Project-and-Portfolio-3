const Button = (props) => {
  return <button style={styles.button}>{props.children}</button>;
};

export default Button;

const styles = {
  button: {
    backgroundColor: "green",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1em",
    fontWeight: "bold",
  },
};
