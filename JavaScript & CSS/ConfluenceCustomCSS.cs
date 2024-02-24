/* ===================
FRONT PAGE ADJUSTMENTS
====================== */
/* Set Font Size for Main Page Cards */
.space-overview__pinned__topic h3 {
    font-size: 18px;
}

/* Reduce Space Between the 2 Rows of Cards */
.space-overview__pinned__topic {
    margin-bottom: auto;
  	box-shadow: none;
}

/* Hide the Heading for the News Section */
.space-overview__content__heading {
    visibility: hidden;
}

.space-overview__hero__header__content {
      margin-bottom: 2em !important;
}

/* Hide Front Page Titles that appear over Background Image on Main Page */
body > main > div > div.grid-container.full.hc-header-background-color.hc-spaceHome-background-image > div > div > div > h1 {
  visibility: hidden;
}
body > main > div > div.grid-container.full.hc-header-background-color.hc-spaceHome-background-image > div > div > div > p {
  display: none;
}

/* Hide Front Page Arrows on Cards */
span.icon--read-more {
  visibility: hidden;  
}

/* Put a dashed border under the 'Markets' and 'Releases' dropdown menus and 'Provide Feedback', to highlight them for a while */
li.small-order-3.large-order-4.picker.picker--scroll.is-dropdown-submenu-parent.opens-left, 
li.small-order-4.large-order-5.picker.picker--scroll.is-dropdown-submenu-parent.opens-left 
/* a[aria-label="Provide Feedback"] */ {
  border-color: deepskyblue;
  border-bottom-style: groove;
}

/* Style Material Icons (Like One On Front Page) in PCI Color */
.material-icons {
  color: #B31E3B !important;
}

/* Create a top/bottom border on the news header on the front page */
.space-overview__pinned__topic {
  border-color: #EDF0F4;
}

/* Decrease Margin Space Below Front Page Main Content */
.space-overview__content {
    margin-bottom: .25px !important;
}

/* Remove white space above Front Page cards and above Front Page footer */
body > main > div > div.grid-container.space-overview > div.grid-x.grid-padding-x.space-overview__pinned > div > h2 {
  display:none;
}

.space-overview__content__heading {
    margin-bottom: 20px;
}

[pageid~="39337486"] .hc-footer-background-color {
    margin-top: auto;
}

/* ============================================
Resolve Running Over Left Nav on Scrolling Left
=============================================== */

.sticky.is-stuck {
  position: relative;
}

.sticky-container {
    position: sticky;
    top: 100px;
}

#js-desktop-pageTree > ul {
	margin-top: -100px;
}

/* Code to Increase Viewport Max Width */
.article {
  max-width: 1700px;
}

/* ==============
Code for Printing
=================
NEED TO PUT CONTENT FOR PRINT IN THE 'PRINTME DIV' USING A JQUERY (AJAX) LOAD LOOP OVER NAVTREE ITEMS
FROM: https://gist.github.com/andrewlimaza/490a69417d9fe2df3f668195a7661605
AJAX LOAD INTO DIV: https://www.tutorialrepublic.com/jquery-tutorial/jquery-ajax-load.php
EMULATE PRINT IN DEVTOOLS: https://stackoverflow.com/questions/9540990/using-chromes-element-inspector-in-print-preview-mode/29962072#29962072
HELPFUL: https://stackoverflow.com/questions/7301989/need-to-remove-href-values-when-printing-in-chrome
https://stackoverflow.com/questions/21819905/jquery-ajax-calls-in-for-loop?noredirect=1&lq=1
Interesting: https://www.youtube.com/watch?v=82hnvUYY6QA
 */

