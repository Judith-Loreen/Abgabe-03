"use strict";

/**
 * Selects a random full image at the start and displays it.
 */
function showRandomImageAtStart() {
    // TODO: Select all 6 links (<a>) in the thumbnail section. They contain the URLs to the full images.
    // TODO: Select a random entry out of these 6.
    // TODO: Implement switchFullImage() below.
    // TODO: Call switchFullImage() with the URL of the random image and the alt attribute of the thumbnail (it contains the description).
    // TODO: Set a background color (classes .bg-dark and .text-white) to the card-body of your random image (hint: it's the sibling element of your link).
    const links = document.getElementsByClassName("card-link");
    const randomLink = links[getRandomInt(0, links.length)];
    const randomImage = randomLink.href;
    const randomAlt = randomLink.getAttribute("alt");
    switchFullImage(randomImage, randomAlt);
    const randomCard = randomLink.nextElementSibling;
    randomCard.classList.add("bg-dark");
    randomCard.classList.add("text-white");
}

/**
 * Prepare the links on the full images so that they execute the following tasks:
 * - Switch the full image to the one that has been clicked on.
 * - Set the highlight under the current thumbnail.
 * - Load the notes for the current image.
 */
function prepareLinks() {
    // TODO: Select all the 6 links (<a>) in the thumbnail section.
    // TODO: Set an event listener for the click event on every <a> element.
    //  (or advanced: think of a way to do it with one single handler)

    // TODO: The callback of the listener should do the following things:
    //  - Remove the .bg-dark and .text-white classes from the card where it's currently set.
    //  - Add both classes again to the card where the click happened (hint: "this" contains the very <a> element, where the click happened).
    //  - Call switchFullImage() with the URL clicked link and the alt attribute of the thumbnail.
    //  - Implement and then call loadNotes() with the key for the current image (hint: the full image's URL makes an easy and unique key).
    //  - Prevent the default action for the link (we don't want to follow it).
    const sectionThumbnail = document.getElementById("thumbnails");
    const thumbnailLinks = sectionThumbnail.querySelectorAll("a");

    thumbnailLinks.forEach(function(link) {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            thumbnailLinks.forEach(function(link2) {
                link2.nextElementSibling.classList.remove("bg-dark", "text-white");
            });
            this.nextElementSibling.classList.add("bg-dark", "text-white");
            switchFullImage(this.href, this.firstElementChild.alt);
            loadNotes(this.href);
            storeNotes(this.href);
        });
    });
}

/**
 * Stores or deletes the updated notes of an image after they have been changed.
 */
function storeNotes() {
    const notesField = document.getElementById("notes");
    notesField.addEventListener("blur", function() {
        const currentKey = document.querySelector("img").src;
        const currentNotes = notesField.value;
        if (currentNotes === "") {
            localStorage.removeItem(currentKey);
        } else {
            localStorage.setItem(currentKey, currentNotes);
        }
    });
}

/**
 * Switches the full image in the <figure> element to the one specified in the parameter. Also updates the image's alt
 * attribute and the figure's caption.
 * @param {string} imageUrl The URL to the new image (the image's src attribute value).
 * @param {string} imageDescription The image's description (used for the alt attribute and the figure's caption).
 */
function switchFullImage(imageUrl, imageDescription) {
    // Get the <img> element for the full image by its class name.
    const fullImage = document.querySelector(".full-image img");

    // Set the src and alt attributes with the values from the parameters.
    fullImage.src = imageUrl;
    fullImage.alt = imageDescription;

    // Select the <figcaption> element and set its description as text content.
    const figureCaption = document.querySelector(".full-image figcaption");
    figureCaption.textContent = imageDescription;
}

/**
 * Loads the notes from local storage for a given key and sets the contents in the notes field with the ID notes.
 * @param {string} key The key in local storage where the entry is found.
 */
function loadNotes(key) {
    // TODO: Select the notes field.
    // TODO: Check the local storage at the provided key.
    //  - If there's an entry, set the notes field's HTML content to the local storage's content.
    //  - If there's no entry, set the default text "Enter your notes here!".
    const notesField = document.getElementById("notes");
    const defaultText = "Enter your notes here!";
    const savedNotes = localStorage.getItem(key);
    if (savedNotes === null || savedNotes == "") { // Verwende savedNotes anstatt localStorage.getItem(key)
        notesField.innerHTML = defaultText;
    } else {
        notesField.innerHTML = savedNotes;
    }
}

/**
 * Returns a random integer value between min (included) and max (excluded).
 * @param {number} min The minimum value (included).
 * @param {number} max The maximum value (excluded).
 * @returns {number} A random integer value between min (included) and max (excluded).
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Gets the whole thing started.
 */
showRandomImageAtStart();
prepareLinks();
storeNotes();