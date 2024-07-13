import "./landing.css";
import { useNavigate } from "react-router-dom";
const LandingPage = () => {
  const navigate = useNavigate();
  const goToSignIn = () => {
    navigate("/login");
  };
  const goToSignUp = () => {
    navigate("/register");
  };
  return (
    <section className="landing-container">

      {/* 
      <img src="https://i.imgur.com/Y4s0FqG.png" className="phone-mockup" alt="phone mockup" />
      <div className="landing-header"> Get started with SBD!  </div>
      <div className="button-container">
        <button className="login" onClick={goToSignIn}>
          Sign in
        </button>
        <button className="register" onClick={goToSignUp}>
          Sign up
        </button>
      </div>
      <div className="landing-sub"> At SBD, we understand the process of discovering and contacting universities can be a complicated, if not overwhelming pathetic waste of time. Thus, we have made it a mission to be the bridge between you and your very own dream schools.
        So, what is stopping you from taking the next step in your journey?</div> */}
      <div className="grid-container">
        <img src="https://i.imgur.com/Y4s0FqG.png" class="phone-mockup" />
        <p class="landing-sub">At SBD, we understand the process of discovering and contacting universities can be a complicated, if not overwhelming pathetic waste of time. Thus, we have made it a mission to be the bridge between you and your very own dream schools.
          <br /><br />So, what is stopping you from taking the next step in your journey?</p>
        <div class="landing-header">Get started with SBD!</div>
        <div class="button-container">
          <button className="login" onClick={goToSignIn}>
            Sign in
          </button>
          <button className="register" onClick={goToSignUp}>
            Sign up
          </button></div>
      </div>
    </section>
  );
};

export default LandingPage;
