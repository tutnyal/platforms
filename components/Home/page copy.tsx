// "use client"
// import { useState, useEffect } from "react";
// import "./home.css";
// import "./AInime-Home/home-v23.css";
// import "./AInime-Home/home-style12.css";
// import "./css/header-updated-v2.css";


// import { setupJquery, productCarousel, testimonialCarousel } from "../../lib/utils/jqueryCode";

// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import Swiper from 'swiper';
// import 'swiper/css';
// import $ from 'jquery';
// import Link from 'next/link';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { alignProperty } from "@mui/material/styles/cssUtils";
// import dynamic from 'next/dynamic';


// const HomePage = () => {

//     const [activeQuestion, setActiveQuestion] = useState('q1');
//     const [isTop, setIsTop] = useState(0);

//     useEffect(() => {
//         function handleScroll() {
//         const scrollTop = window.pageYOffset;
//         setIsTop(scrollTop);
//         }

//         window.addEventListener('scroll', handleScroll);

//         return () => {
//         window.removeEventListener('scroll', handleScroll);
//         };
//     }, []);

//     useEffect(() => {
//         const swiper1 = new Swiper('.product-carousal-content .swiper', {
//           loop: true,
//           allowTouchMove: false,
//           speed: 1200,
//           spaceBetween: 30,
//           navigation: {
//             nextEl: '.swiper-button-next',
//             prevEl: '.swiper-button-prev',
//           },
//         });
    
//         $('.product-carousal-content ul.blog-head > li').on('click', function () {
//           $('.product-carousal-content ul.blog-head > li').removeClass('active');
//           let clickedIndex = $(this).index();
//           swiper1.slideToLoop(clickedIndex);
//           setTimeout(function () {
//             let currentChild = clickedIndex + 1;
//             let selector = '.product-carousal-content ul.blog-head > li:nth-child(' + currentChild + ')';
//             $(selector).addClass('active');
//           }, 0);
//         });

//         const swiper2 = new Swiper('.swiper', {
//           // Optional parameters
//           loop: true,
//           allowTouchMove: false,
//           speed: 1200,
//           spaceBetween: 30,
    
//           // Navigation arrows
//           navigation: {
//             nextEl: '.animaker-testimonials .swiper-button-next',
//             prevEl: '.animaker-testimonials .swiper-button-prev',
//           },
    
//         });
    
//         $('.navigation-toggle .swiper-button-next').on('click', function () {
//           swiper2.slideNext();
//         });
    
//         $('.navigation-toggle .swiper-button-prev').on('click', function () {
//           swiper2.slidePrev();
//         });
    
//         return () => {
//           swiper1.destroy();
//           // swiper2.destroy()
//         }
//       }, [])

//     useEffect(() => {
//         setupJquery();
//         AOS.init({
//           duration: 1000
//         });
//       }, [])

//     return (
//         <div>
//             <div className="new_home_section">
//                 {/* Hero Banner section */}
//                 <section className="hero-section-wrapper">
//                     <div className="container1">
//                         <div className="hero-section-content">
//                             <h1>Create your own anime show today!</h1>
//                             <p>A tool that leverages AI and web3 technology to help solo animators <br /> & small anime studios
//                                 create shows and movies.</p>
//                             <Link className="rainbow-btn" href="/demo">Create for Free</Link>                           
//                         </div>
                        
//                         <div className="show-mobile video-holder">
//                             <video id="hero-video-mobile" className="desk-view video-placeholder hero-video" autoPlay muted loop playsInline poster="" title="Make your first video with AInime AI" style={{ borderRadius: '20px' }}>
//                                 <source src="" type="video/mp4" />
//                             </video>
//                         </div>

//                     </div>
//                 </section>

//                 <div className="why-animaker "> 
                            
//                     <div className="why-animaker-content " >
                        
