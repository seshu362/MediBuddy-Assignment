import React, { useEffect, useState } from "react";
import Header from '../Header';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { LuDot } from "react-icons/lu";
import { FaRupeeSign } from "react-icons/fa";
import './index.css';

const PLUS_IMAGE =
  'https://res.cloudinary.com/dw7dhefpb/image/upload/v1736673763/Icon_j7ydvq.png'
const MINUS_IMAGE =
  'https://res.cloudinary.com/dw7dhefpb/image/upload/v1736673734/minus-circle_nqtwgb.png'

const Home = () => {
  const [data, setData] = useState(null);
  const [activeCategory, setActiveCategory] = useState('Popular');
  const [activeFaq, setActiveFaq] = useState({});

  useEffect(() => {
    const getPageConfig = async () => {
      try {
        const response = await fetch(
          "https://677f757b0476123f76a68a42.mockapi.io/api/labs/v1/page_config"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);

      } catch (error) {
        console.error("Error fetching page config:", error);
      }
    };

    getPageConfig();
  }, []);


  const iconsData = data?.[0]?.page_config?.find((item) => item.title === "Icons")?.props || [];
  const bannersData = data?.[0]?.page_config?.find((item) => item.title === "Banners")?.props || [];
  const categories = data?.[0]?.page_config?.find(item => item.id === '3')?.categories?.['10386'] || [];
  const packages = data?.[0]?.page_config?.find((item) => item.id === "3")?.props?.[0]?.packages || [];
  const faqs = data?.[0]?.page_config?.find((item) => item.title === "Frequently Asked Questions")?.props || [];

  console.log(faqs)

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  const onToggleIsActive = (index) => {
    setActiveFaq(prevState => ({
      ...prevState,
      [index]: !prevState[index], // Toggle the active state for the clicked FAQ
    }));
  };

  return (
    <>
      <Header />
      <div className="second-search-icons-container">
        <div className="search-container">
          <input type="search" placeholder="Find lab tests, diagnostics centres" className="search-input" />
          <img className="search-icon" src="https://res.cloudinary.com/dw7dhefpb/image/upload/v1736602086/Icons_adm6py.png" alt="search" />
        </div>
        <div className="icons-second-container">
          {iconsData.length > 0 ? (
            iconsData.map((icon, index) => (
              <div key={index} className="icon-item">
                <img src={icon.iconUrl} alt={icon.iconText} className="icon-image" />
                <p className="icon-text">{icon.iconText}</p>
              </div>
            ))
          ) : (
            <div className="loader-container">
              <Loader type="TailSpin" color="blue" height={50} width={50} />
            </div>
          )}
        </div>
        <div className="banner-container">
          {bannersData.length > 0 ? (
            bannersData.map((banner, index) => (
              <div key={index} className="banner-item">
                <img src={banner.bannerUrl} alt={`Banner ${index}`} className="banner-image" />
              </div>
            ))
          ) : (
            <div className="loader-container">
              <Loader type="TailSpin" color="blue" height={50} width={50} />
            </div>
          )}
        </div>
      </div>

      <div className="feacture-health-check-bg-container">
        <div className="feacture-health-check-header-container">
          <h1 className="featured-health-heading">Featured Health Check-ups</h1>
          <h1 className="view-all-text">View All</h1>
        </div>
        <div className="categories-container">
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <button
                key={index}
                className={`category-button ${category === activeCategory ? 'active' : ''}`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </button>
            ))
          ) : (
            <p>No categories found</p>
          )}
        </div>

        <div className="carousel-container">
          <div className="carousel">
            {packages.map((item, index) => (
              <div key={index} className="package-card">
                <h1 className="package-name">{item.packageName}</h1>
                <div className="report-container">
                    <img className="" src="https://res.cloudinary.com/dw7dhefpb/image/upload/v1736621275/Frame_wcvq7r.png" alt="report"/>
                    <p className="report-hours-text">{item.reportsTatText}</p>
                </div>
                <p className="test-count">{item.testCount}<span className="tests-text">Tests</span></p>
                <div className="test-container">
                    <LuDot color="#4F4F4F" size={15}/>
                    <p className="test-name">{item.testsSummary[0]}</p>
                </div>
                <div className="test-container">
                    <LuDot color="#4F4F4F" size={15}/>
                    <p className="test-name">{item.testsSummary[1]}</p>
                </div>
                <div className="avl-fasting-container">
                    <div className="avl-first-con">
                        <h1 className="avl-text-h1">Fasting:</h1>
                        <p className="fast-para">{item.fastingHoursText}</p>
                    </div>
                    <div className="avl-first-con">
                        <h1 className="avl-text-h1">Available at: </h1>
                        <div className="home-container">
                            <img className="home" src="https://res.cloudinary.com/dw7dhefpb/image/upload/v1736624934/Group_106268_jkoaj8.png" alt="report"/>
                            <p className="fast-para">{item.currentVisitType}</p>
                        </div>
                        
                    </div>
                </div>
                <div className="button-price-container">
                    <div className="prices-container">
                        <div className="strike-price-container">
                            <FaRupeeSign color="#969696" size={12}/>
                            <p className="strike-price">{item.priceRange}</p>
                            <p className="discount-text">{item.discount}% OFF</p>
                        </div>
                        <div className="actual-price-container">
                            <FaRupeeSign color="#050A4E"  size={17}/>
                            <p className="actual-price">{item.price}/-</p>
                        </div>    
                    </div>
                    <button type="button" className="add-button">Add</button> 
                </div>
                <div className="button-blue-container">
                    {item.tags?.bottomTag?.map((tag, index) => (
                        <h1 key={index} className="offer-text">{tag}</h1>
                    ))}
                    </div>

              </div>
              
            ))}
          </div>
          
        </div>
      </div>
      <div className="book-lab-test-container">
        <div className="feacture-health-check-header-container">
            <h1 className="featured-health-heading">Book Lab Tests</h1>
            <h1 className="view-all-text">View All</h1>
        </div>
        <div className="categories-container">
                {categories.length > 0 ? (
                categories.map((category, index) => (
                    <button
                    key={index}
                    className={`lab-category-button ${category === activeCategory ? 'active' : ''}`}
                    onClick={() => handleCategoryClick(category)}
                    >
                    {category}
                    </button>
                ))
                ) : (
                <p>No categories found</p>
                )}
        </div>  
        <div className="book-lab-test-card-container">
                <div className="book-lab-test-first-container">
                    <h1 className="package-name head-book-lab">Vitamin D (25-Oh)</h1>
                    <div className="book-lab-report-container">
                        <img className="" src="https://res.cloudinary.com/dw7dhefpb/image/upload/v1736621275/Frame_wcvq7r.png" alt="report"/>
                        <p className="book-lab-report-hours-text">Report in 24-48 Hrs</p>
                    </div>
                    <div className="avl-first-con padding-left">
                        <h1 className="avl-text-h1">Available at: </h1>
                        <div className="home-container item-center">
                            <img className="home" src="https://res.cloudinary.com/dw7dhefpb/image/upload/v1736624934/Group_106268_jkoaj8.png" alt="report"/>
                            <p className="fast-para">Home</p>
                            <img className="center" src="https://res.cloudinary.com/dw7dhefpb/image/upload/v1736649035/Group_104846_h9b7iy.png" alt="report"/>
                            <p className="fast-para">Center</p>
                        </div>
                        
                    </div>


                </div>
                <div className="button-price-container book-lab-btn-container">
                    <div className="prices-container">
                        <div className="strike-price-container desk-margin">
                            <FaRupeeSign color="#969696" size={12}/>
                            <p className="strike-price book-lab-text-strike">1999</p>
                            <p className="discount-text">45% OFF</p>
                        </div>
                        <div className="actual-price-container">
                            <FaRupeeSign color="#050A4E"  size={17}/>
                            <p className="actual-price book-lab-text">1099/-</p>
                        </div>    
                    </div>
                    <button type="button" className="add-button book-lab-butn">Add</button> 
                </div>

        </div> 
        <div className="book-lab-test-card-container">
                <div className="book-lab-test-first-container">
                    <h1 className="package-name head-book-lab">Vitamin B12 - Serum</h1>
                    <div className="book-lab-report-container">
                        <img className="" src="https://res.cloudinary.com/dw7dhefpb/image/upload/v1736621275/Frame_wcvq7r.png" alt="report"/>
                        <p className="book-lab-report-hours-text">Report in 24-48 Hrs</p>
                    </div>
                    <div className="avl-first-con padding-left">
                        <h1 className="avl-text-h1">Available at: </h1>
                        <div className="home-container item-center">
                            <img className="home" src="https://res.cloudinary.com/dw7dhefpb/image/upload/v1736624934/Group_106268_jkoaj8.png" alt="report"/>
                            <p className="fast-para">Home</p>
                            <img className="center" src="https://res.cloudinary.com/dw7dhefpb/image/upload/v1736649035/Group_104846_h9b7iy.png" alt="report"/>
                            <p className="fast-para">Center</p>
                        </div>
                        
                    </div>


                </div>
                <div className="button-price-container book-lab-btn-container">
                    <div className="prices-container">
                        <div className="strike-price-container desk-margin">
                            <FaRupeeSign color="#969696" size={12}/>
                            <p className="strike-price book-lab-text-strike">1999</p>
                            <p className="discount-text">45% OFF</p>
                        </div>
                        <div className="actual-price-container">
                            <FaRupeeSign color="#050A4E"  size={17}/>
                            <p className="actual-price book-lab-text">1099/-</p>
                        </div>    
                    </div>
                    <button type="button" className="add-button book-lab-butn">Add</button> 
                </div>

        </div>  
        <div className="book-lab-test-card-container">
                <div className="book-lab-test-first-container">
                    <h1 className="package-name head-book-lab">Thyroid Panel -FREE</h1>
                    <div className="book-lab-report-container">
                        <img className="" src="https://res.cloudinary.com/dw7dhefpb/image/upload/v1736621275/Frame_wcvq7r.png" alt="report"/>
                        <p className="book-lab-report-hours-text">Report in 24-48 Hrs</p>
                    </div>
                    <div className="avl-first-con padding-left">
                        <h1 className="avl-text-h1">Available at: </h1>
                        <div className="home-container item-center">
                            <img className="home" src="https://res.cloudinary.com/dw7dhefpb/image/upload/v1736624934/Group_106268_jkoaj8.png" alt="report"/>
                            <p className="fast-para">Home</p>
                            <img className="center" src="https://res.cloudinary.com/dw7dhefpb/image/upload/v1736649035/Group_104846_h9b7iy.png" alt="report"/>
                            <p className="fast-para">Center</p>
                        </div>
                        
                    </div>


                </div>
                <div className="button-price-container book-lab-btn-container">
                    <div className="prices-container">
                        <div className="strike-price-container desk-margin">
                            <FaRupeeSign color="#969696" size={12}/>
                            <p className="strike-price book-lab-text-strike">1999</p>
                            <p className="discount-text">45% OFF</p>
                        </div>
                        <div className="actual-price-container">
                            <FaRupeeSign color="#050A4E"  size={17}/>
                            <p className="actual-price book-lab-text">1099/-</p>
                        </div>    
                    </div>
                    <button type="button" className="add-button book-lab-butn">Add</button> 
                </div>

        </div>  
        <div className="book-lab-test-card-container">
                <div className="book-lab-test-first-container">
                    <h1 className="package-name head-book-lab">HBA1c</h1>
                    <div className="book-lab-report-container">
                        <img className="" src="https://res.cloudinary.com/dw7dhefpb/image/upload/v1736621275/Frame_wcvq7r.png" alt="report"/>
                        <p className="book-lab-report-hours-text">Report in 24-48 Hrs</p>
                    </div>
                    <div className="avl-first-con padding-left">
                        <h1 className="avl-text-h1">Available at: </h1>
                        <div className="home-container item-center">
                            <img className="home" src="https://res.cloudinary.com/dw7dhefpb/image/upload/v1736624934/Group_106268_jkoaj8.png" alt="report"/>
                            <p className="fast-para">Home</p>
                            <img className="center" src="https://res.cloudinary.com/dw7dhefpb/image/upload/v1736649035/Group_104846_h9b7iy.png" alt="report"/>
                            <p className="fast-para">Center</p>
                        </div>
                        
                    </div>


                </div>
                <div className="button-price-container book-lab-btn-container">
                    <div className="prices-container">
                        <div className="strike-price-container desk-margin">
                            <FaRupeeSign color="#969696" size={12}/>
                            <p className="strike-price book-lab-text-strike">1999</p>
                            <p className="discount-text">45% OFF</p>
                        </div>
                        <div className="actual-price-container">
                            <FaRupeeSign color="#050A4E"  size={17}/>
                            <p className="actual-price book-lab-text">1099/-</p>
                        </div>    
                    </div>
                    <button type="button" className="add-button book-lab-butn">Add</button> 
                </div>

        </div> 
      </div>
      <div className="life-style-container">
        <h1 className="featured-health-heading">LifeStyle Health Check Package</h1>
        <div className="life-style-card-container">
            <div className="life-style-card-item-container">
                <img className="life-logo" src="https://res.cloudinary.com/dw7dhefpb/image/upload/v1736652384/Group_208658_fssm2s.png" alt="helatlogo"/>
                <h1 className="life-logo-text">Hyper-Tension</h1>
            </div>
            <div className="life-style-card-item-container">
                <img className="life-logo" src="https://res.cloudinary.com/dw7dhefpb/image/upload/v1736652676/Group_208696_vgqc1t.png" alt="helatlogo"/>
                <h1 className="life-logo-text">Obesity</h1>
            </div>
            <div className="life-style-card-item-container">
                <img className="life-logo" src="https://res.cloudinary.com/dw7dhefpb/image/upload/v1736652693/Group_208697_grkhsd.png" alt="helatlogo"/>
                <h1 className="life-logo-text">Smoking & Alcohol</h1>
            </div>
            <div className="life-style-card-item-container">
                <img className="life-logo" src="https://res.cloudinary.com/dw7dhefpb/image/upload/v1736652733/Group_208661_a4xcyd.png" alt="helatlogo"/>
                <h1 className="life-logo-text">Diabetic</h1>
            </div>
            <div className="life-style-card-item-container">
                <img className="life-logo" src="https://res.cloudinary.com/dw7dhefpb/image/upload/v1736652384/Group_208658_fssm2s.png" alt="helatlogo"/>
                <h1 className="life-logo-text">Hyper-Tension</h1>
            </div>
            <div className="life-style-card-item-container">
                <img className="life-logo" src="https://res.cloudinary.com/dw7dhefpb/image/upload/v1736652676/Group_208696_vgqc1t.png" alt="helatlogo"/>
                <h1 className="life-logo-text">Obesity</h1>
            </div>
        </div>
       </div>
       <div className="bengalure-image-container">
        <h1 className="featured-health-heading">Book Health Check Packages in Bengaluru</h1>
        <div class="bengalure-image-card-container">
            <div class="bengalure-image-wrapper">
                <img class="bengalure-image" src="https://www.medibuddy.in/assets/images/corpLabs/a40-female.png" alt="mia"/>
                <div class="bengalure-image-text">Above 40 yrs Female</div>
            </div>
            <div class="bengalure-image-wrapper">
                <img class="bengalure-image" src="https://www.medibuddy.in/assets/images/corpLabs/a40-male.png" alt="mia"/>
                <div class="bengalure-image-text">Above 40 yrs Male</div>
            </div>
            <div class="bengalure-image-wrapper">
                <img class="bengalure-image" src="https://www.medibuddy.in/assets/images/corpLabs/b40-female.png" alt="mia"/>
                <div class="bengalure-image-text">Below 40 yrs Female</div>
            </div>
            <div class="bengalure-image-wrapper">
                <img class="bengalure-image" src="https://www.medibuddy.in/assets/images/corpLabs/b40-male.png" alt="mia"/>
                <div class="bengalure-image-text">Below 40 yrs Male</div>
            </div>
        </div>




       </div>

       <div className="four-card-container">
                <div className="four-card-item">
                    <img className="" src="https://www.medibuddy.in/assets/icons/labs/test.svg" alt="safe"/>
                    <div className="four-card-trext-container">
                        <h1 className="four-ccard-heading">Safe and Approved Labs</h1>
                        <p className="four-ccard-para">Book safe and hygienic lab tests</p>
                        <p className="four-ccard-para">From approved labs</p>
                    </div>
                </div>
                <div className="four-card-item">
                    <img className="" src="https://www.medibuddy.in/assets/icons/labs/health.svg" alt="safe"/>
                    <div className="four-card-trext-container">
                        <h1 className="four-ccard-heading">Access corporate benefits</h1>
                        <p className="four-ccard-para">Book Your Corporate</p>
                        <p className="four-ccard-para">Sponsored Health Checkups</p>
                    </div>
                </div>
                <div className="four-card-item">
                    <img className="" src="https://www.medibuddy.in/assets/icons/labs/doctor.svg" alt="safe"/>
                    <div className="four-card-trext-container">
                        <h1 className="four-ccard-heading">Expert Opinion Collection</h1>
                        <p className="four-ccard-para">Get your reports reviewed by</p>
                        <p className="four-ccard-para">Verified Doctors</p>
                    </div>
                </div>
                <div className="four-card-item">
                    <img className="" src="https://www.medibuddy.in/assets/icons/labs/rider.svg" alt="safe"/>
                    <div className="four-card-trext-container">
                        <h1 className="four-ccard-heading">Home Sample collection</h1>
                        <p className="four-ccard-para">Get your reports reviewed by</p>
                        <p className="four-ccard-para">Comfort of your home</p>
                    </div>
                </div>
                
       </div>

       <div className="last-visted-container">
        <div className="feacture-health-check-header-container">
                <h1 className="featured-health-heading">Labs Visited</h1>
                <h1 className="view-all-text">View All {`>>`}</h1>
            </div>
        <div className="lab-vist-card-container">
            <img src="https://res.cloudinary.com/dw7dhefpb/image/upload/v1736659524/Image_1_lfbepv.png" className="last-imag" alt="imh"/>
            <img  className="paient-img-dtails" src="https://res.cloudinary.com/dw7dhefpb/image/upload/v1736660046/Patient_Information_oevfaq.png" alt="paient"/>
        </div>    
       </div>

       <div className="trusted-container">
                <div className="trusted-first-container">
                    <img className="trusred-img" src="https://res.cloudinary.com/dw7dhefpb/image/upload/v1736660682/Trusted_by_20_00_000_Users_Every_month_frkivn.png" alt="imgae"/>
                    <img alt="alt-img" src="https://res.cloudinary.com/dw7dhefpb/image/upload/v1736660830/Group_105496_y7kyse.png" className="trs-img"/>
                </div>
                <div className="second-trusted-container">
                    <div className="second-trusted-sub-container">
                        <img className="second-trusted-img" src="https://res.cloudinary.com/dw7dhefpb/image/upload/v1736661291/Group_105500_kurk7k.png" alt="group" />
                        <h1 className="diagnostic-centres-text">200+ Approved <br/>Diagnostic Centres</h1>
                    </div>
                    <div className="second-trusted-sub-container">
                        <img className="second-trusted-img" src="https://res.cloudinary.com/dw7dhefpb/image/upload/v1736661792/Group_87950_wffo9h.png" alt="group" />
                        <h1 className="diagnostic-centres-text">1200+ Lab Tests <br/> Offered</h1>
                    </div>
                    <div className="second-trusted-sub-container">
                        <img className="second-trusted-img" src="https://res.cloudinary.com/dw7dhefpb/image/upload/v1736661792/Group_105501_fr9ipk.png" alt="group" />
                        <h1 className="diagnostic-centres-text">1200+ Pincodes <br/>Covered</h1>
                    </div>

                </div>
       </div>

       <div className="review-container">
                <h1 className="users-text">What our Users say</h1>
                <div className="review-items-container">
                <div className="review-card-container">
                   <div className="review-inner-first-container">
                        
                        <div className="row-item">
                        <img src="https://res.cloudinary.com/dw7dhefpb/image/upload/v1736662879/Group_105511_hfdxi1.png" alt="star"/>
                        <p className="days-text">2 Days Ago</p>
                        </div>
                        <div className="row-item">
                        <img src="https://res.cloudinary.com/dw7dhefpb/image/upload/v1736663151/Path_179681_nl7kfs.png" alt="star"/>
                        <p className="days-text">Bangalore</p>
                        </div>
                       
                    </div>
                    <p className="description">"Good app and very helpful to customer as customer can book online health check up and book hospitalization as customer ca...</p> 
                    <div className="review-inner-second-container">
                        <hr className="line"/>
                        <div className="row-item">
                            <img alt="item" className="item" src="https://res.cloudinary.com/dw7dhefpb/image/upload/v1736663817/Path_151981_1_nezh40.png"/>
                            <h1 className="name">Vikrant Kishore Suryavanshi</h1>
                        </div>
                    </div>
                </div>

                <div className="review-card-container">
                   <div className="review-inner-first-container">
                        
                        <div className="row-item">
                        <img src="https://res.cloudinary.com/dw7dhefpb/image/upload/v1736662879/Group_105511_hfdxi1.png" alt="star"/>
                        <p className="days-text">2 Days Ago</p>
                        </div>
                        <div className="row-item">
                        <img src="https://res.cloudinary.com/dw7dhefpb/image/upload/v1736663151/Path_179681_nl7kfs.png" alt="star"/>
                        <p className="days-text">Bangalore</p>
                        </div>
                       
                    </div>
                    <p className="description">""This app is very good. Online video call with any doc in 30 mins. Lab test booking also available and medicine delivered at your doorstep"....</p> 
                    <div className="review-inner-second-container">
                        <hr className="line"/>
                        <div className="row-item">
                            <img alt="item" className="item" src="https://res.cloudinary.com/dw7dhefpb/image/upload/v1736663817/Path_151981_1_nezh40.png"/>
                            <h1 className="name">Riddhi Shah</h1>
                        </div>
                    </div>
                </div>

                <div className="review-card-container">
                   <div className="review-inner-first-container">
                        
                        <div className="row-item">
                        <img src="https://res.cloudinary.com/dw7dhefpb/image/upload/v1736662879/Group_105511_hfdxi1.png" alt="star"/>
                        <p className="days-text">2 Years Ago</p>
                        </div>
                        <div className="row-item">
                        <img src="https://res.cloudinary.com/dw7dhefpb/image/upload/v1736663151/Path_179681_nl7kfs.png" alt="star"/>
                        <p className="days-text">Bangalore</p>
                        </div>
                       
                    </div>
                    <p className="description">This is one of the best app for health checkups. Provides prompt service at economical packages. This app is very handy in emergencies..</p> 
                    <div className="review-inner-second-container">
                        <hr className="line"/>
                        <div className="row-item">
                            <img alt="item" className="item" src="https://res.cloudinary.com/dw7dhefpb/image/upload/v1736663817/Path_151981_1_nezh40.png"/>
                            <h1 className="name">Shivangi Singh</h1>
                        </div>
                    </div>
                </div>

                <div className="review-card-container">
                   <div className="review-inner-first-container">
                        
                        <div className="row-item">
                        <img src="https://res.cloudinary.com/dw7dhefpb/image/upload/v1736662879/Group_105511_hfdxi1.png" alt="star"/>
                        <p className="days-text">2 Years Ago</p>
                        </div>
                        <div className="row-item">
                        <img src="https://res.cloudinary.com/dw7dhefpb/image/upload/v1736663151/Path_179681_nl7kfs.png" alt="star"/>
                        <p className="days-text">Bangalore</p>
                        </div>
                       
                    </div>
                    <p className="description">""Best app ever. One stop for all..either lab test, medicine home delivery or health insurance and consulting to dr. Its really good app"...</p> 
                    <div className="review-inner-second-container">
                        <hr className="line"/>
                        <div className="row-item">
                            <img alt="item" className="item" src="https://res.cloudinary.com/dw7dhefpb/image/upload/v1736663817/Path_151981_1_nezh40.png"/>
                            <h1 className="name">Isha Manchanda</h1>
                        </div>
                    </div>
                </div>


                </div>
                
       </div>

       <div className="how-it-work-container">
       <h1 className="how-heading">How it Works?</h1>
       <div className="how-edit-container">
       <div className="how-row-text">
            <img className="how-row-imag" src="https://res.cloudinary.com/dw7dhefpb/image/upload/v1736665424/Group_130240_oquotb.png" alt="how"/>
            <p className="para-how">Search for required Lab tests and select Diagnostic centre of your choice. Add prescription, patient details and address to complete the booking.</p>
        </div>
        <div className="how-row-text">
            <img className="how-row-imag" src="https://res.cloudinary.com/dw7dhefpb/image/upload/v1736665424/Group_130240_oquotb.png" alt="how"/>
            <p className="para-how">Search for required Lab tests and select Diagnostic centre of your choice. Add prescription, patient details and address to complete the booking.</p>
        </div>
        <div className="how-row-text">
            <img className="how-row-imag" src="https://res.cloudinary.com/dw7dhefpb/image/upload/v1736665424/Group_130240_oquotb.png" alt="how"/>
            <p className="para-how">Search for required Lab tests and select Diagnostic centre of your choice. Add prescription, patient details and address to complete the booking.</p>
        </div>
       </div>
       </div>

       <div className="how-it-work-container">
       <h1 className="how-heading">100% Safe & Secure Lab Tests</h1>
            <div className="safe-edit-container">
            <div className="safe-secure">
                <img className="safe-img" src="https://res.cloudinary.com/dw7dhefpb/image/upload/v1736667766/Group_105499_kxprau.png" alt="safe"/>
                <p className="safe-secure-text">Gov. Approved Diagnostic Centres</p>
            </div>
            <div className="safe-secure">
                <img className="safe-img" src="https://res.cloudinary.com/dw7dhefpb/image/upload/v1736667766/Group_105498_mljmjl.png" alt="safe"/>
                <p className="safe-secure-text">Daily Temperature Check of all Technicians</p>
            </div>
            <div className="safe-secure">
                <img className="safe-img" src="https://res.cloudinary.com/dw7dhefpb/image/upload/v1736667766/Group_105503_xcwith.png" alt="safe"/>
                <p className="safe-secure-text">Mandatory use of Mask & Sanitizers</p>
            </div>
            <div className="safe-secure">
            <img className="safe-img" src="https://res.cloudinary.com/dw7dhefpb/image/upload/v1736667766/Group_105504_cyjsa4.png" alt="safe"/>
            <p className="safe-secure-text">Regular Disinfectation of Labs</p>
            </div>
            </div>
       </div>
    
       <div className="faqs-container">
      <h1 className="how-heading">Frequently Asked Questions</h1>
      <ul className="faqs-list">
        {faqs.map((eachFaq, index) => (
          <li key={index} className="faq-item">
            <div className="question-container">
              <h1 className="question">{eachFaq.question}</h1>
              <button
                className="button"
                type="button"
                onClick={() => onToggleIsActive(index)} // Pass the index to toggle specific FAQ
              >
                <img
                  className="image"
                  src={activeFaq[index] ? MINUS_IMAGE : PLUS_IMAGE} // Use the active state for this specific FAQ
                  alt={activeFaq[index] ? 'minus' : 'plus'}
                />
              </button>
            </div>
            {activeFaq[index] && ( // Only show the answer for the active FAQ
              <div>
                <hr className="horizontal-line" />
                {eachFaq.points.map((point, idx) => (
                  <p key={idx} className="answer">{point.pnt}</p>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
    </>
  );
};

export default Home;
