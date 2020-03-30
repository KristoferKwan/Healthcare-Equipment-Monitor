# Inspiration
I was inspired to do this project in light of the current shortage of equipment within healthcare to treat COVID-19 patients and protect the healthcare professionals are in charge of treating them. During these times where supplies are limited and in short supply with an unknown number of potential patients, it is critical for medical professionals to be able to understand the load that they can handle at any given point in time.

# What it does
The app was designed to help monitor the amount of healthcare equipment readily available in the healthcare system and to aggregrate the information into one app for healthcare providers, patients, and distributors. 

The app has two main functions:
1. > Healthcare providers can log and share between hospitals the amount of medical equipment and resources available at each hospital.
2. > Manufacturers and healthcare equipment distributors can view a visualization of the density of COVID-19 cases in areas across the country on a county-by-county basis and the availability of equipment in each county.

Together, the number of COVID-19 cases of the nearby counties and on-hand resources will allow manufacturers and distriutors better streamline their supply chain efforts towards the areas that will see the biggest impact from an influx of supplies. Hospitals and also better understand the load to expect from their region and either request aid from neighboring hospitals or the federal government.

# How I built it
The app was broken into several parts that was developed in tandem.
1. > Hospital Registration
2. > Mapping of Hospitals in the Country
3. > Hospital Homepages for Displaying Day-to-Day Data
4. > Data Acquisition, Generation, and Modification
5. > Server Set-up to Store Hospital and User Data

# Challenges I ran into
The main challenge was in the initial data acquisition phase. There was not enough public information available in the form that was directly specific to our goals of tracking available healthcare resources. This is due to the fact that this app is determined to aggregate data that isn't normally shared between hospitals and the public. The initial sources for county data that was discovered were not from reliable sources, with some containing malware. Filler values were generated for the availability numbers at each hospital. 
# Accomplishments that I'm proud of

# What I learned
## Kris

## Covenant

## Mitchell

## Owen

## Gary
This was my first time working on a webapp so this whole experience has been really interesting.I definitely enjoyed a lot of the simplicity built into React.js to make frontend design straightforward and intuitive. The focus of the project helped to further improve my understanding of the issues that hospitals are currently facing and thinking critically about ways to alleviate some of the issues.

# What's next for Healthcare-Equipment-Monitor
If the app can gather the right data in terms of equipment availability and COVID-19 cases by county, it can be expected that more helpful representations and use cases for the data to be developed. Some ideas is a data interpolation/machine learning algorithm that would look at the COVID-19 cases and equipment avalability to determine how to best distribute resources to tackle the virus.

The security of the application can be improved for user access and data integrity. The app contains sensitive information that pertains to the stock/inventory available at hospitals. Access to the app should be limited by license/account distributions per hospital or accounts created should utilize two-factor authentication/SSO to ensure that only those with permission may view the information. This also pertains to the manufacturers and distributors who wish to view the information. A formal request system should be implemented and different user account levels should be used to restrict manufacturers from editing data.

On the topic of data, the validity and quality of the data that is stored onto the database should be maintained and secure. Third party services will need to be utilized to protect the user account usernames and passwords. Non-authorized users should not be able to access/modify sensitive information.

# Built With
The frontend components were built using React.js and the backend consisted of Node.js in communication with the Mongodb server.
