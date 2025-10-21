# WEB103 Project 4 - Beverage Builder

Submitted by: **Joey Katach**

About this web app: **A premium beverage customization platform where users can create custom smoothies and coffee drinks. Features real-time price calculation, dynamic visual preview, and full CRUD operations with validation.**

Time spent: **15** hours

## Required Features

The following **required** functionality is completed:

- [x] **The web app uses React to display data from the API**
- [x] **The web app is connected to a PostgreSQL database, with an appropriately structured CustomItem table**
- [x] **Users can view multiple features of the CustomItem they can customize (base, fruits/flavors, add-ins, boosters, size)**
- [x] **Each customizable feature has multiple options to choose from**
- [x] **On selecting each option, the displayed visual icon for the CustomItem updates to match the option the user chose**
- [x] **The price of the CustomItem changes dynamically as different options are selected**
- [x] **The visual interface changes in response to at least one customizable feature (cup color changes based on base and fruits)**
- [x] **The user can submit their choices to save the item to the list of created CustomItems**
- [x] **If a user submits a feature combo that is impossible, they receive an appropriate error message and the item is not saved**
- [x] **Users can view a list of all submitted CustomItems**
- [x] **Users can edit a submitted CustomItem from the list view**
- [x] **Users can delete a submitted CustomItem from the list view**
- [x] **Users can update or delete CustomItems from the detail page**

## Stretch Features

The following **stretch** functionality is implemented:

- [x] **Toggle between two drink types (Smoothies and Coffee) with filtered options**
- [x] **Premium glassmorphism design with professional fonts**
- [x] **Animated visual cup preview with floating fruit emojis**
- [x] **Real-time validation prevents impossible combinations**

## Video Walkthrough

Here's a walkthrough of implemented required features:

<img src='walkthrough.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

GIF created with ScreenToGif

## Notes

Challenges encountered:
- Implementing real-time price calculation across multiple option types
- Creating dynamic visual updates that respond to user selections
- Designing glassmorphism UI with proper backdrop filters
- Managing state across drink type toggles
- Validating feature combinations before submission

## License

Copyright 2025 Joey Katach

Licensed under the Apache License, Version 2.0