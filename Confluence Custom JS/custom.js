/*
Author: Brock Price
Date: 20230601
Purpose: This JavaScript personalizes the client-facing Scroll Viewport (Help Center Theme) for Confluence.
*/

/* =======
Share Page
========== */
let url4share = window.location.href;
//Code to add Envelope Unicode clickable button is in Print Section below

/* ================
FRONT PAGE CAROUSEL
=================== */
$('body > main > div > div.grid-container.space-overview > div.grid-x.grid-padding-x.grid-margin-x.space-overview__pinned > a:nth-child(4)').load('.../KB/_pageexcerpts #carouselbox', function() {
    $(this).children(':first').unwrap();
});

function autoRotateCarousel() {
  setInterval(function(){
    $("button.next").click();
  },7000);
}
  
carousel = (function(){
applyWhenElementExists(".carouselbox", function () {

  autoRotateCarousel();
  
  // Read necessary elements from the DOM once
  var box = document.querySelector('.carouselbox');
  var next = box.querySelector('.next');
  var prev = box.querySelector('.prev');
  
  // Define the global counter, the items and the 
  // current item 
  var counter = 0;
  var items = box.querySelectorAll('.content li');
  var amount = items.length;
  var current = items[0];

  box.classList.add('active');

  // navigate through the carousel

  function navigate(direction) {

    // hide the old current list item 
    current.classList.remove('current');
    
    // calculate the new position
    counter = (counter + direction) % amount;
    counter = counter < 0 ? amount - 1 : counter;

    // set new current element 
    // and add CSS class
    current = items[counter];
    current.classList.add('current');
  }

  // add event handlers to buttons
  next.addEventListener('click', function(ev) {
    navigate(1);
  });
  prev.addEventListener('click', function(ev) {
    navigate(-1);
  });

  // show the first element 
  // (when direction is 0 counter doesn't change)
  navigate(0);
}, 50);
})();

/* ===========================
ADD IMAGES TO FRONT PAGE CARDS
============================== */
$("body > main > div > div.grid-container.space-overview > div.grid-x.grid-padding-x.grid-margin-x.space-overview__pinned > a:nth-child(2)")
   .css({"background-image": "url('https://.../kb/files/21.1.x/all/53610937/53610954/1/1618351859000/card_wind_2.png')",
         "background-repeat": "no-repeat", "background-size": "cover"});

$("body > main > div > div.grid-container.space-overview > div.grid-x.grid-padding-x.grid-margin-x.space-overview__pinned > a:nth-child(3)")
   .css({"background-image": "url('https://.../kb/files/versions-all/all/53610937/53610948/1/1618350076213/card_hydro_1.png')",
         "background-repeat": "no-repeat", "background-size": "cover"});

$("body > main > div > div.grid-container.space-overview > div.grid-x.grid-padding-x.grid-margin-x.space-overview__pinned > a:nth-child(4)")
   .css({"background-image": "url('https://.../download/attachments/53610937/card_solar_1.png')",
         "background-repeat": "no-repeat", "background-size": "cover"});

/* $("body > main > div > div.grid-container.space-overview > div.grid-x.grid-padding-x.grid-margin-x.space-overview__pinned > a:nth-child(4)")
   .load('https://.../display/KB/SampleVideoPage #carouselbox'); */

//Add Noun Icons to the bottom row of cards

$("div.grid-x.grid-margin-x.space-overview__content > a:nth-child(1)")
  .css({"background-image": "url('https://.../download/attachments/53612048/Products_3.png')",
        "background-repeat": "no-repeat"});

$("div.grid-x.grid-margin-x.space-overview__content > a:nth-child(2)")
  .css({"background-image": "url('https://.../download/attachments/53612048/Release_3.png')",
        "background-repeat": "no-repeat"});

$("div.grid-x.grid-margin-x.space-overview__content > a:nth-child(4)")
  .css({"background-image": "url('https://.../download/attachments/53612048/Calendar_3.png')",
        "background-repeat": "no-repeat"});

/* =========================================
REPLACES PAGE-SPECIFIC CSS -FOR REMOVING TOC
============================================ */
/* Remove the TOC from Release Notes Pages */
if ((document.location.href.indexOf('.../platform-releases/platform-release-notes') > -1) 
    && (document.querySelector('div.cell.xlarge-2.article__toc.show-for-xlarge')))  {
    	document.querySelector('div.cell.xlarge-2.article__toc.show-for-xlarge').remove();
}

