import React, { use } from'react';
import { useEffect,useState,useRef } from 'react';
import { CSSTransition } from "react-transition-group";
import { Space } from 'antd';
import Handwriting from '../../components/Handwriting/Handwriting';
import './Home.scss';
import Typewriter from '../../components/TypeWriter/TypeWriter';
import Navbar from '../../components/Navbar/Navbar';
import PreviewWindow from '../../components/PreviewWindow/PreviewWindow';
import Background from '../../components/Background/Backgound';
import downIcon from '../../../assets/downIcon.svg';
import Landscape from "../../../assets/Landscape.png"

type windowType = {
  title:string;
  url: string;
  img: string;
}

const Home = () => {
  const [showNav, setShowNav] = useState(false)
  const [active, setActive] = useState<number>(2)
  const secondPageRef = useRef<HTMLDivElement>(null)
  const [collapse,setCollapse] = useState<boolean>(false);
  const [collapseAni,setCollapseAni] = useState<boolean>(false);
  const [scrollY,setScrollY]=useState<number>(0)
  const homePageRef = useRef<HTMLDivElement>(null)
  const selfInfoRef = useRef<HTMLDivElement>(null)
  const webInfoRef = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)
  
  const windows: windowType[] = [
    {
      title:"照片",
      url:"https://500px.com.cn/unicorn0604",
      img:Landscape
    }
  ]

  const handleCollapse = (state:boolean) => {
    if(state){
      setCollapseAni(state)
      setTimeout(()=>{
        setCollapse(state)
      },300)
    }
    else{
      setCollapse(state)
      setCollapseAni(state)
    }
  }

  const logoClick = () => {
    if(collapse){
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
      handleCollapse(false)
      setActive(2)
    }
  } 

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll",handleScroll)

    return ()=>window.removeEventListener("scroll",handleScroll)
  }, [active])

  const scale = Math.min(0.3 + scrollY / 700, 1);
  const opacity = Math.min(scrollY / 700, 1);

  return (
    <div className='home'>
      <CSSTransition
        nodeRef={backgroundRef}
        in={active === 2 || active === 3}
        timeout={{enter: 800, exit: 800}}
        classNames="background-ani"
        unmountOnExit
      >
        <div className='background' ref={backgroundRef}>
          <Background />
        </div>
      </CSSTransition>

      <div className='navbar' 
        style={{
          opacity: (scrollY/500>0.4?opacity:0),
          transform: `scale(${scrollY/500>0.4?scale:0})`,
          transition: "opacity 0.5s ease, transform 1s ease",
        }}
      >
        <Navbar />
      </div>

      <div className='body'>

        <div className={`header ${collapseAni ? "collapsed" : "expanded"}`}>
          <div className='logo'  onClick={logoClick}>
            Unicorn
          </div>
          <div className='menu'>
            <div className={`selfInfo-btn ${collapse ? "collapsed" : "expanded"}`} onClick={() => {
              handleCollapse(true)
              setActive(1)
            }}>
              个人介绍
              <div className={`${active === 1 ? "active" : ""}` } />
            </div>
            <div className={`homePage-btn ${collapse ? "collapsed" : "expanded"}`} onClick={() => {
              setActive(2)
            }} >
              主页
              <div className={`${active === 2 ? "active" : ""}` } />
            </div>
            <div className={`webInfo-btn ${collapse ? "collapsed" : "expanded"}`} onClick={() => {
              setActive(3)
            }}>
              网站信息
              <div className={`${active === 3 ? "active" : ""}` } />
            </div>
          </div>
          <div className={`music ${collapse ? "collapsed" : "expanded"}`}>

          </div>
        </div>
        <CSSTransition
          nodeRef={homePageRef}
          in={active === 2}
          timeout={{enter: 800, exit: 800}}
          classNames="page-ani"
          unmountOnExit
        >
          <div className="homePage" ref={homePageRef}>
            <div className='page1'>
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
              <div className='content'>
                <Space wrap>
                    {
                      windows.map((window,index) => (
                        <div key={index} className='window'>
                          <PreviewWindow url={window.url} img={window.img} />
                        </div>
                      ))
                    }
                </Space>
              </div>
            </div>
          </div>
        </CSSTransition>

        <CSSTransition
            nodeRef={selfInfoRef}
            in={active === 1}
            timeout={800}
            classNames="page-ani"
            unmountOnExit
          >
          <div className='selfInfo' ref={selfInfoRef}>
            <div>
              <Handwriting />
            </div>
          </div>
        </CSSTransition>


        <CSSTransition
            nodeRef={webInfoRef}
            in={active === 3}
            timeout={800}
            classNames="page-ani"
            unmountOnExit
        >              
          <div className='webInfo'>

          </div>
        </CSSTransition>

      </div>
       
        
      <div className='footer'>

      </div>
    </div>
  )
}

export default Home;