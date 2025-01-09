// // TableComponent.jsx
// import React from 'react';
// import { useTable } from 'react-table';

// const TableComponent = ({ searchTerm }) => {
//     const data = React.useMemo(
//       () => [
//         {
//             "Tags": "<html>",
//             "Definition": "The root element of an HTML page is the element.",
//             "Syntax": "<html>\n<head>\n</head>\n<body>\n</body>\n</html>"
//         },
//         {
//             "Tags": "<title>",
//             "Definition": "The web page title is defined by the  tag.",
//             "Syntax": "<title>Title of page</title>"
//         },
//         {
//             "Tags": "<style>",
//             "Definition": "The <style> tag included in the <head> portion of the HTML document defines an internal stylesheet.",
//             "Syntax": "<style> h1 { color: #333; }</style>"
//         },
//         {
//             "Tags": "<body>",
//             "Definition": "The tag contains all of the content that is displayed on the page.",
//             "Syntax": "<body> \n<h1>Welcome to Web Page</h1> \n<p>This is a paragraph of text on the page. The content you see here is inside the <body> tag.\n</p>\n</body>"
//         },
//         {
//             "Tags": "<script>",
//             "Definition": "JavaScript code is embedded or referenced within a web page using the <script> tag",
//             "Syntax": "<script src=\"script.js\" ></script>"
//         },
//         {
//             "Tags": "<link>",
//             "Definition": "A stylesheet external to the HTML content is linked using the <link> tag.",
//             "Syntax": "<link rel=\"stylesheet\" href=\"styles.css\">"
//         },
//         {
//             "Tags": "<head>",
//             "Definition": "",
//             "Syntax": ""
//         },
//         {
//             "Tags": "<meta> ",
//             "Definition": "The metadata about an HTML document is provided by the <meta> tag.\n\"charset\":- Specifies the HTML document's character encoding.(        character_set)\n\"UTF-8\":- This is the charset attribute's given value. Unicode Transformation Format - 8-bit, or UTF-8, is a popular character encoding that can handle a large number of characters from many symbol sets and languages.\n\"name\":- identifies the metadata by name.\n\"Viewport\":- A web page's visible region to the user is called the viewport. It depends on the device; for example, it will be smaller on a computer screen than it is on a mobile phone.\n\"width=device-width\":- The width of the page is set to follow the device's screen width (which varies based on the device) by using the width=device-width component.\n\"initial-scale=1.0\":- When the browser loads the page for the first time, the initial zoom level is set by the initial-scale=1.0 component.",
//             "Syntax": "<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n"
//         },
//         {
//             "Tags": "<base>",
//             "Definition": "To define a base URL for relative URLs in a page, use the tag in HTML.",
//             "Syntax": "<base href=\"URL\" target=\"value\">"
//         },
//         {
//             "Tags": "<h1> to <h6>",
//             "Definition": "The <h1> to <h6> tags define HTML headings. The most essential headings is defined by <h1>. The least important heading is defined by <h6>",
//             "Syntax": "<h1>Heading 1</h1>\n<h2>Heading 2</h2>\n<h3>Heading 3</h3>\n<h4>Heading 4</h4>\n<h5>Heading 5</h5>\n<h6>Heading 6</h6>"
//         },
//         {
//             "Tags": "<b>",
//             "Definition": "Bold text is indicated via the element without any further significance.",
//             "Syntax": "<b>This text is bold.</b>"
//         },
//         {
//             "Tags": "<strong>",
//             "Definition": "Text that is considered extremely important is defined by the  element.",
//             "Syntax": "<strong>This text is of strong importance.</strong>"
//         },
//         {
//             "Tags": "<small>",
//             "Definition": "Smaller text (such as copyright and other side notes) is defined by the  tag.",
//             "Syntax": "<small>This text is in a smaller font size.</small>"
//         },
//         {
//             "Tags": "<pre>",
//             "Definition": "Preformatted text is defined by the <pre> tag",
//             "Syntax": "<pre>This text has been preformatted.\n    Line breaks and spaces are retained.</pre>"
//         },
//         {
//             "Tags": "<i>",
//             "Definition": "Italicised text appears inside the  tag.",
//             "Syntax": "<i>This text is italicized.</i>"
//         },
//         {
//             "Tags": "<em>",
//             "Definition": "Text that is emphasised is defined by the  tag. Usually, the text within is shown in italics.",
//             "Syntax": "<em>This text is emphasized.</em>"
//         },
//         {
//             "Tags": "<sub>",
//             "Definition": "Subscript text is defined via the  tag. Subscript text is occasionally displayed in a smaller font and appears half a character below the main line.",
//             "Syntax": "<p>The chemical formula of water is H<sub>2</sub>O.</p>"
//         },
//         {
//             "Tags": "<sup>",
//             "Definition": "Superscript text is defined via the  tag. Superscript text is occasionally displayed in a smaller font and appears half a character above the standard line.",    
//             "Syntax": "<p>The mathematical notation of \"x squared\" is x<sup>2</sup></p>"
//         },
//         {
//             "Tags": "<ins>",
//             "Definition": "A text that has been inserted into a document is defined by the  element. Typically, inserted text is underlined by browsers.",
//             "Syntax": "<ins>This text has been inserted.</ins>"
//         }
// ],
// []
// );
// const columns = React.useMemo(
//     () => [
//       { Header: 'Tags', accessor: 'Tags' },
//       { Header: 'Definition', accessor: 'Definition' },
//       { Header: 'Syntax', accessor: 'Syntax' },
//     ],
//     []
//   );

