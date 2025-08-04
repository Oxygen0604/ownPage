import React, { use } from'react';
import { useEffect,useState,useRef } from 'react';
import './Home.scss';
import Typewriter from '../../components/TypeWriter/TypeWriter';
import Navbar from '../../components/Navbar/Navbar';
import Background from '../../components/Background/Backgound';
import downIcon from '../../../assets/downIcon.svg';

const Home = () => {
  const [showNav, setShowNav] = useState(false)
  const secondPageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowNav(entry.isIntersecting)
      },
      {
        threshold: 0.3,
      }
    )

    if (secondPageRef.current) {
      observer.observe(secondPageRef.current)
    }
    
    return () => {
      observer.disconnect()
    }
    
  }, [])

  return (
    <div className='home'>
      <div className='background'>
        <Background />
      </div>
      <div className='navbar' 
        style={{
          opacity: showNav ? 1 : 0,
          transform: showNav ? "translateY(0)" : "translateY(-10px)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
        }}
      >
        {showNav && <Navbar />}
      </div>

      <div className='body'>
        <div className='page1'>
          <div className='header'>
            <div className='logo'>
              Unicorn
            </div>
            <div className='menu'>
              <div className='homePage'>
                主页
              </div>
              <div className='aboutMe'>
                个人介绍
              </div>
              <div className='websiteInfo'>
                网站信息
              </div>
            </div>
            <div className='music'>

            </div>
          </div>

          <div className='content'>
            <div className='title'>
              Unicorn的博客
            </div>
            <div className='text'>
              <Typewriter 
                strings={[
                  "一枕清风梦绿萝,人生随处是南柯"
                ]}
                typeSpeed={300}
                backSpeed={1}
                loop={true}
              />
            </div>
          </div>

          <div className='footer'>
            向下开启
            <img src={downIcon} alt="icon" />
          </div>
        </div>

        <div className='page2' ref={secondPageRef}>
          
        </div>

      </div>
        
      <div className='footer'>

      </div>
    </div>
  )
}

export default Home;