//                         {/* Video section */}
//                         <div className="hide-mobile video-holder">
//                             <a>
//                                 <video id="hero-video-desktop" className="desk-view video-placeholder hero-video" autoPlay muted loop playsInline
//                                     poster="#"
//                                     title="Make your first video with Animaker AI" style={{ borderRadius: '20px' }}>
//                                     {/* <source src="https://www.animaker.com/Animaker-Home/new-assets/newhome-loop-video.mp4" type="video/mp4"  /> */}
//                                     {/* <img className="desk-view video-placeholder hero-video" src="https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/bc37f501-4d02-41ee-96b4-d268028b8010/original=true/Animedetour.jpeg" alt="Internal-communications" /> */}
//                                 </video>
//                             </a>
//                         </div>

//                         {/* Awards Section */}
//                         <section className="awards-section center-content">                             
//                         </section>

//                         {/* Why Ainime explainer section */}
//                         <section className="product-carousal center-content">
//                             <div className="container1" >
//                                 <div className="product-carousal-content">
//                                     <div className="product-carousal-head">
//                                         <div className="row" data-aos="fade-up">
//                                             <div className="col-md-8">
//                                                 <h1>Why
//                                                     Ainime?
//                                                 </h1>
//                                                 <p className="bolder">We believe the anime industry faces collapse<br /> due to unfair treatment of creators.</p>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <div className="row" data-aos="fade-up">
//                                         <div className="col-md-8">
//                                             <div className="show-mobile">
//                                                 <div id="prod-prev" className="icon-left-arrow">
//                                                     <img src="https://www.animaker.com/Animaker-Home/new-assets/product-icon-arrow.svg" alt=""  />
//                                                 </div>
//                                             </div>
//                                             <ul id="prod-container1" className="blog-head">
//                                                 <li className="active">The Problem</li>
//                                                 <li>Our Solution </li>
//                                                 <li>You, the creators</li>

//                                             </ul>
//                                             <div id="prod-next" className="show-mobile">
//                                                 <div className="icon-right-arrow">
//                                                     <img src="https://www.animaker.com/Animaker-Home/new-assets/product-icon-arrow.svg" alt="" className="slider-arrow" />
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="carousal-section" data-aos="fade-up">
//                                         <div className="swiper">
//                                             <div className="swiper-wrapper">
//                                                 <div className="swiper-slide one">
//                                                     <div className="tile-card">
//                                                         <div className="slider-row">
//                                                             <div className="col-md-8">
//                                                                 <img src="https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/c561bd2b-4f8c-4014-8d8c-67d1327361eb/original=true/grid-0077-1635750043-square%20wander%20solid%20stripes%20voxel%20complex%20vertex%20order%20cube%20ray%20rectangle%20metallic%20beyond%20translucent%20odd%20malleable%20fissure%20mass.jpeg" alt="Training-and-learning" className="slider-graphic-img" />
//                                                             </div>
//                                                             <div className="col-md-8">
//                                                                 <div className="slider-content" data-aos="fade-up">
//                                                                     <h2>The Problem</h2>
//                                                                     <p>Animators are overworked, underpaid, and exploited - even when the industry is booming.
//                                                                         The unfair treatment has made it unsustainable of animators, it has already driven out great talents
//                                                                         and at worst lead to death.
//                                                                     </p>
//                                                                 </div>
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                                 <div className="swiper-slide two">
//                                                     <div className="tile-card">
//                                                         <div className="slider-row">
//                                                             <div className="col-md-8">
//                                                                 <img src="https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/b0eb04ec-0c81-4f83-a11d-21b698416188/original=true/2CA547A618F29E9E6ADE1882F27861B0BDDEC20D1DA8989D08DB5A5CFDAB41C0.jpeg" alt="Marketing-and-sales" className="slider-graphic-img" />
//                                                             </div>
//                                                             <div className="col-md-8">
//                                                                 <div className="slider-content" data-aos="fade-up">
//                                                                     <h2>Our Solution for<br /> Solo & Small Anime Studios</h2>
//                                                                     <p>The solution is simple, but hard to implement: reducing production time, costs, and difficulty while empowering animators
//                                                                         to monetize their intellectual property. </p>
//                                                                 </div>
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                                 <div className="swiper-slide three">
//                                                     <div className="tile-card">
//                                                         <div className="slider-row">
//                                                             <div className="col-md-4">
//                                                                 <img src="https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/0f745265-4aae-425c-b0d1-86391af40159/original=true/00105-1100137840.jpeg" alt="Internal-communications" />
//                                                             </div>
//                                                             <div className="col-md-4">
//                                                                 <div className="slider-content" data-aos="fade-up">
//                                                                     <h2>You, the creators</h2>
//                                                                     <p>We&apos;re a piece of the puzzle; you are the other half!​<br />
//                                                                         Also, we&apos;ve got your back - Let us serve you and we will do big things together.
//                                                                     </p>
//                                                                 </div>
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 </div>