/* Remove the TOC from Update Notes Pages */
if ((document.location.href.indexOf('.../platform-releases/platform-update-release-notes') > -1) 
    && (document.querySelector('div.cell.xlarge-2.article__toc.show-for-xlarge')))  {
    	document.querySelector('div.cell.xlarge-2.article__toc.show-for-xlarge').remove();
}

/* Remove the TOC from the Products Page */
if ((document.location.href.indexOf('/...products') > -1) 
    && (document.querySelector('div.cell.xlarge-2.article__toc.show-for-xlarge')))  {
    	document.querySelector('div.cell.xlarge-2.article__toc.show-for-xlarge').remove();
}

/* ===================================
REDIRECT FROM 'MARKETS-ALL' TO '-ALL-' 
====================================== */
if (document.location.href.indexOf('markets-all') > -1) {
	var urlMarketsAll = window.location.toString();
  	window.location = urlMarketsAll.replace(/markets-all/, '-all-');
}

/* =====================
CUSTOMIZE THE FRONT PAGE 
======================== */
//Randomize the Front Page Image
//from https://stackoverflow.com/questions/15231812/random-background-images-css3
var images = ['energy-stack.png', 'power-plant-6.jpg', 'gas-flame.jpg', 'solar-8-topCrop.png'];
$('.hc-spaceHome-background-image').css({ 'background-image': 'url(/kb/_/AC1E0BF601725D25B4FC76CD3E7D104D/1596417187083/' + images[Math.floor(Math.random() * images.length)] + ')' });

// Add the Energy Noun Project Icons to the Bottom of the Main Page
$(".grid-container.space-overview").append("<iframe src='https://.../plugins/servlet/remotepageview?pageId=49911964' width='1400' height='500' frameBorder='0'></iframe>");

/* Base the dates for Front Page news items on Page Last Modified Date- Will need to change (Selectors) if page order changes  */
/* These rely on simple user macro: $action.dateFormatter.format($content.getLastModificationDate())  */
if (document.querySelector('.space-overview__pinned__topic') !== null) {	//Verify we're on the Main Page
	$.get('https://confluence.powercosts.com/kb/...training-schedule', function(data) {
   		trainingDateToLoad = $(data).find('#main-content > div > div > p:nth-child(10) > em > span').html();
   		document.querySelector("body > main > div > div.grid-container.space-overview > div.grid-x.grid-padding-x.space-overview__pinned > a:nth-child(2) > p").innerHTML = trainingDateToLoad;
	});
  
  //Instead, remove the dates altogether. The background images somewhat block the dates.
  $('.space-overview__pinned > a:nth-child(2) > p.tile__date').remove();
  //$('.space-overview__pinned > a:nth-child(3) > p.tile__date').remove();
  $('.space-overview__pinned > a:nth-child(4) > p.tile__date').remove();
  
//Change the date of the middle card into the word 'Announcements' (instead of putting a date there)
	//$.get('https://.../kb/...knowledge-base/announcements', function(data) {
   		//announcementDateToLoad = $(data).find('#main-content > div > div > p.auto-cursor-target > em > span').html();
   		//document.querySelector("body > main > div > div.grid-container.space-overview > div.grid-x.grid-padding-x.space-overview__pinned > a:nth-child(3) > p").innerHTML = announcementDateToLoad;
      	document.querySelector("body > main > div > div.grid-container.space-overview > div.grid-x.grid-padding-x.space-overview__pinned > a:nth-child(3) > p").innerHTML = "Announcements";
	//});
}

  
/* =============================
CODE TO CREATE PREV/NEXT BUTTONS
================================ */
/* Code below is pausing twice. First it waits for the window to load and then it waits a second after that.
   So far, this has allowed the code to work everytime, as not finding the active LI element in the TOC was an issue. */

//To elminate setTimeout, use setInterval to check if DOM element exists: https://abtasty.zendesk.com/hc/en-us/articles/200517763-Modify-elements-of-your-site-which-load-asynchronously-e-g-AJAX-
//Was using:  "$(window).on('load', function () {"		and "setTimeout(function(){"

//This code doesn't change. It's a simple function to check if element exists.
function applyWhenElementExists(selector, myFunction, intervalTime) {
    var interval = setInterval(function () {
        if (jQuery(selector).length > 0) {
            myFunction();
            clearInterval(interval);
        }
    }, intervalTime);
}

