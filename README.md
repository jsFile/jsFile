# jsFile 
[![Build Status](https://secure.travis-ci.org/jsFile/jsFile.png?branch=master)](https://travis-ci.org/jsFile/jsFile)
[![npm](https://img.shields.io/npm/dm/jsfile.svg)](https://www.npmjs.com/package/jsfile)
[![npm](https://img.shields.io/npm/l/jsfile.svg)](https://www.npmjs.com/package/jsfile)
> JavaScript library for working with files in browser

## Getting started
### Installation
#### via NPM

You can install a <code>jsFile</code> package very easily using NPM. After
installing NPM on your machine, simply run:
````
$ npm install jsfile
````

#### with Git

You can clone the whole repository with Git:
````
$ git clone git://github.com/jsFile/jsFile.git
````

#### from latest version

Also you can download [the latest release](https://github.com/jsFile/jsFile/releases/latest) of `jsFile` and include built files to your project.

### Include jsFile to your project
You can include jsFile to your project in different ways:

##### as independent file from
````html
<script src="path_to_js/dist/jsfile.js"></script>
<script>
    window.JsFile; //use an object in global namespace
</script>
````
##### as CommonJS module
````js
var JsFile = require('JsFile');
```` 
##### as ES6 module
````js
import JsFile from 'JsFile';
````

### Required technologies
* [File](https://developer.mozilla.org/en/docs/Web/API/File)
* [Blob](https://developer.mozilla.org/en/docs/Web/API/Blob)
* [FileReader](https://developer.mozilla.org/en/docs/Web/API/FileReader)
* [ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)
* [Uint8Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)
* [DataView](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView)

Also `jsFile` uses a powerful library [zip.js](https://github.com/gildas-lormeau/zip.js) (see `src/zip/` folder)

### Documentation
#### JsFile
##### JsFile.isSupported
`Boolean`

It's shows that `jsFile` can work in current browser or not.

````js
JsFile.isSupported; //Boolean
````

##### mimeTypes property
`Array`

Contains list of supported mime-type in jDoc engines.
````js
JsFile.mimeTypes; //[...supported mime-types...]
````

###### JsFile.defineEngine()
Returns [JsFile.Engine](#jsfileengine) object or `null` (if engine is invalid). 
You can create your own documents engine for `jsFile` and include it to the library.
````js
JsFile.defineEngine(Engine);
````
`Engine {Function}` - inherited `class` from [JsFile.Engine](#jsfileengine). 
It must have static property `mimeTypes` (array with supported mime types) and static method `test` 
to test which type of file is supported

#### JsFile instance
In the next examples I will use `JsFile` instance:
````js
let jf = new JsFile(file[, options]);
````
`file {File|Blob} [required]` (Read about [File](https://developer.mozilla.org/en/docs/Web/API/File) or [Blob](https://developer.mozilla.org/en/docs/Web/API/Blob))

`options {Object} [optional]` - object with your custom settings:
 * `workerPath {String}` - path to [Web Worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) files.
 
##### read() method
Returns [Promise](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise) object
````js
jf.read().then(
    (document) => {...your success handler...},
    (error) => {...your error handler...}
);
````

`error` {[Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)} - object contains description of the error in `error.message` property

`document` - object contains result of file reading. For more details see [JsFile.Document](#document)

##### findEngine() method
Returns [JsFile.Engine](#jsfileengine) or `null`. This method finds an engine that supports `file` type.
````js
jf.findEngine()
````

#### JsFile.Engine instance
##### validateUrl() method
Returns `Boolean` value. It's utility method for URL validation. Might be helpful in development of custom engines 
````js
let engine = new JsFile.defineEngine(...);
engine.validateUrl(url); // true or false
````
`url {String}`

#### JsFile.Document
##### JsFile.Document.elementPrototype
`Object`

Static property. It contains base structure for each element in parsed [JsFile.Document](#document)
````js
{
    "children": [],
    "style": {
        "position": "relative",
        "boxSizing": "border-box"
    },
    "properties": {
        "tagName": "DIV",
        "textContent": ""
    }
}
````

##### html() method
Returns [DocumentFragment](https://developer.mozilla.org/en/docs/Web/API/DocumentFragment) with document content presented as HTML
````js 
let document = new JsFile.Document(...);
document.html();
````

##### json() method
Returns simple JS `Object` with parsed document tree
````js 
let document = new JsFile.Document(...);
document.json(); // {name: '', language: '', pages: [...]}
````

##### page() method
Returns parsed page by index
````js
let document = new JsFile.Document(...);
document.page(0);
````

##### language property
Returns main language of parsed document
````js
let document = new JsFile.Document(...);
document.language; // String
````

##### name property
Returns name of parsed document
````js
let document = new JsFile.Document(...);
document.name; // String
````

##### wordsCount property
Returns number of words in parsed document
````js
let document = new JsFile.Document(...);
document.wordsCount; // Number
````

##### length property
Returns number of pages in parsed document
````js
let document = new JsFile.Document(...);
document.length; // Number
````

##### zoom property
Returns zoom value of parsed document
````js
let document = new JsFile.Document(...);
document.zoom; // Number
````

##### isEmpty property
`Boolean`

````js
let document = new JsFile.Document(...);
document.isEmpty; // Boolean
````

## Creating custom engines
### Running provided unit tests

* Clone JsFile sources [via Git](#with-git)
* Install dependencies. Just run the next command in JsFile directory: 
````
$ npm install
````
* Run tests task:
````
$ grunt tests
````

## jsFile engines
* [jsFile-ooxml](https://github.com/jsFile/jsFile-ooxml) for [Office Open XML](https://en.wikipedia.org/wiki/Office_Open_XML) format (.docx files, etc.)
* [jsFile-odf](https://github.com/jsFile/jsFile-odf) for [OpenDocument](https://en.wikipedia.org/wiki/OpenDocument) format (.odf files, etc.)
* [jsFile-rtf](https://github.com/jsFile/jsFile-rtf) for [Rich Text Format](https://en.wikipedia.org/wiki/Rich_Text_Format)  (.rtf files)
* [jsFile-wcbff](https://github.com/jsFile/jsFile-wcbff) for [Windows Compound File Binary](https://en.wikipedia.org/wiki/Compound_File_Binary_Format) format (.doc files, ect.)
* [jsFile-fb](https://github.com/jsFile/jsFile-fb) for [FictionBook](https://en.wikipedia.org/wiki/FictionBook) format (.fb2 files, etc.)
* [jsFile-dsv](https://github.com/jsFile/jsFile-dsv) for [Delimiter-separated values](https://en.wikipedia.org/wiki/FictionBook) format (.csv, .tsv files, etc.)
* [jsFile-image](https://github.com/jsFile/jsFile-image) works with many image formats
* [jsFile-txt](https://github.com/jsFile/jsFile-txt) process the file as a simple text

## Roadmap
### Ongoing work
- [ ] Improve performance of document parsing
- [ ] Support .doc format
- [ ] Add e2e tests

### New features
- [ ] Support .xslx format
- [ ] Support .pptx format
- [ ] Support .pdf
- [ ] Support document editing and creation

## Related projects

 * `EasyDocs` extension for browsers:
    * [Chrome](https://chrome.google.com/webstore/detail/easydocs/ickghndjocahgacnfaakbmbokmfneahd)

## Love campaign
* [You may support jsFile project with any donations](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=9R3AKPR466K84)

## Release History

 * 2015-08-12       v0.0.1      Release of the first version

---
Library submitted by [@webschik](https://github.com/webschik)
