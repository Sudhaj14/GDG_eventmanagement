import Navbar from "../components/navbar/Navbar.jsx";
import { useNavigate } from "react-router-dom";
import "./about.css";

const About = () => {
    
    return(
        <div >
			<Navbar/>
		<div class="acontainer">
			<div class="content-section">
				<div class="title">
					<h1 style={{ color: 'black' }}>About Us</h1>
				</div>
				<div class="content">
					<h3>Our Belief</h3>
					<p>Gooddeeds is a highly creative event design and management available for weddings and all the events. 
						We are one of the leading event management with talented team of dedicated event professionals with creativity and innovation. We are also passionate about transforming spaces and creating events that are genuinely unique.</p>
					<h3>Vision</h3>
					<p>We are here to let you enjoy your piece of cake while we walk the extra mile 
						for you and offers a “One stop Shoppe” for all your event management requirements. 
						An Event Organizer in Telangana</p>
					<h3>Mission</h3>
					<p>we strive to achieve the very best in quality and elegance for the client.
						From events which are close to heart like birthday parties to significant events like Marriages 
						we take a challenge and make sure each and every requirement of the client is met. 
						We have been in all the corners and with that we bring to the table what you deserve,
						The best event management company in Telangana.</p>
					
				</div>
				
			</div>
			<div class="image-section">
				<img src="https://www.vajraevents.com/images/wedding/wedding1-8.jpg"/>
				<img src="https://www.vajraevents.com/images/wedding/wedding1-8.jpg"/>
			</div>
		</div>
	</div>
    )
}

export default About