//This is the actual code, changed to check if the active line exists in the TOC.
applyWhenElementExists("li.is-active", function () {

    //First get the active TOC line
    var $the_active_line = $('li.is-active');
    //Add a variable for the previous line
    var $the_prev_line = $('li.is-active').prev();
    //Add a variable for the next line
    var $the_next_line = $('li.is-active').next();
    var $the_next_child = $('li.is-active ul li:first-child');
    //console.log($the_next_child);

    //Here we'll use buttons instead of links for PREV-NEXT so that the JQuery can run when PREV-NEXT is clicked.
    $("header.grid-x").after("<div id='navButtonsAll' style='display:flex;'><button id='prevButton' class='prevNext'>&nbsp; &lt; PREV &nbsp;</button>&nbsp;&nbsp;//&nbsp;&nbsp;<button id='nextButton' class='prevNext'>&nbsp; NEXT &gt; &nbsp;</button></div>");

    //THIS NEXT CODE RUNS WHEN THE PREV BUTTON IS CLICKED (from https://stackoverflow.com/questions/23812372/jquery-click-wont-console-log-or-alert)
    $('#prevButton').click(function () {
        var $allTheLines = ($the_prev_line).find('li');
        //The $allTheLines variable will be empty if the arrow for the previous TOC item isn't expanded or doesn't exist
        //Grab the href of the last li
        var $lastLiHREF = $allTheLines.last().children('a').attr('href');
        //If there is a previous line (child) href, we go to it. If there isn't, we go to the href of the previous sibling. If there's no previous sibling, we go to the parent.
        if ($lastLiHREF != null) {
            window.location.href = $lastLiHREF;
        } else if ($the_prev_line.children('a').attr('href') != null) {
            window.location.href = $the_prev_line.children('a').attr('href');
        } else {
            window.location.href = $('li.is-active').parent().closest('li').children('a').attr('href');
        }
    });

    //THIS NEXT CODE RUNS WHEN THE NEXT BUTTON IS CLICKED -Either grabs the next sibling or next child href. OR grabs the next parent.
    $('#nextButton').click(function () {
        //Go to the next child, if there is one. If no child, go to the next sibling.
        if ($the_next_child.length > 0) {
            window.location.href = $the_next_child.children('a').attr('href');
        } else if ($the_next_line.length > 0) {
            window.location.href = $the_next_line.children('a').attr('href');
        } else {
            // Found at https://stackoverflow.com/questions/1827482/jquery-find-next-prev-elements-of-a-certain-class-but-not-necessarily-siblings
            var $setter = $('li');
            var $setter2 = $setter.eq($setter.index($the_active_line,) + 1);
            window.location.href = $setter2.children('a').attr('href');
        }
    });

    // NOTE: This hides the PREV/NEXT buttons on the Site FAQ, Copyright Statement, ...Products, & Full Guides pages
    if ((document.location.href.indexOf('/copyright-statement') > 1) || (document.location.href.indexOf('/site-faq') > 1) || 
        (document.location.href.indexOf('/...products') > 1) || (document.location.href.indexOf('/full-guides') > 1)) {
        //I'm using the 'OR' operator here. I needed to group them, above, for them to work.
        // indexOf will return the position of the first occurence of this string in the url
        // or -1 it it's not there.
        $('#navButtonsAll').hide();
    }

    // NOTE: This hides the PREV button on the first page
    if (document.location.href.indexOf('/...products') > -1) {
        // indexOf will return the position of the first occurence of this string in the url
        // or -1 it it's not there.
        $('#prevButton').hide();
    }

    // NOTE: This hides the PREV/NEXT buttons if the calendar is present
    if (document.location.href.indexOf('/calendar') > -1) {
  	// if ($('#calendar').length) { // returns true if element is present  //Old Code that worked with Previous Calendar
        // show or hide another element
        $('#navButtonsAll').hide();
    }
}, 50);

/* ========================================================
TAKEN FROM CONFLUENCE-DEV ERROR VM TO REDIRECT ON 404 ERROR
=========================================================== */
/*** Updated to avoid navigating to error page ***/

if ((document.location.href.indexOf('platform-update-release-notes/') > -1) && (document.location.href.indexOf('platform-update-release-notes/...spotlight') == -1)) {
    // indexOf will return the position of the first occurence of this string in the url
    // or -1 it it's not there.
    $(document).on("click", "li.large-order-5 ul li a", function (e) {
        var loadVersion = $(this).text();  //Get the link text
        loadVersion = $.trim(loadVersion);  //Trim the link text
      		// Check if the URL contains " (latest)" - if so, remove it
      		if (~loadVersion.indexOf("latest")) {
      			loadVersion = loadVersion.slice(0, -" (latest)".length);
            }
        document.location.href = 'https://.../kb/' + loadVersion + '/-all-/.../platform-releases/platform-update-release-notes';
        return false;  //Avoid navigating anywhere else but to the HREF above
    });
}