//   const filteredData = data.filter((row) =>
//     row.Tags.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
//     columns,
//     data: filteredData, // Use the filtered data
//   });

//   return (
//     <table {...getTableProps()} style={{ width: '100%', borderCollapse: 'collapse' }}>
//       <thead>
//         {headerGroups.map(headerGroup => (
//           <tr {...headerGroup.getHeaderGroupProps()}>
//             {headerGroup.headers.map(column => (
//               <th {...column.getHeaderProps()} style={{ border: '1px solid black', padding: '8px' }}>
//                 {column.render('Header')}
//               </th>
//             ))}
//           </tr>
//         ))}
//       </thead>
//       <tbody {...getTableBodyProps()}>
//         {rows.map(row => {
//           prepareRow(row);
//           return (
//             <tr {...row.getRowProps()}>
//               {row.cells.map(cell => (
//                 <td {...cell.getCellProps()} style={{ border: '1px solid black', padding: '8px' }}>
//                   {cell.render('Cell')}
//                 </td>
//               ))}
//             </tr>
//           );
//         })}
//       </tbody>
//     </table>
//   );
// };

// export default TableComponent;

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

const TableComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const data = useMemo(
    () => [
        {
            "Tags": "<html>",
            "Definition": "The root element of an HTML page is the element.",
            "Syntax": "<html>\n<head>\n</head>\n<body>\n</body>\n</html>"
        },
        {
            "Tags": "<title>",
            "Definition": "The web page title is defined by the  tag.",
            "Syntax": "<title>Title of page</title>"
        },
        {
            "Tags": "<style>",
            "Definition": "The <style> tag included in the <head> portion of the HTML document defines an internal stylesheet.",
            "Syntax": "<style> h1 { color: #333; }</style>"
        },
        {
            "Tags": "<body>",
            "Definition": "The tag contains all of the content that is displayed on the page.",
            "Syntax": "<body> \n<h1>Welcome to Web Page</h1> \n<p>This is a paragraph of text on the page. The content you see here is inside the <body> tag.\n</p>\n</body>"
        },
        {
            "Tags": "<script>",
            "Definition": "JavaScript code is embedded or referenced within a web page using the <script> tag",
            "Syntax": "<script src=\"script.js\" ></script>"
        },
        {
            "Tags": "<link>",
            "Definition": "A stylesheet external to the HTML content is linked using the <link> tag.",
            "Syntax": "<link rel=\"stylesheet\" href=\"styles.css\">"
        },
        {
            "Tags": "<head>",
            "Definition": "Located between the <html> and <body> tags, the <head> element serves as a container for metadata, or information about data. Information about an HTML document is called metadata. Not seen is the metadata. The document title, character set, styles, scripts, and other meta information are usually defined via metadata.",
            "Syntax": "<!DOCTYPE html>\n<html>\n\t<head>\n\t<title>Title of the document</title>\n\t</head>\n<body>\n\t<h1>This is a heading</h1>\n\t<p>This is a paragraph.</p>\n</body>\n</html>"
        },
        {
            "Tags": "<meta> ",
            "Definition": "The metadata about an HTML document is provided by the <meta> tag.\n\"charset\":- Specifies the HTML document's character encoding.(        character_set)\n\"UTF-8\":- This is the charset attribute's given value. Unicode Transformation Format - 8-bit, or UTF-8, is a popular character encoding that can handle a large number of characters from many symbol sets and languages.\n\"name\":- identifies the metadata by name.\n\"Viewport\":- A web page's visible region to the user is called the viewport. It depends on the device; for example, it will be smaller on a computer screen than it is on a mobile phone.\n\"width=device-width\":- The width of the page is set to follow the device's screen width (which varies based on the device) by using the width=device-width component.\n\"initial-scale=1.0\":- When the browser loads the page for the first time, the initial zoom level is set by the initial-scale=1.0 component.",
            "Syntax": "<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n"
        },
        {
            "Tags": "<base>",
            "Definition": "To define a base URL for relative URLs in a page, use the tag in HTML.",
            "Syntax": "<base href=\"URL\" target=\"value\">"
        },
        {
            "Tags": "<h1> to <h6>",
            "Definition": "The <h1> to <h6> tags define HTML headings. The most essential headings is defined by <h1>. The least important heading is defined by <h6>",
            "Syntax": "<h1>Heading 1</h1>\n<h2>Heading 2</h2>\n<h3>Heading 3</h3>\n<h4>Heading 4</h4>\n<h5>Heading 5</h5>\n<h6>Heading 6</h6>"
        },
        {
            "Tags": "<b>",
            "Definition": "Bold text is indicated via the element without any further significance.",
            "Syntax": "<b>This text is bold.</b>"
        },
        {
            "Tags": "<strong>",
            "Definition": "Text that is considered extremely important is defined by the  element.",
            "Syntax": "<strong>This text is of strong importance.</strong>"
        },
        {
            "Tags": "<small>",
            "Definition": "Smaller text (such as copyright and other side notes) is defined by the  tag.",
            "Syntax": "<small>This text is in a smaller font size.</small>"
        },
        {
            "Tags": "<pre>",
            "Definition": "Preformatted text is defined by the <pre> tag",
            "Syntax": "<pre>This text has been preformatted.\n    Line breaks and spaces are retained.</pre>"
        },
        {
            "Tags": "<i>",
            "Definition": "Italicised text appears inside the  tag.",
            "Syntax": "<i>This text is italicized.</i>"
        },
        {
            "Tags": "<em>",
            "Definition": "Text that is emphasised is defined by the  tag. Usually, the text within is shown in italics.",
            "Syntax": "<em>This text is emphasized.</em>"
        },
        {
            "Tags": "<sub>",
            "Definition": "Subscript text is defined via the  tag. Subscript text is occasionally displayed in a smaller font and appears half a character below the main line.",
            "Syntax": "<p>The chemical formula of water is H<sub>2</sub>O.</p>"
        },
        {
            "Tags": "<sup>",
            "Definition": "Superscript text is defined via the  tag. Superscript text is occasionally displayed in a smaller font and appears half a character above the standard line.",    
            "Syntax": "<p>The mathematical notation of \"x squared\" is x<sup>2</sup></p>"
        },
        {
            "Tags": "<ins>",
            "Definition": "A text that has been inserted into a document is defined by the  element. Typically, inserted text is underlined by browsers.",
            "Syntax": "<ins>This text has been inserted.</ins>"
        },
        {
            "Tags": "<dfn>",
            "Definition": "The \"definition element\" is represented by the  tag, which designates a term that will be defined inside the text.",
            "Syntax": "<p><dfn>API</dfn> stands for Application Programming Interface. It allows different software applications to communicate with each other.</p>"
        },
        {
            "Tags": "<del>",
            "Definition": "To signal that text has been removed from a document, use the  tag in HTML. Usually, a strikethrough is used to indicate the deletion graphically.",
            "Syntax": "<p>Original price: <del>100</del>. New price: 99.</p>"
        },
        {
            "Tags": "<div>",
            "Definition": "In an HTML document, a division or section is defined by the <div> tag",
            "Syntax": "<div> \n<p>\nThere can be several different tags inside div.\n</p> \n</div>"
        },
        {
            "Tags": "<span>",
            "Definition": "An inline container for styling or manipulating a portion of a text or document is the <span> tag. As opposed to the block-level <div> element, which is used to apply styles or JavaScript to particular content portions, <span> maintains the text's natural flow.",
            "Syntax": "<p>This is an example of <span>Span element</span> within a paragraph.</p>\n"
        },
        {
            "Tags": "<a>",
            "Definition": "A hyperlink is defined by the  tag and is used to connect pages.",
            "Syntax": "<a href=\"url\">Click here</a>"
        },
        {
            "Tags": "<base>",
            "Definition": "The base URL and/or target for each relative URL in a document is specified by the tag.",
            "Syntax": "<base href=\"url\" target=\"_blank\">"
        },
        {
            "Tags": "<ul>",
            "Definition": "The unordered (bulletted) list is defined by the <ul> tag. For the purpose of creating unordered lists, combine the <li> and <ul> tags.",
            "Syntax": "<ul>\n    <li>Item 1</li>\n    <li>Item 2</li>\n    <li>Item 3</li>\n</ul>"
        },
        {
            "Tags": "<ol>",
            "Definition": "An ordered list is defined by the <ol> tag. You can have an alphabetical or numeric ordered list. Every list item is defined using the <li> tag.",
            "Syntax": "<ol>\n<li>Item 1</li>\n<li>Item 2</li>\n<li>Item 3</li>\n</ol>"
        },
        {
            "Tags": "<li>",
            "Definition": "A list item is defined by the <li> tag. Inside ordered lists (<ol>), unordered lists (<ul>), and menu lists (<menu>), the <li> tag is utilised.",
            "Syntax": "<li>List Example</li>"
        },
        {
            "Tags": "<dl>",
            "Definition": "The container for the definition list is generated by the <dl> tag.",
            "Syntax": "<dl>\n        <dt>HTML</dt>\n        <dd>HyperText Markup Language, the standard language for creating web pages.</dd>\n</dl>"
        },
        {
            "Tags": "<dd>",
            "Definition": "The term's definition or description is provided via the <dd> tag.",
            "Syntax": "<dl>\n        <dt>HTML</dt>\n        <dd>HyperText Markup Language, the standard language for creating web pages.</dd>\n</dl>"
        },
        {
            "Tags": "<table>",
            "Definition": "An HTML table is defined by the <table> tag.",
            "Syntax": "<table>\n        <tr>\n            <th>Name</th>\n            <th>Age</th>\n        </tr>\n        <tr>\n            <td>John</td>\n            <td>30</td>\n        </tr>\n        <tr>\n            <td>Sunil</td>\n            <td>25</td>\n        </tr>\n    </table>"
        },
        {
            "Tags": "<tr>",
            "Definition": "An HTML table's row is defined by the <tr> tag. One or more <th> or <td> elements are contained in a <tr> element.",
            "Syntax": "<table> \n<tr> \n<th>Name</th> \n<th>Age</th> \n</tr> \n<tr> \n<td>John</td>\n<td>30</td> \n</tr>\n<tr>\n<td>Sunil</td>\n<td>25</td>\n</tr>\n</table>"
        },
        {
            "Tags": "<td>",
            "Definition": "There are two different types of cells in an HTML table: <th> and <td>. <td> holds data (made with the <td> element)",
            "Syntax": "<table> <tr> <th>Name</th> <th>Age</th> </tr> <tr> <td>John</td> <td>30</td> </tr> <tr> <td>Sunil</td> <td>25</td> </tr> </table>"
        },
        {
            "Tags": "<th>",
            "Definition": "There are two types of cells in an HTML table: <th> and <td>. <th> holds header data, which is produced by the <th> element.",
            "Syntax": "<table> \n<tr> \n<th>Name</th> \n<th>Age</th> \n</tr> \n<tr> \n<td>John</td> \n<td>30</td> \n</tr> \n<tr> \n<td>Sunil</td> \n<td>25</td> \n</tr> \n</table>"
        },
        {
            "Tags": "<thead>",
            "Definition": "HTML table header content is grouped using the tag.",
            "Syntax": "<table>\n    <thead>\n        <tr>\n            <th>Name</th>\n            <th>Age</th>\n        </tr>\n    </thead>\n    <tbody>\n        <tr>\n            <td>John</td>\n            <td>30</td>\n        </tr>\n        <tr>\n            <td>Sunil</td>\n            <td>25</td>\n        </tr>\n    </tbody>\n</table>"
        },
        {
            "Tags": "<tbody>",
            "Definition": "The body content of an HTML table is grouped using the tag.",
            "Syntax": "<table> \n    <thead> \n        <tr> \n            <th>Name</th> \n            <th>Age</th> \n        </tr> \n    </thead> \n    <tbody> \n         <tr> \n <td>John</td> \n             <td>30</td> \n         </tr> \n         <tr> \n             <td>Sunil</td> \n             <td>25</td> \n         </tr> \n    </tbody> \n</table>"
        },
        {
            "Tags": "<tfoot>",
            "Definition": "HTML table footer content is grouped using the tag.",
            "Syntax": "<table>\n    <thead>\n        <tr>\n            <th>Name</th>\n            <th>Donation</th>\n        </tr>\n    </thead>\n    <tbody>\n        <tr>\n            <td>John</td>\n            <td>30</td>\n        </tr>\n        <tr>\n            <td>Sunil</td>\n            <td>25</td>\n        </tr>\n    </tbody>\n    <tfoot>\n        <tr>\n           <td>Total</td>\n            <td>55</td>\n        </tr>\n    </tfoot>\n</table>\n"
        },
        {
            "Tags": "<form>",
            "Definition": "An HTML form for user input is created using the <form> tag.",
            "Syntax": "<form>\n    <label for=\"name\">Name:</label>\n    <input type=\"text\" name=\"name\">\n    <label for=\"email\">Email:</label>\n    <input type=\"email\" name=\"email\">\n</form>"
        },
        {
            "Tags": "<input>",
            "Definition": "An input field designated for data entry by the user is indicated by the input> tag.",
            "Syntax": "<form>\n    <label for=\"name\">Name:</label>\n    <input type=\"text\" name=\"name\">\n    <label for=\"email\">Email:</label>\n    <input type=\"email\" name=\"email\">\n</form>"
        },
        {
            "Tags": "<select>",
            "Definition": "Using the  element, a drop-down list is made.",
            "Syntax": "<form>\n    <label for=\"color\">Choose a color:</label>\n    <select id=\"color\" name=\"color\">\n        <option value=\"red\">Red</option>\n        <option value=\"green\">Green</option>\n    </select>\n    <button type=\"button\" >Click Me</button>\n</form>"
        },
        {
            "Tags": "<option>",
            "Definition": "An option in a choose list is defined by the  tag.",
            "Syntax": "<form>\n    <label for=\"color\">Choose a color:</label>\n    <select id=\"color\" name=\"color\">\n        <option value=\"red\">Red</option>\n        <option value=\"green\">Green</option>\n    </select>\n    <button type=\"button\" >Click Me</button>\n</form>"
        },
        {
            "Tags": "<button>",
            "Definition": "A clickable button is defined by the  tag.",
            "Syntax": "<form>\n    <label for=\"color\">Choose a color:</label>\n    <select id=\"color\" name=\"color\">\n        <option value=\"red\">Red</option>\n        <option value=\"green\">Green</option>\n    </select>\n    <button type=\"button\" >Click Me</button>\n</form>"
        },
        {
            "Tags": "<label>",
            "Definition": "To caption form controls, use the <label> tag.",
            "Syntax": "<form>\n    <label for=\"name\">Name:</label>\n    <input type=\"text\" name=\"name\">\n    <label for=\"email\">Email:</label>\n    <input type=\"email\" name=\"email\">\n</form>"
        },
        {
            "Tags": "<fieldset>",
            "Definition": "Related components in a form are grouped together using the <fieldset> tag. ",
            "Syntax": "<form>\n        <fieldset>\n            <legend>Feedback Form</legend>\n            <label for=\"email\">Email:</label>\n            <input type=\"email\" id=\"email\" name=\"email\"><br>\n            <label for=\"feedback\">Your Feedback:</label>\n            <textarea id=\"feedback\" name=\"feedback\"></textarea><br>\n        </fieldset>\n        <button type=\"submit\">Submit</button>\n    </form>"
        },
        {
            "Tags": "<textarea>",
            "Definition": "A multi-line text input control is defined by the <textarea> element.",
            "Syntax": "<textarea id=\"content\" name=\"content\"></textarea>"
        },
        {
            "Tags": "<script>",
            "Definition": "JavaScript code is embedded or referenced within a web page using the <script> tag",
            "Syntax": "<script src=\"script.js\" ></script>"
        },
        {
            "Tags": "<noscript>",
            "Definition": "Alternative material is contained in the <noscript> tag and will only be visible if JavaScript is deactivated.",
            "Syntax": "<noscript>\n    <p>JavaScript is not enabled. This website might not function as intended in some cases.</p>\n</noscript>"
        },
        {
            "Tags": "<img>",
            "Definition": "An image can be embedded into a web page using the <img> tag.",
            "Syntax": "<img src=\"path of the image\" alt=\"The text that should be displayed if the image is not available\" width=\"300\" height=\"200\">\n"
        },
        {
            "Tags": "<figure>",
            "Definition": "HTML's <figure> tag is used to contain visual material, like pictures, films and illustrations together with an optional caption.",
            "Syntax": "<figure>\n    <img src=\"image path\" >\n    <figcaption>Caption of the image</figcaption>\n</figure>"
        },
        {
            "Tags": "<figcaption>",
            "Definition": "In HTML, a description of the material inside a <figure> tag is provided by the <figcaption> tag.",
            "Syntax": "<figure>\n    <img src=\"image path\" >\n    <figcaption>Caption of the image</figcaption>\n</figure>"
        },
        {
            "Tags": "<area>",
            "Definition": "An image map is created by defining clickable regions on an image using the <area> tag in HTML within a <map> element.",
            "Syntax": "<map name=\"imagemap\">\n    <area shape=\"rect\" coords=\"34,47,200,350\" href=\"url1\">\n    <area shape=\"circle\" coords=\"200,250,50\" href=\"url2\">\n</map>"   
        },
        {
            "Tags": "<map>",
            "Definition": "An image map is a group of clickable sections inside an image that is defined by the <map> tag in HTML.",
            "Syntax": "<map name=\"imagemap\">\n    <area shape=\"rect\" coords=\"34,47,200,350\" href=\"url1\">\n    <area shape=\"circle\" coords=\"200,250,50\" href=\"url2\">\n</map>"   
        },
        {
            "Tags": "<object>",
            "Definition": "An external resource's container is defined via the <object> tag.",
            "Syntax": "<object data=\"image path\" width=\"200\" height=\"200\"></object>\n<object data=\"html file path\" width=\"400\" height=\"200\"></object>\n<object data=\"video path\" width=\"400\" height=\"200\"></object>"
        }
    ],
    []
  );

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
              placeholder="Search for HTML tags..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
        <div className="text-center mt-3">
          <p className="lead">Discover and learn about HTML tags with our interactive reference guide.</p>
        </div>
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
            // Render only the first, last, and current page numbers
            if (
              number + 1 === currentPage - 1 || 
              number + 1 === currentPage + 1 || 
              (number + 1 === 1) || 
              (number + 1 === pageCount)
            ) {
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

export default TableComponent;