//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </section>

//                         {/* How it works explainer section */}
//                         <section className="meet-animation center-content">
//                             <div className="container1">
//                                 <div className="meet-animation-content">
//                                     <div className="row" data-aos="fade-up">
//                                         <div className="col-md-4">
//                                             <h1>How
//                                                 it works
//                                             </h1>
//                                             <p className="bolder">It&apos;s the world’s fastest & easiest way <br />to create animation videos, easy as 1, 2, 3</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </section>

//                         {/* Three image/video holders section */}
//                         <section className="meet-products center-content">
//                             <div className="container1">
//                                 <div className="image-row no-gutters">
//                                     <div className="col-md-4">
//                                         <div className="video-library">
//                                             <div className='bg-vid-container1'>
//                                                 <div className='bg-vid-wrapper'>
//                                                     <div className='tint'>
//                                                         <img src="https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/8b6aecfc-3552-4e5e-b426-6bb1dc25b2bc/original=true/00011-1903746577.jpeg" alt="Training-and-learning" className="slider-graphic-img" />
//                                                         {/* <img src="https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/ef54d3c5-4f1c-4962-90d4-b05e6ab71e11/original=true/00174-3292069243.jpeg" alt="Training-and-learning" className="slider-graphic-img" /> */}

//                                                     </div>
//                                                 </div>
//                                                 <div className='bg-vid-content' data-aos="fade-up" data-aos-delay="200">
//                                                     <h1>1. </h1><h2>Create your characters</h2>
//                                                     <p style={{ color: '#EFEFEF' }}>Simply describe or load an image to create unique characters.</p>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="col-md-4">
//                                         <div className="video-library">
//                                             <div className='bg-vid-container1'>
//                                                 <div className='bg-vid-wrapper'>
//                                                     <div className='tint'>
//                                                         <img src="https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/ef54d3c5-4f1c-4962-90d4-b05e6ab71e11/original=true/00174-3292069243.jpeg" alt="Training-and-learning" className="slider-graphic-img" />

//                                                     </div>
//                                                 </div>
//                                                 <div className='bg-vid-content' data-aos="fade-up" data-aos-delay="200">
//                                                     <h1>2. </h1><h2>Animate your characters</h2>
//                                                     <p style={{ color: '#EFEFEF' }}>Describe your character animation or use reference videos to create new animations.</p>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="col-md-4">
//                                         <div className="video-library">
//                                             <div className='bg-vid-container1'>
//                                                 <div className='bg-vid-wrapper'>
//                                                     <div className='tint'>
//                                                         <img src="https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/0a0b48f1-61b9-4dab-aef6-079d7cfcce99/original=true/00013-1253204931.jpeg" alt="Training-and-learning" className="slider-graphic-img" />

//                                                     </div>
//                                                 </div>
//                                                 <div className='bg-vid-content' data-aos="fade-up" data-aos-delay="200">
//                                                     <h1>3. </h1><h2>Produce your world class anime show</h2>
//                                                     <p style={{ color: '#EFEFEF' }}>We have tons of assets & references, inspiring you to create your best anime.</p>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>

//                             </div>
//                         </section>

//                         <section className="first-video center-content">
//                             <div className="container1">
//                                 <div className="first-video-content">
//                                     <h1 data-aos="fade-up">The world is waiting <br />for your first Anime!</h1>
//                                     <Link href="/demo" className="rainbow-btn">Create for Free</Link>
//                                 </div>
//                             </div>
//                         </section>

//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default HomePage;
