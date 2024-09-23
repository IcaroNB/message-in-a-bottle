import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [posts, setPosts] = useState([]);

  const inputPost = (email, message) => {
    const date = new Date();
    const dateOfPost = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`;

    const newPost = {
      id: Math.floor(Math.random() * 1000000),
      email,
      message,
      dateOfPost,
    };

    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);

    localStorage.setItem("mib-lib", JSON.stringify(updatedPosts));
  };

  const removePost = (id) => {
    setPosts((state) => {
      const newState = state.filter((post) => post.id !== id);
      localStorage.setItem("mib-lib", JSON.stringify(newState));
      return newState;
    });
  };

  useEffect(() => {
    const storedPosts = localStorage.getItem("mib-lib");
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    inputPost(email, message);
    setEmail("");
    setMessage("");
  };

  return (
    <>
      <h1>Message-In-A-Bottle</h1>
      <div className="container">
        <h2>Mensagens na Garrafa</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="message">Mensagem</label>
            <textarea
              name="message"
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <button className="botao">Enviar mensagem</button>
        </form>
        <hr />
        <div>
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className="message">
                <p>
                  <strong>{post.email}</strong>
                </p>
                <p>{post.message}</p>
                <p>{post.dateOfPost}</p>
                <div>
                  <button
                    className="botao btnRemove"
                    onClick={() => removePost(post.id)}
                  >
                    X
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="message">Seja o primeiro a comentar!</p>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
