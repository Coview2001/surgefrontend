
import React, { useState, useMemo } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import './TableComponent.css'

// Ensure you have Bootstrap CSS imported in your project
// import 'bootstrap/dist/css/bootstrap.min.css';

const AccordionItem = ({ tag, definition, syntax }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="card mb-3 shadow-sm hover-card">
      <div className={`card-header text-white transition`} style={{backgroundColor:`${isOpen ? '#bb92ee' : '#a168e4'}` }}>
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          style={{textDecoration:'none'}}
          className="btn btn-link text-white w-100 text-left d-flex justify-content-between align-items-center"
        >
          <span className="tag-name">{tag}</span>
          <span className={`toggle-icon ${isOpen ? 'rotate' : ''}`}>▼</span>
        </button>
      </div>
      {isOpen && (
        <div className="card-body">
          <h5 className="card-title">Definition:</h5>
          <p className="card-text">{definition}</p>
          <h5 className="card-title mt-3">Syntax:</h5>
          <pre className="bg-light p-3 rounded"><code>{syntax}</code></pre>
        </div>
      )}
    </div>
  );
};

const CSSComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const data = React.useMemo(() => [
    {
        "Tags": "margin",
        "Definition": "In order to provide space around elements outside of any specified borders, margins are used. Setting the margin-top, margin-right, margin-bottom and margin-left attributes is done with the help of the shorthand known as the margin property. ",
        "Syntax": "margin: 10px;\nA single value entered for the margin attribute affects the element's four sides.\nmargin: 10px 20px;\nWhen you give the margin property two values, the top and bottom margins are affected by the first value, and the left and right margins are affected by the second value.\nmargin: 10px 20px 30px;\nThree values are entered, the top margin uses the first value, the left and right margins uses the second value, and the bottom margin uses the third value.\nmargin: 10px 20px 30px 40px;\nThe top, right, bottom and left margins are affected by the four values you provide in that order.\n"
    },
    {
        "Tags": "font-family",
        "Definition": "A list of possible fallback font names can be included in the font-family attribute, which also provides the typeface for an element. The next font in the list will be tried if the browser does not support the first one.",
        "Syntax": "font-family: \"Times New Roman\", serif;\nThe browser will attempt to use \"Times New Roman\" in this case initially. It will use any accessible serif font in place of \"Times New Roman\" if it is not available."
    },
    {
        "Tags": "background-color",
        "Definition": "An element's background color can be set in CSS using the background-color attribute. RGB, HEX, HSL, RGBA and HSLA values, as well as defined color names are used to specify background color.",
        "Syntax": "background-color: teal;\nbackground-color: #ff4500;\nbackground-color: rgb(70, 130, 180);\nbackground-color: rgba(255, 165, 0, 0.6); \nbackground-color: hsl(340, 70%, 50%);\nbackground-color: hsla(210, 100%, 50%, 0.4); "
    },
    {
        "Tags": "padding",
        "Definition": "In order to provide space around elements inside of any specified borders, paddings are used. Setting the padding-top, padding-right, padding-bottom and padding-left attributes is done with the help of the shorthand known as the padding property. ",
        "Syntax": "padding: 10px;\nA single value entered for the padding attribute affects the element's four sides.\npadding: 10px 20px;\nWhen you give the padding property two values, the top and bottom paddings are affected by the first value, and the left and right paddings are affected by the second value.\npadding: 10px 20px 30px;\nThree values are entered, the top padding uses the first value, the left and right paddings uses the second value, and the bottom padding uses the third value.\npadding: 10px 20px 30px 40px;\nThe top, right, bottom and left paddings are affected by the four values you provide in that order.\n"
    },
    {
        "Tags": "display",
        "Definition": "When it comes to CSS, the display property controls how an element appears on a page.\n\nblock: The element occupies the entire available width (e.g., div>) and begins on a new line.\ninline: The element, such as span>, moves within the text line and only takes up the space that it requires...\ninline-block: The element has set height and width, but flows inline (e.g., buttons within text).\nnone: The element occupies no space and is not displayed.\nflex: The element transforms into a flex container, putting its child elements in a movable arrangement.\ngrid: The element turns into a container for a grid, enabling a layout consisting of rows and columns.\n",
        "Syntax": "display: block;\ndisplay: inline;\ndisplay: inline-block;\ndisplay: none;\ndisplay: flex;\ndisplay: grid;"
    },
    {
        "Tags": "justify-content",
        "Definition": "When elements in a flexible container do not occupy all of the available space on the main-axis (horizontally), the justify-content property aligns the items.",  
        "Syntax": "justify-content: flex-start\nflex-start: Aligns items to the start of the container.\njustify-content: flex-end\nflex-end: Aligns items to the end of the container.\njustify-content: center\ncenter: Centers items within the container.\njustify-content: space-between\nspace-between: Distributes items evenly with space between them but not at the edges.\njustify-content: space-around\nspace-around: Distributes items with equal space around them including the edges.\njustify-content: space-evenly\nspace-evenly: Distributes items with equal space between them including before the first item and after the last item."
    },
    {
        "Tags": "align-items",
        "Definition": "The default alignment of items inside a flexbox or grid container is specified by the align-items attribute.\nflex-start: Aligns items at the top (or start) of the container.\nflex-end: Aligns items at the bottom (or end) of the container.\ncenter: Centers items vertically .\nbaseline: Aligns items along their text baselines.\nstretch: Stretches items to fill the container vertically (default).",
        "Syntax": "align-items : flex-start;\nalign-items : flex-end;\nalign-items : center;\nalign-items : baseline;\nalign-items : stretch;"
    },
    {
        "Tags": "color",
        "Definition": "RGB, HEX, HSL, RGBA and HSLA values, as well as defined color names are used to specify colors.",
        "Syntax": "color: teal;\ncolor: #ff4500;\ncolor: rgb(70, 130, 180);\ncolor: rgba(255, 165, 0, 0.6); \ncolor: hsl(340, 70%, 50%);\ncolor: hsla(210, 100%, 50%, 0.4); "
    },
    {
        "Tags": "font-size",
        "Definition": "The CSS font-size attribute determines what size the text is inside an element.\nAbsolute Units:\n1. px (pixels): Defines the text size in pixels.\n2. pt (points): Defines the text size in points (1 point = 1/72 inch).\nRelative Units:\n1. em: Defines the text size relative to the font size of the parent element. For example, 1.5em means 150% of the parent s font size.\n2. rem: Defines the text size relative to the root (html) element s font size. For example, 1.5rem means 150% of the root font size.\nPercentage:\n1. %: Defines the text size as a percentage of the parent element s font size. For example 110% means 110% of the parent s font size.\nKeywords:\n1. small: Smaller than the default size.\n2. medium: Default size (usually 16px).\n3. large: Larger than the default size. \nx-large, xx-large, etc.: Even larger sizes.",
        "Syntax": "font-size: 16px;\nfont-size: 12pt;\nfont-size: 1.5em;\nfont-size: 1.5rem;\nfont-size: 120%;\nfont-size: large;"
    },
    {
        "Tags": "font-weight",
        "Definition": "The thickness or boldness of text in CSS is specified by the font-weight attribute.\nnormal: Indicates the character font weight that is used by default.\nbold: Makes the font thicker and bold.\nbolder: Produces characters that are thicker than the parent element's font weight.\nlighter: Produces characters with a font weight that is smaller than the parent element's.\nFont weights are defined from thin to thick between 100 and 900. \ninitial: Returns the attribute to its initial setting. \ninherit: Takes on the parent element's font weight value.\n",
        "Syntax": "font-weight : normal;\nfont-weight : bold;\nfont-weight : bolder;\nfont-weight : lighter;\nfont-weight : initial;\nfont-weight : inherit;\nfont-weight : 500;"        
    },
    {
        "Tags": "list-style",
        "Definition": "The properties listed below can be shortened to the list-style property:\nlist-style-position \nlist-style-image \nlist-style-type",
        "Syntax": "list-style: none;"
    },
    {
        "Tags": "gap",
        "Definition": "The CSS gap property is utilised to regulate the distance between elements within a flex or grid container. It indicates the distance in a grid arrangement between flex elements or rows and columns.\n10px: Establishes a consistent 10-pixel space between each item.\n10px 20px: 10 px between rows and 20px between columns are set .\nauto: This option enables the browser to calculate the gap size automatically in accordance with the required layout and available space.\n\n",
        "Syntax": "gap: 10px;\ngap: 10px 20px;\ngap: auto;"
    },
    {
        "Tags": "text-decoration",
        "Definition": "Text decorations, such strikethroughs, underlines, overlines, and none at all, can be applied to text using the text-decoration property in CSS.",
        "Syntax": "text-decoration: none;\ntext-decoration: underline;\ntext-decoration: overline;\ntext-decoration: line-through;\ntext-decoration: underline overline;\ntext-decoration: inherit;\ntext-decoration: initial;\ntext-decoration: unset;"
    },
    {
        "Tags": "height",
        "Definition": "An element's height in CSS is specified by its height property.\nauto: Modifies height according to content.\nlength: Fixed height expressed in em, px, or other units.\n%: Height in relation to the height of the parent element.\nvh: height in relation to the viewport height \ninitial: Resets to the starting value.\nunset: Resets depending on context, to its natural value.\n",
        "Syntax": "height: auto;\nheight: 100px;\nheight: 10em;\nheight: 50%;\nheight: 50vh;\nheight: unset;\nheight: initial;"
    },
    {
        "Tags": "max-width",
        "Definition": "An element's maximum width in CSS is specified by its max-width property.\nauto: Allows the width to expand up to the specified maximum, but not beyond it adjusting according to content and available space.\nlength: Sets a fixed maximum width using units like em, px, or other measurements.\n%: Defines the maximum width as a percentage of the width of the parent element.\nvw: Sets the maximum width relative to the viewport width, where 1vw equals 1% of the viewport width.\nnone: No maximum width constraint is applied, allowing the element to grow indefinitely based on its content and container.\ninitial: Resets the max-width property to its default value, which is typically none.\nunset: Resets the max-width property to its natural value based on the element's context, which often defaults to none if not otherwise specified.",
        "Syntax": "max-width: auto;\nmax-width: 100px;\nmax-width: 10em;\nmax-width: 50%;\nmax-width: 50vw;\nmax-width: unset;\nmax-width: initial;"
    },
    {
        "Tags": "width",
        "Definition": "An element's width in CSS is specified by its width property.\nauto: Modifies width according to the content and available space.\nlength: Fixed width expressed in units like em, px, or other measurements.\n%: Width in relation to the width of the parent element.\nvw: Width in relation to the viewport width (1vw is 1% of the viewport width).\ninitial: Resets to the default value for the property.\nunset: Resets depending on context, to its natural value based on the element's context.\n",
        "Syntax": "width: auto;\nwidth: 100px;\nwidth: 10em;\nwidth: 50%;\nwidth: 50vw;\nwidth: unset;\nwidth: initial;"
    },
    {
        "Tags": "border-radius",
        "Definition": "The border-radius property of an element in CSS determines its border radius.\n<length>: specifies the element's corner radius in fixed units like pixels, em, rem, etc.\n<percentage>: Provides responsive and proportionate rounding by defining the radius as a percentage of the element's width or height.\n<length> <length>: Creates elliptical corners by setting unique radius for the horizontal and vertical corners.\n<length> <length> <length> <length>: Indicates the specific radii for each corner in the following order: bottom-left, bottom-right, top-left, top-right.\ninitial: Produces sharp corners by setting the border-radius parameter back to its default value of 0.\ninherit: The parent element's border-radius value is inherited.\nunset: the border-radius property is reset to its initial value .",
        "Syntax": "border-radius: 10px;\nborder-radius: 50%;\nborder-radius: 20px 10px;\nborder-radius: 10px 20px 30px 40px;\nborder-radius: initial;\nborder-radius: inherit;\nborder-radius: unset;"
    },
    {
        "Tags": "box-shadow",
        "Definition": "Elements can have shadow effects added to them using CSS's box-shadow property, which improves their appearance.",
        "Syntax": "box-shadow: 10px 15px 5px 10px rgba(0, 0, 0, 0.5);\n10px: This value moves the shadow 15 pixels to the right of the element.\n15px: This value moves the shadow 20 pixels down from the element.\n5px: The shadow is blurred with a 25-pixel radius.\n10px: Expands the shadow by 10 pixels.\nrgba(0, 0, 0, 0.5): The shadow color is determined here.\nbox-shadow: inset -10px -5px 20px rgba(0, 0, 0, 0.3);\ninset : Specifies the shadow should appear inside the element.\n-10px : Moves the shadow 10 pixels to the left inside the element.\n-5px : Moves the shadow 5 pixels up inside the element.\n20px : The shadow inside the element is blurred with 20-pixel radius.\nrgba(0, 0, 0, 0.3) : The color of the shadow."
    },
    {
        "Tags": "overflow",
        "Definition": "Content that is too large to fit into a space is managed by the CSS overflow property.\nvisible: The content can be seen beyond the container.\nhidden: The content is enclosed in a container and is not viewable outside of it.\nscroll: Regardless of overflow, scrollbars are always displayed.\nauto: Scrollbars only show up when there is too much content.\n",
        "Syntax": "overflow: auto;\noverflow: visible;\noverflow: hidden;\noverflow: scroll;"
    },
    {
        "Tags": "flex",
        "Definition": "A shortcut for the following properties is the flex property: \nflex-grow \nflex-shrink\nflex-basis.\nOn flexible items, the flexible length is set by the flex property.",
        "Syntax": "flex: 100%;\nflex: auto;\nflex: initial;\nflex: inherit;\nflex: 1 0 auto;"
    },
    {
        "Tags": "text-align",
        "Definition": "The CSS text-align property controls the text alignment within block-level elements. Text can be aligned to the left, right, or centre, depending on which value is used. \n",
        "Syntax": "text-align: left;\ntext-align: right;\ntext-align: center;\ntext-align: justify;\ntext-align: initial;\ntext-align: inherit;"
    },
    {
        "Tags": "grid-template-columns",
        "Definition": "The number and size of columns in a grid layout can be set using the grid-template-columns property in CSS.\nColumns are given a defined size by fixed units like 100px.\nVariable measurements such as 1fr proportionally split the available area.\nSeveral columns of the same size are made simpler with repeat().\nA variety of sizes are offered by minmax() for responsive designs.\nFit-content() sets a maximum width for columns and modifies them based on content.\n",
        "Syntax": "grid-template-columns: 100px 2fr;\ngrid-template-columns: repeat(3, 1fr);\ngrid-template-columns: minmax(150px, 1fr) 2fr;\ngrid-template-columns: fit-content(200px) 1fr;"
    },
    {
        "Tags": "border",
        "Definition": "In CSS, the border property is a shortcut that defines the border around an element. It is simple to set all three characteristics of a border at once because it combines the border width, border style, and border color attributes into a single declaration.\n",
        "Syntax": "border: 1px solid black;"
    },
    {
        "Tags": "line-height",
        "Definition": "Text line spacing is determined by the line-height attribute. The default spacing can be adjusted to normal, the fixed spacing to length, the percentage related to the font size, or a quantity multiplied by the font size. The visual design of text blocks is enhanced and text readability is improved when line-height is used appropriately.",      
        "Syntax": "line-height: normal;\nline-height: 1.5em;\nline-height: 1.8;\nline-height: 120%;"
    },
    {
        "Tags": "margin-right",
        "Definition": "The margin-right attribute gives you the ability to adjust how much space an element has on its right side. It takes fixed units such as pixels, percentage values in relation to the width of the container, and auto for spacing adjustments that happen automatically.\n",
        "Syntax": "margin-right: 20px;\nmargin-right: 10%;\nmargin-right: auto;\n"
    },
    {
        "Tags": "cursor",
        "Definition": "The sort of cursor that appears when a user hovers over an element in CSS is determined by the cursor property.\nauto: The browser selects the suitable pointer.\ndefault: Shows the typical arrow cursor.\npointer: Displays the cursor of a hand.\ntext: Offers a text selection tool with an I-beam cursor.\nwait: Signals to the user to hold off.\ncrosshair: For operations requiring precision, displays a crosshair cursor.\nmove: Shows that moving the element is possible.\nnot-allowed: Displays a diagonal line and circular cursor.\nhelp: Shows a pointer to indicate the presence of help.\nzoom-in: Displays a plus symbol next to a magnifying glass.\nzoom-out: Shows a minus sign next to a magnifying glass.\ngrab: Shows a hand with fingers spread slightly.\ngrabbing: Denotes the act of grabbing the element.",
        "Syntax": "cursor: auto;\ncursor: default;\ncursor: zoom-in;\ncursor: pointer;\ncursor: wait;\ncursor: not-allowed;\ncursor: grabbing;\ncursor: grab;"
    },
    {
        "Tags": "margin-bottom",
        "Definition": "To set the margin at the bottom of an element in CSS use the margin-bottom property.",
        "Syntax": "margin-bottom: auto;\nBottom margin is automatically defined by the browser.\nmargin-bottom: initial; \nSets the bottom margin to default value which is 0\nmargin-bottom: inherited;\nInherits bottom margin from parent \nmargin-bottom: 30px;\nSets the bottom margin to 30px\n\n\n\n\n\n"
    },
    {
        "Tags": "box-sizing",
        "Definition": "In CSS, the box-sizing property specifies how an element's overall width and height are determined.",
        "Syntax": "box-sizing: content-box;\nbox-sizing: border-box;\nbox-sizing: initial;\nbox-sizing: inherit;\n"
    },
    {
        "Tags": "resize",
        "Definition": "In CSS, the resize property is used to manage an element's resizable nature. By moving the borders or corners of an element, users can change its size.",
        "Syntax": "resize: none;\nThe value none disables the resizing\nresize: both; \nThe value both allows resizing in both directions\nresize: horizontal;\nThe value horizontal allows resizing in horizontal direction only.\nresize: vertical;\nThe value vertical allows resizing in vertical direction only.\n\n"
    },
    {
        "Tags": "border-top",
        "Definition": "Defining all top border property in a single declaration is possible with the border-top shorthand property.\nThe values have to be entered in the following order:\nborder-top-width\nborder-top-style (this is necessary)\nborder-top-color",
        "Syntax": "border-top: 2px solid black;\nborder-top: 1px dotted red;\nborder-top: double;"
    },
    {
        "Tags": "font-style",
        "Definition": "The font style of a text is specified via the font-style property.",
        "Syntax": "font-style: normal;\nfont-style: italic;\nfont-style: oblique;"
    },
    {
        "Tags": "margin-top",
        "Definition": "An element's top margin is determined by its margin-top property.",
        "Syntax": "margin-top: 20px;"
    },
    {
        "Tags": "border-bottom",
        "Definition": "The shortened form for the border-bottom property is that it arranges the following:\nborder-bottom-width\nborder-bottom-style\nborder-bottom-color\nThe text color will be used by default if the border-bottom-color is left out.\n",
        "Syntax": "border-bottom: 5px solid red;\n"
    },
    {
        "Tags": "border-left",
        "Definition": "In the following order, the border-left attribute is a shorthand for:\nborder-left-width\nborder-left-style (needed)\nborder-left-color\nThe color applied will match the text color if border-left-color is not specified.\n\n",
        "Syntax": "border-left: 5px solid black;\nborder-left: 2px dotted red;\nborder-left: double;"
    },
    {
        "Tags": "flex-direction",
        "Definition": "The direction in which flex items are positioned within the flex container is specified by the CSS flex-direction property. For flex-direction to work, the display property needs to be set to flex.",
        "Syntax": "flex-direction: row;\nThe value row aligns the items horizontally from left to right.\nflex-direction: row-reverse;\nThe value row-reverse aligns the items horizontally from right to left.\nflex-direction: column;\nThe value column aligns the items vertically from top to bottom.\nflex-direction: column-reverse;\nThe value column-reverse aligns the items vertically from bottom to top . \n"
    },
    {
        "Tags": "flex-wrap",
        "Definition": "When there isn't enough space in the flex container, the flex-wrap property in CSS determines whether flex elements should wrap onto additional lines. For flex-wrap to work, the display property needs to be set to flex.\n",
        "Syntax": "flex-wrap: nowrap;\nThe default value of flex-wrap is nowrap. Flex elements will be arranged in a single line rather than wrapping. The items will expand or contract to fit inside the container if it is overfilled.\nflex-wrap: wrap;\nDepending on the flex-direction property, flex elements will wrap onto multiple lines from top to bottom (or left to right). \nflex-wrap: wrap-reverse;\nFlex items will wrap but in the opposite way onto multiple lines. "
    },
    {
        "Tags": "position",
        "Definition": "In CSS, an element's placement within its containing block can be managed using the position property.\nstatic: Each element is positioned in accordance with its default location.\nrelative: Structured with respect to its usual orientation shifted to the left, right, bottom and top.\nabsolute: Orientated with respect to the first contained block or its closest parent element offset to the left, right, bottom and top.\nfixed: Structured with relation to the viewport remains stationary during scrolling displaced to the left, right, and bottom.\nsticky: Depending on the scroll position, it alternates between fixed and relative location it is offset with the top, right, bottom and left.\n",
        "Syntax": "position: static;\nposition: relative;\nposition: absolute;\nposition: fixed;\nposition: sticky;"
    },
    {
        "Tags": "bottom",
        "Definition": "The vertical offset of an element from the bottom edge of its containing block is specified by the bottom property in CSS.\nIt can be set using auto or length values (px, %).",
        "Syntax": "bottom : 20px; \nbottom : 10%; \nbottom : auto;\nThe value auto defines that there should be no offset from the bottom edge"
    },
    {
        "Tags": "aspect-ratio",
        "Definition": "The ratio of an element's width to height is defined by its property aspect-ratio. If you specify the width and aspect ratios the height will automatically adapt to the specified aspect ratio.",
        "Syntax": "aspect-ratio: 4 / 3;\naspect-ratio: none;\naspect-ratio: initial;\naspect-ratio: inherit;"
    },
    {
        "Tags": "left",
        "Definition": "The horizontal offset of an element from the left edge of its containing block is specified by the left property in CSS.\nIt can be set using auto or length values (px, %).\n",
        "Syntax": "left: 20px; \nleft: 10%; \nleft: auto;\nThe value auto defines that there should be no offset from the left edge"
    },
    {
        "Tags": "right",
        "Definition": "The horizontal offset of an element from the right edge of its containing block is specified by the right property in CSS.\nIt can be set using auto or length values (px, %).",
        "Syntax": "right : 20px; \nright : 10%; \nright : auto;\nThe value auto defines that there should be no offset from the right edge"
    },
    {
        "Tags": "top",
        "Definition": "The vertical offset of an element from the top edge of its containing block is specified by the top property in CSS.\nIt can be set using auto or length values (px, %).",
        "Syntax": "top : 20px; \ntop : 10%; \ntop : auto;\nThe value auto defines that there should be no offset from the top edge"
    },
    {
        "Tags": "background",
        "Definition": "background property is shorthand for setting multiple background-related properties.\nIt can include:\nbackground-color: Color of the background.\nbackground-image: One or more background images.\nbackground-position: Position of the background images.\nbackground-size: Size of the background images.\nbackground-repeat: Repetition behavior of the background images.\nbackground-attachment: Scrolling behavior of the background images.",
        "Syntax": "Syntax: background: background-color background-image background-position background-size background-repeat background-attachment;\nbackground: blue url(\"image url\") no-repeat fixed center;"
    },
    {
        "Tags": "margin-left",
        "Definition": "An element's left margin is determined by its margin-left property.",
        "Syntax": "margin-left : 20px;"
    },
    {
        "Tags": "content",
        "Definition": "Using ::before or ::after pseudo-elements, the content attribute inserts created elements before or after an element.\nValues:\nString: Text is added.\nURL: Adds a picture in.\nCounter: Adds a value as a counter.\nAttr(): Inserts an attribute's value.\nEmpty String: No content.\nNone: Makes it clear that no content should be added.\n",
        "Syntax": "a::after {\n  content: \" (\" attr(href) \")\";\n}\nIn the above example we are adding a atrribute href to the <a> tag."
    },
    {
        "Tags": "transform",
        "Definition": "An element can be transformed in two or three dimensions using the transform attribute. You can move, scale, skew, and rotate elements with this property.\n",    
        "Syntax": "transform: skew(20deg, 10deg);\ntransform: skewY(10deg);\ntransform: rotate(45deg);\ntransform: scaleX(1.5);"
    },
    {
        "Tags": "border-right",
        "Definition": "Defining all right border property in a single declaration is possible with the border-right shorthand property.\nThe values have to be entered in the following order:\nborder-right-width\nborder-right-style (this is necessary)\nborder-right-color",
        "Syntax": "border-right : 2px solid black;\nborder-right : 1px dotted red;\nborder-right : double;"
    },
    {
        "Tags": "text-shadow",
        "Definition": "Text can be given shadow by using the text-shadow property.",
        "Syntax": "text-shadow: 2px 4px 8px #FF0000;\nhorizontal offset set to 2px,vertical offset set to 4px, blur radius set to 8px and color set to color."
    },
    {
        "Tags": "perspective",
        "Definition": "A 3D-positioned element can be given perspective by using the perspective property.",
        "Syntax": "perspective: 100px;"
    },
    {
        "Tags": "backface-visibility",
        "Definition": "Whether or not an element's back face should be visible when facing the user is determined by the backface-visibility property.",
        "Syntax": "backface-visibility: hidden;\nbackface-visibility: visible;\n"
    },
    {
        "Tags": "transition",
        "Definition": "With CSS transitions, you can seamlessly alter a property's value over a specified period of time.",
        "Syntax": "transition: width 2s, height 4s;\ntransition: width 2s;"
    },
    {
        "Tags": "list-style-type",
        "Definition": "In a list, the list-style-type defines the kind of list-item marker.",
        "Syntax": "list-style-type: none;\n"
    }
], []);

  const filteredData = data.filter((row) =>
    row.Tags.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-3">
      <div className="row justify-content-center mb-3">
        <div className="col-md-6">
          <div className="input-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Search for CSS Properties..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
      </div>
      <div className="text-center mb-3">
          <span className="lead">Discover and learn about CSS Properties with our interactive reference guide.</span>
        </div>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {currentItems.length > 0 ? (
            currentItems.map((item, index) => (
            <AccordionItem
            key={index}
            tag={<span className="tag-no-underline">{item.Tags}</span>}
            definition={item.Definition}
            syntax={item.Syntax}
            />
            ))
          ) : (
            <div className='text-center'>
              No matching tags found. Try a different search term.
            </div>
          )}
        </div>
      </div>
      {filteredData.length > itemsPerPage && (
        <div className="row mt-4">
          <div className="col-md-8 offset-md-2">
            <nav>
              <ul className="pagination justify-content-center" style={{textDecoration:'none'}}>
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button className="page-link" style={{ color: '#8a48d5'}}  onClick={() => paginate(currentPage - 1)}>
                    <ChevronLeft size={18} />
                  </button>
                </li>
                {[...Array(pageCount).keys()].map((number) => (
                    <li key={number + 1} className={`page-item ${currentPage === number + 1 ? 'active' : ''}`}>
                        <button 
                        className="page-link" 
                        style={{ backgroundColor: currentPage === number + 1 ? '#8a48d5' : '', color: currentPage === number + 1 ? '' : '#8a48d5', textDecoration:'none'}} 
                        onClick={() => paginate(number + 1)}
                        >
                        {number + 1}
                        </button>
                    </li>
                    ))}
                    <li className={`page-item ${currentPage === pageCount ? 'disabled' : ''}`}>
                    <button 
                        className="page-link" 
                        style={{ color: '#8a48d5'}} 
                        onClick={() => paginate(currentPage + 1)}
                    >
                        <ChevronRight size={18} />
                    </button>
                    </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
      {/* {filteredData.length > itemsPerPage && (
  <div className="row mt-4">
    <div className="col-md-8 offset-md-2">
      <nav>
        <ul className="pagination justify-content-center" style={{ textDecoration: 'none' }}>
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" style={{ color: '#8a48d5' }} onClick={() => paginate(currentPage - 1)}>
              <ChevronLeft size={18} />
            </button>
          </li>
          {[...Array(pageCount).keys()].map((number) => {
            // Logic to display dots
            if (number + 1 === currentPage - 1 || number + 1 === currentPage + 1 || (number + 1 === 1) || (number + 1 === pageCount)) {
              return (
                <li key={number + 1} className={`page-item ${currentPage === number + 1 ? 'active' : ''}`}>
                  <button 
                    className="page-link" 
                    style={{
                      backgroundColor: currentPage === number + 1 ? '#8a48d5' : '',
                      color: currentPage === number + 1 ? '' : '#8a48d5',
                      textDecoration: 'none'
                    }} 
                    onClick={() => paginate(number + 1)}
                  >
                    {number + 1}
                  </button>
                </li>
              );
            }
            // Show dots if needed
            else if (
              (number + 1 === currentPage - 2 && currentPage > 3) || 
              (number + 1 === currentPage + 2 && currentPage < pageCount - 2)
            ) {
              return (
                <li key={number + 1} className="page-item">
                  <span className="page-link" style={{ color: '#8a48d5', cursor: 'default' }}>...</span>
                </li>
              );
            }
            return null; // Don't render anything if not needed
          })}
          <li className={`page-item ${currentPage === pageCount ? 'disabled' : ''}`}>
            <button 
              className="page-link" 
              style={{ color: '#8a48d5' }} 
              onClick={() => paginate(currentPage + 1)}
            >
              <ChevronRight size={18} />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
)} */}

    </div>
  );
};

export default CSSComponent;