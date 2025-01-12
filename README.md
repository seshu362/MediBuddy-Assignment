# Medibuddy Web Page Development

This project focuses on developing a fully responsive web page based on the provided Figma design. The objective is to transform the design mockup into a functional and visually accurate web interface, following best coding practices while ensuring responsiveness across all devices. The project integrates with an API to fetch dynamic content, featuring filtering logic for health check-up packages and lab test bookings. Built using **React**, this project showcases my skills in modern web development and efficient deployment practices.

## Installation

1. Run the following command to install the required Node.js packages::
```bash
   npm install
```
2. Now that you have installed the dependencies, run the following command to start the React development server:
```bash
   npm start
```
   - This will launch the Medibuddy web page in your default browser, allowing you to view the responsive UI and interact with the dynamic content fetched from the integrated API.

## Features of the Medibuddy Project

### **Page Content Fetching**
- Dynamically fetches page content from a provided API (`https://677f757b0476123f76a68a42.mockapi.io/api/labs/v1/page_config`), which includes configuration for health check-up packages, lab test details, and other relevant data.

### **Component-Based Architecture**
- Utilizes reusable components (e.g., header, footer, section components) to maintain consistency and ease of maintenance across the web page.
- Dynamically renders components based on API data, such as health check-up packages and lab test options.

### **Health Check-Up Packages and Lab Test Booking**
- Displays health check-up packages and lab test booking options, allowing users to explore and filter packages.
- Implements logic to conditionally render components like "Featured Health Check-up Packages" and "Book Lab Tests" based on API data and user interactions.

### **Responsive Design**
- The web page is fully responsive, ensuring an optimal user experience across various screen sizes (desktop, tablet, and mobile).
- Media queries and responsive units are used to ensure the design adjusts fluidly on different devices.

### **Design Accuracy**
- Follows the Figma design meticulously, ensuring that each component is styled and positioned according to the provided mockup.
- Regular adjustments are made to the design during development to match the Figma design's accuracy.