@media print {    
	/* When printing, hide the navigation, top bar, TOC, print icon, and PrevNext buttons */
  	.article__navigation, .article__content__navigation, .top-bar, #printTools, #prevButton, #nextButton, #navButtonsAll, .js-tocBot {
		display: none !important;
  	}
  
  	/* For multi-page printing, display all the content collected in the PrintMe DIV */
	.printme  {
		display: block !important;
	}
  
  	/* Hide HREF's appearing after all Hyperlinks */
    a[href]:after, img:after {
      	display: none !important;
      	visibility: hidden !important;
  	}
  
  	/* Pages are scrunched into small column without this */
  	.grid-x>.medium-auto {
    	flex: auto !important;
  	}
  
  	/* Stop text from breaking across pages	
  	From https://stackoverflow.com/questions/907680/css-printing-avoiding-cut-in-half-divs-between-pages
  	https://stackoverflow.com/questions/30765294/how-to-stop-the-html-css-from-splitting-a-line-of-text-in-half-between-pages-for */
  	div.output-block, .included-child-page-title {
  		break-inside: avoid !important;
	}
  
  	/* Stop table text from running off the page (it's like using Word Wrap) & make table text a wee bit smaller
  	From https://stackoverflow.com/questions/1258416/word-wrap-in-an-html-table */
  	table td {
    	word-break: break-word !important;
      	font-size: small !important;
  	}
  
  	table * {
    	font-size: small !important;
	}
}
  
/* Hide the printme div when simply viewing page. This is a regular style outside the @media css rule. */
.printme {
	display: none;
}


/* =======================================================================
For Multi-Page Print- To Enable Viewing Loaded Subpages- Make this visible
 ========================================================================= */
.js-hide-until-loaded {
    visibility: visible !important;
}


/* ================================================================
Code to remove specific cards from the Help Center Theme front page
 ================================================================== */

[title~=Scheduling].cell.medium-4.tile.tile--topics {display: none;}

[title~=Accounting].cell.medium-4.tile.tile--topics {display: none;}

[title~=Automation].cell.medium-4.tile.tile--topics {display: none;}

[title~=Trading].cell.medium-4.tile.tile--topics {display: none;}

[title~=Training].cell.medium-4.tile.tile--topics {display: none;}

[title~=Configuration].cell.medium-4.tile.tile--topics {display: none;}

[title~=Multimedia].cell.medium-4.tile.tile--topics {display: none;}

[title~=Cumulative].cell.medium-4.tile.tile--topics {display: none;}

[title~=Welcome].cell.medium-4.tile.tile--topics {display: none;}

[title~=Hosted].cell.medium-4.tile.tile--topics {display: none;}


/* ===========================================
CODE TO ADD VERTICAL NAV BAR SCROLLBAR BACK IN
 ============================================= */
.scroll-y::-webkit-scrollbar-thumb {
    background-color: lightgray;
  	border-radius: 10px;
    background-clip: content-box;
  	border: 3px solid transparent;
}


/* ===============
STYLE THE VIEWPORT 
 ================= */

/* Use a gradient for the header and footer background color */
/* Start by using transparent color on styles that shouldn't appear. The '.is-transition-overlap' style is for mobile, which shouldn't be transparent. */ 
.top-bar, .top-bar ul, .hc-header-background-color {
  background-color: #ffffff00 !important;
}

.header__navigation, .is-transition-overlap, .hc-footer-background-color {
    background-image: linear-gradient(to top left, #a63326 0%, #641e16 100%);
}


/* =============================
STYLE PREV/NEXT BUTTONS ON PAGES
================================ */
.prevNext {
  background-color: transparent;
  border: none;
  border-radius: 12px;
  color: #943434;
  padding: 3px 3px;
  text-align: center;
  text-decoration: underline overline;
  display: inline-block;
  font-size: 12px;
  font-style: italic;
  font-weight: bold;
  margin: 2px 2px;
  margin-bottom:20px;  /* This creates some white space below the buttons. */
  cursor: pointer;
  transition-duration: 0.4s;  /* This determines the speed of the HOVER effect. */
  z-index: 49;  /* This solves buttons being covered by elements below them, making them unclickable. */
}

.prevNext:hover {
  color: coral;
}

.top-bar {
  z-index: 50;  /* Without this, the PREV/NEXT buttons will float over the Scroll Viewport top header bar */
}


/* ===========================================
STYLE EXPANDO H6 HEADING LIKE EXPAND HEADING
============================================== */
.ep-arrow:before {
  content:  "\2713 ";
}

.ep-arrow {
  display:none !important;
}

.article__content__content h6, .article__content__content h6 * {
  font-size: 16px !important;
  color: #0052cc;
  font-family: "roboto-regular",Helvetica,Roboto,Arial,sans-serif;
}

.article__content__content h6, .article__content__content h6 *:before {
	content: "\003E    ";
}


/* =================================================
STYLE 'ExpandAll' and 'CollapseAll' BUTTONS ON PAGES
==================================================== */
#expandAll, #collapseAll {
	background-color:transparent;
	display:inline-block;
	cursor:pointer;
	color:#943434;
	font-family:Verdana;
	font-size:12px;
	font-weight:bold;
	font-style:italic;
	padding:0px 10px;
	text-decoration:underline;
}

