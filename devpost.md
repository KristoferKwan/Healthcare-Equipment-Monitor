# Inspiration
I was inspired to do this project in light of the current shortage of equipment within healthcare to treat COVID-19 patients and protect the healthcare professionals are in charge of treating them. During these times where supplies are limited and in short supply with an unknown number of potential patients, it is critical for medical professionals to be able to understand the load that they can handle at any given point in time.

# What it does
The app was designed to help monitor the amount of healthcare equipment readily available in the healthcare system and to aggregrate the information into one app for healthcare providers, patients, and distributors. 

The app has two main functions:
1. > Healthcare providers can log and share between hospitals the amount of medical equipment and resources available at each hospital.
2. > Healthcare providers can view a visualization of the density of COVID-19 cases in areas across the country on a county-by-county basis.

Together, the number of COVID-19 cases of the nearby counties and on-hand resources will allow healthcare professionals to gauge whether or not they are readily prepared or will require additonal aid and assistance from other hospitals or the federal governement and other providers of medical equipment and resources.

# How I built it
The app was broken into several parts that was developed in tandem.
1. > User Signup and Login
2. > Map of Hospitals in the Country
3. > Hospital Homepages for Displaying Day-to-Day Data
4. > Data Acquisition, Generation, and Modification
5. > Server Set-up to Store Hospital and User Data

# Challenges I ran into
The main challenge was in the initial data acquisition phase. There was not enough public information available in the form that was directly specific to our goals of tracking available healthcare resources. This is due to the fact that this app is determined to aggregate data that isn't normally shared between hospitals and the public. The initial sources for county data that was discovered were not from reliable sources with some containing malware. Filler values were generated for the availability numbers at each hospital. 
# Accomplishments that I'm proud of

# What I learned
## Kris

## Covenant

## Mitchell

## Owen

## Gary
This was my first time working on a webapp so this whole experience has been really interesting. I was able to learn how the frontend communicated with the backend. I definitely enjoyed a lot of the simplicity built into React.js to make frontend design straightforward and intuitive. The features that I expected to exist existed which isn't super common.

# What's next for Healthcare-Equipment-Monitor
If the app can gather the right data in terms of equipment availability and COVID-19 cases by county, it can be expected that more helpful representations and use cases for the data to be developed. Some ideas is a data interpolation/machine learning algorithm that would look at the COVID-19 cases and equipment avalability to determine how to best distribute resources to tackle the virus.

The security of the application can be improved for user access and data integrity. We do not want the usernames and passwords of our users to be leaked because this may allow non-authorized users to modify sensitive information. This goes the same way for securing the connection between the application and the server.

# Built With
The frontend components were built using React.js and the backend consisted of Node.js in communication with the Mongodb server.
