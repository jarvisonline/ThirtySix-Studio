import "./index.css";
import Canvas from "./Canvas";
import data from "./data";
import LocomotiveScroll from "locomotive-scroll";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

function App() {
  const headingRef = useRef(null);
  const growingSpan = useRef(null);
  const cursorRef = useRef(null);
  const mainRef = useRef(null);
  const [showCanvas, setShowCanvas] = useState(false);

  const handleMouseMove = (event) => {
    gsap.to(cursorRef.current, {
      x: event.clientX,
      y: event.clientY,
      duration: 0.6,
    });
  };

  const handleMouseEnter = () => {
    cursorRef.current.innerHTML = "💣";
    gsap.to(cursorRef.current, {
      scale: 4,
      backgroundColor: !showCanvas ? "#fd2c2a" : "fff",
      fontSize: "15px",
    });
  };

  const handleMouseLeave = () => {
    cursorRef.current.innerHTML = "";
    gsap.to(cursorRef.current, {
      scale: 1,
      backgroundColor: "#fff",
    });
  };

  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();

    const mainElement = mainRef.current;
    mainElement.addEventListener("mousemove", handleMouseMove);

    return () => {
      mainElement.removeEventListener("mousemove", handleMouseMove);
    };
  });

  useEffect(() => {
    const handleClick = (e) => {
      setShowCanvas((prevShowCanvas) => {
        if (!prevShowCanvas) {
          gsap.set(growingSpan.current, {
            top: e.clientY,
            left: e.clientX,
          });

          gsap.to("body", {
            color: "#000",
            backgroundColor: "#fd2c2a",
            duration: 1.2,
            ease: "power2.inOut",
          });

          gsap.to(growingSpan.current, {
            scale: 1000,
            duration: 2,
            ease: "power2.inOut",
            onComplete: () => {
              gsap.set(growingSpan.current, {
                scale: 0,
                clearProps: "all",
              });
            },
          });
        } else {
          gsap.to("body", {
            color: "#fff",
            backgroundColor: "#000",
            duration: 1.2,
            ease: "power2.inOut",
          });
        }

        return !prevShowCanvas;
      });
    };

    const headingElement = headingRef.current;
    headingElement.addEventListener("click", handleClick);

    // Clean up event listener on unmount
    return () => headingElement.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      <span
        ref={growingSpan}
        className="growing rounded-full block fixed top[-20px] left-[-20px] w-5 h-5"
      ></span>
      <div
        ref={mainRef}
        className="w-full relative font-neueMontreal min-h-screen"
      >
        <div
          ref={cursorRef}
          className="max-sm:hidden fixed top-[-20px] left-[-20px] h-[22px] w-[22px] bg-white rounded-full text-[5px] flex items-center justify-center text-center z-10 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        ></div>

        {showCanvas &&
          data[0].map((canvasdets, index) => (
            <Canvas key={index} details={canvasdets} />
          ))}

        <div className="w-full relative z-[1] h-screen">
          <nav className="w-full p-4 md:p-8 flex flex-col md:flex-row justify-between items-center z-50">
            <div className="brand text-xl md:text-2xl font-regular mb-4 md:mb-0">
              thirtysixstudios
            </div>
            <div className="links flex gap-6 md:gap-10">
              {["Home", "About", "Projects", "Contact"].map((link, index) => (
                <a
                  key={index}
                  href={`#${link.toLowerCase()}`}
                  className="text-sm md:text-md hover:text-gray-300"
                >
                  {link}
                </a>
              ))}
            </div>
          </nav>
          <div className="textcontainer w-full px-4 md:px-[20%]">
            <div className="text w-full">
              <h3 className="text-2xl md:text-4xl leading-[1.5]">
                At Thirtysixstudio, we build immersive digital experiences for
                brands with a purpose.
              </h3>
              <p className="text-sm md:text-md w-full md:w-[80%] mt-6 md:mt-10 font-normal">
                We're a boutique production studio focused on design, motion,
                and creative technology, constantly reimagining what digital
                craft can do for present-time ads and campaigns.
              </p>
              <p className="text-sm md:text-md mt-6 md:mt-10">scroll</p>
            </div>
          </div>
          <div className="w-full absolute mt-6 md:mt-10">
            <h1
              ref={headingRef}
              className="text-6xl sm:text-8xl md:text-[12rem] lg:text-[15rem] font-normal tracking-tight leading-none pl-2 md:pl-5"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Thirtysixstudios
            </h1>
          </div>
        </div>

        <div className="w-full relative h-screen font-neueMontreal mt-16 md:mt-32 px-4 md:px-10">
          {showCanvas &&
            data[1].map((canvasdets, index) => (
              <Canvas key={index} details={canvasdets} />
            ))}
          <h1 className="text-5xl md:text-8xl tracking-tighter">
            about the brand
          </h1>
          <p className="text-2xl md:text-4xl leading-[1.8] w-full md:w-[80%] mt-6 md:mt-10 font-light">
            We aim to revolutionize digital production in the advertising space,
            bringing your ideas to life.
          </p>
          <img
            className="w-full mt-10 md:mt-20"
            src="https://directus.funkhaus.io/assets/b3b5697d-95a0-4af5-ba59-b1d423411b1c?withoutEnlargement=true&fit=outside&width=1400&height=1400"
            alt=""
          />
        </div>
      </div>
    </>
  );
}

export default App;