#expandAll:hover, #collapseAll:hover {
  color: dimGray;
  text-decoration:overline;
}


/* ===========================================
STYLE TO DISABLE LINKS IN THE JIRA MACRO TABLE
 ============================================= */
/* From https://stackoverflow.com/questions/2091168/how-to-disable-a-link-using-only-css */
.not-active {
  pointer-events: none;
  cursor: default;
  text-decoration: none !important;
  color: black !important;
}

/* =================================================
STYLE PRINT TOOLS AND PRINTER ICON FOR PAGE PRINTING
 =================================================== */
#printTools {
  flex: auto;
  z-index: 1;
}

#printToolsFloat {
  float:right;
}

#firstToClickSubpages {
  display: inline;
  font-style: italic;
}

/* ============
ADDITIONAL CODE 
 ============== */
/* Remove the bullets from tab names on multi-tab tables */
.menu-item {
  list-style-type: none !important;
}

/* This styles bullets, from https://community.atlassian.com/t5/Confluence-discussions/Different-bullet-for-multi-level-bullet-list-nested-bullet-list/td-p/1434930 */
.wiki-content ul li { list-style: disc; }
.wiki-content ul li li { list-style: circle; }
.wiki-content ul li li li { list-style: square; }
.wiki-content ul li li li li { list-style: disc; }
.wiki-content ul li li li li li { list-style: circle; }
.wiki-content ul li li li li li li { list-style: square; }

/* BEGIN CSS FOR CAROUSEL */
.carouselbox {
      font-family: helvetica,sans-serif;
      font-size: 14px;
      width: 336px;
      position: relative;
      margin: 1em;
      border: 1px solid #ccc;
      box-shadow: 2px 2px 10px #ccc;
      overflow: hidden;
  	  top: -15px;
    }
.carouselbox ol {
  height: inherit;
}
    .content {
      margin: 0;
      padding: 0;
    }
    .content li {
      font-size: 100px;
      margin: 0;
      padding: 0;
      width: 100%;
      list-style: none;
      text-align: center;
      z-index: 2;
    }
    .active {
      height: 134px;
    }
    .carouselbox button {
      border: none;
      visibility: hidden;
    }
    .active button {
      visibility: visible;
		position: absolute //BROCK ADD
		height: 100%  //BROCK ADD
    } 
    .offscreen {
      position: absolute;
      left: -2000px;
    }
    .active .buttons {
      padding: 5px 0;
      text-align: center;
      z-index: 10;
      position: absolute; /*BROCK CHANGE TO ABSOLUTE */
	  height: 5%; /* BROCK ADD */
    }
    .active li {
      position: absolute;
      top: 20px;
      opacity: 0;
      transform: scale(0);
      transition: 1s;
    }
    .active li.current {
      top: -13px;
      opacity: 1;
      transform: scale(1);
      transition: 1s;
    }
    .li img {
      width: 200px;
      height: 200px;
      display: block;
    }

	/* BROCK ADD */
	button.next, button.prev {
		color: aliceblue;
	}
	div.buttons {
		background: transparent;
    	width: inherit;
    	font-size: xx-large;
	}
	div.carouselbox a span {
    	position: absolute;
    	top: 72%;
    	right: 17%;
    	width: 70%;
    	height: 2em;
    	color: #f90;
    	background-color: rgba(0,0,0,0.5);
      	font-size: large;
        font-variant: petite-caps;
	}

/* END CSS FOR CAROUSEL */

/* Are the next 2 styles still needed for the main product page iFrames?
.iframe-wrapper {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 
    padding-top: 25px;
    height: 0;
}
.iframe-wrapper iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
} */
