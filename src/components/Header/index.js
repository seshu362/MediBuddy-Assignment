import './index.css'

const Header =() =>{
    return(
        <div className='header-container'>
            <div className='header-location-container'>
            <img className='left-arror' src='https://res.cloudinary.com/dw7dhefpb/image/upload/v1736589536/arrow-left_shq462.png' alt='arror' /> 
                <div className='location-container'>
                    <div className='location-sub-container'>
                        <h1 className='location-name'>Billekahalli</h1>
                        <img className='gps-logo' src='https://res.cloudinary.com/dw7dhefpb/image/upload/v1736591111/Group_124123_rkk15m.png' alt='gps'/>
                    </div>
                    <p className='location-para-mobile'>Sarvabhoumanagar Billekahall...</p>
                    <p className='location-para-desktop'>Sarvabhoumanagar Billekahalli, BG Road, Bangalore, Karnataka - 560076</p>
                </div>
            </div>
            <img className='price-cart-image' src='https://res.cloudinary.com/dw7dhefpb/image/upload/v1736599798/Wallet_Cart_wgwqe8.png' alt='cart-logo'/>
        </div>

    )
        
}
export default Header