/* ========================================
CREATES 'Expand All / Collapse All' BUTTONS
=========================================== */
$('#expandAll').click(function () {
    $('.expando').not('.ep-expanded').trigger('click');
    $('.expand-icon.aui-iconfont-chevron-right').trigger('click');
});

$('#collapseAll').click(function () {
    $('.expando.ep-expanded').trigger('click');
    $('.expand-icon.aui-iconfont-chevron-down').trigger('click');
});

/* ==================================
DISABLE LINKS IN THE JIRA MACRO TABLE
===================================== */
/* From https://stackoverflow.com/questions/31394771/jquery-addclass-to-element-based-on-href-content */
applyWhenElementExists("td.jira-macro-table-underline-pdfexport", function () {
    $('[href*="?src=confmacro"]').addClass('not-active');
}, 50);


/*=============================
Single- and Multi-Page Printing
=============================== */
/* SINGLE PAGE */
//--------------/
/* Add a Printer Icon and empty link and call it printTools  */
$("#content").before(`<div id=printTools><div id=printToolsFloat>&#128386;&nbsp;<a style='color: #943434;;' class='sharePage' href='mailto:?subject=Sharing A Page from ...Knowledge Base&body=Link to ...Knowledge Base:  ${url4share}'>Share</a>&emsp;🖶&nbsp;<a style='color: #943434;;' class='printPage' href='#'>Print</a>&nbsp;&nbsp;&nbsp;&nbsp;</div></div>`);
$("#printTools").hide().fadeIn(2000);  //Add a nice fade in for PrintTools

/* When Print Page link is clicked, open Chrome Print dialog- window.print */
// This is the regular code for single page print
$('a.printPage').click(function(){
	window.print();
});

/* MULTI PAGE */
/* Server Side - Uses a User Macro */
//---------------------------------//
if (document.getElementById("GuideForPrint")) {  // Use DIV with 'ID=GuideForPrint' to flag pages that should have a 'PDF Guide' link
  //How to get pageID: https://community.atlassian.com/t5/Answers-Developer-Questions/How-can-I-access-the-confluence-pageid-from-javascript/qaq-p/505559
	let pageID = AJS.params.pageId;
  	$("div#printToolsFloat").append(`🗐<a href='https://.../spaces/flyingpdf/pdfpageexport.action?pageId=${pageID}' style='margin-left: .2rem !important; color: grey;'>PDF </a>`);
}


/*==============================================
POPULATE PRODUCT DROPDOWNS ON UPDATE NOTES PAGES
================================================ */
if ($("#...products-dropdown").length) {	//Ensure the dropdown exists

    function filterTable(value) {  //Selecting an option from the dropdown calls this function

        //Show all rows that have the team abbreviation
        $(".confluenceTd:first-child").next(`td:contains(${value})`).each(function () {
            $(this).parent().show();
        });

        //Hide all rows that don't have the team abbreviation
        $(".confluenceTd:first-child").next(`:not(td:contains(${value}))`).each(function () {
            $(this).parent().hide();
        });
    }

    //Create array from the table 2nd column items
    const tableArray = $(".confluenceTd:first-child").next("td").map(function () {
        return $(this).text();
    });

    //Convert map to simple array to simple string
    const tableString = Array.from(tableArray).toString();

    //if the string has items then populate the dropdown
    if (tableString.includes('AO-')) { $('#products-dropdown').append("<option value='A-'>(AO)</option>") };
    if (tableString.includes('CE-')) { $('#products-dropdown').append("<option value='C-'>(CE)</option>") };
    if (tableString.includes('DA-')) { $('#products-dropdown').append("<option value='D-'>(DA)</option>") };
    if (tableString.includes('EA-')) { $('#products-dropdown').append("<option value='E-'>(EA)</option>") };
}


/* Minimize Breadcrumbs through Text Substitution */
$( ".breadcrumbs a, .breadcrumbs--active" ).each(function() {
  if (($(this).text().match('Knowledge Base')) && (!($(this).text().match('Welcome')))) {var newText = $(this).text().replace("Knowledge Base", "Home"); $(this).text(newText)}
  if ($(this).text().match('and')) {var newText = $(this).text().replace("and", "&"); $(this).text(newText)}
  if ($(this).text().match('Current: ')) {var newText = $(this).text().replace("Current: ", ""); $(this).text(newText)}
  if ($(this).text().match('User Guide')) {var newText = $(this).text().replace("User Guide", "Guide"); $(this).text(newText)}
  if ($(this).text().match('the')) {var newText = $(this).text().replace("the", ""); $(this).text(newText)}
});
