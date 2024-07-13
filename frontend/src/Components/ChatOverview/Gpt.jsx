const Gpt = (props) => {
    return (
        <section className="contact-container">
            <div className="contact-img-container">
                <img
                    src={"https://1000logos.net/wp-content/uploads/2023/02/ChatGPT-Emblem.png"}
                    alt="profile pic"
                    className="contact-img"
                />
            </div>
            <div className="preview-container">
                <div className="preview-username">{"GPT"}</div>
            </div>
        </section>
    );
}
export default Gpt;