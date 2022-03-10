const Clouds = ({ themeState }) => {
  return (
    <div style={{ position: "absolute" }} id="background-wrap">
      {themeState == "primary" ? (
        <div id="sky">
          <div class="theSun">
            <div class="ray_box">
              <div class="ray ray1"></div>
              <div class="ray ray2"></div>
              <div class="ray ray3"></div>
              <div class="ray ray4"></div>
              <div class="ray ray5"></div>
              <div class="ray ray6"></div>
              <div class="ray ray7"></div>
              <div class="ray ray8"></div>
              <div class="ray ray9"></div>
              <div class="ray ray10"></div>
            </div>
          </div>
          <div class="cloudwrapperOne">
            <div class="cloud c1"></div>
          </div>
          <div class="cloudwrapperTwo">
            <div class="cloud c2"></div>
          </div>
          <div class="cloudwrapperThree">
            <div class="cloud c3"></div>
          </div>
          <div className="x1">
            <div className="cloud"></div>
          </div>

          <div className="x2">
            <div className="cloud"></div>
          </div>
          <div className="x3">
            <div className="cloud"></div>
          </div>
          <div class="x4">
            <div class="cloud"></div>
          </div>
          <div class="x5">
            <div class="cloud"></div>
          </div>
        </div>
      ) : (
        <div
          style={{ display: "flex", justifyContent: "center", width: "100vw" }}
        >
          <div class="star-container">
            <div class="moon"></div>
            <div class="star"></div>
            <div class="star-s1"></div>
            <div class="star-s2"></div>
            <div class="star-s3"></div>
            <div class="star-s4"></div>
            <div class="star-s5"></div>
            <div class="star-s6"></div>
            <div class="star-s7"></div>
            <div class="star-s8"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clouds;
