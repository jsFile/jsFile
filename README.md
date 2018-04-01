# JsFile
[![Build Status](https://secure.travis-ci.org/jsFile/jsFile.png?branch=master)](https://travis-ci.org/jsFile/jsFile)
[![npm](https://img.shields.io/npm/dm/jsfile.svg)](https://www.npmjs.com/package/jsfile)
[![npm](https://img.shields.io/npm/l/jsfile.svg)](https://www.npmjs.com/package/jsfile)

> JavaScript library for working with files in browser


# !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
> ### :warning: This project is deprecated in favour of https://github.com/file2html/file2html
# !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

* [Installation](#installation)
* [Usage](#usage)
* [API](#api)
 * [JsFile](#jsfile-1)
  * [JsFile.Engine](#jsfileengine) 
  * [JsFile.Document](#jsfiledocument)
* [Tests](#tests)
* [JsFile engines](#jsfile-engines)
* [Examples](https://jsfile.github.io/jsFile/)
* [Browser support](#browser-support)
* [Roadmap](#roadmap)
* [Help](#help)
* [Contribute](#contribute)
 * [Create custom engine](#create-custom-engine)

## Installation
### via NPM

You can install a <code>jsFile</code> package very easily using NPM. After
installing NPM on your machine, simply run:
````
$ npm install jsfile
````

### with Git

You can clone the whole repository with Git:
````
$ git clone git://github.com/jsFile/jsFile.git
````

### from latest version

Also you can download [the latest release](https://github.com/jsFile/jsFile/tree/master/dist) of `jsFile` and include built files to your project.




## Usage
You can include jsFile to your project in different ways:

### as independent file from
````html
<script src="path_to_js/dist/jsfile.js"></script>
<script>
    window.JsFile; //use an object in global namespace
</script>
````
### as CommonJS module
````js
var JsFile = require('JsFile');
```` 
### as ES6 module
````js
import JsFile from 'JsFile';
````

Include one or more engines for necessary file types. See all list of [engines](#jsfile-engines)
````js
import JsFile from 'JsFile';
import JsFileDsv from 'jsfile-dsv'; //read .csv
import JsFileOoxml from 'jsfile-ooxml'; //read .docx

JsFile.defineEngine(JsFileDsv);
JsFile.defineEngine(JsFileOoxml);
const jf = new JsFile(file, options);
````




## API
### JsFile
#### JsFile.version
Type: `String`

It's a current version of library.

#### JsFile.isSupported
Type: `Boolean`

It shows that `jsFile` can work in current browser or not.

````js
JsFile.isSupported;
````

#### JsFile.mimeTypes
Type: `Array`

Contains list of supported mime-type in jsFile engines.
````js
JsFile.mimeTypes; //[...supported mime-types...]
````

#### JsFile.defineEngine()
Returns [JsFile.Engine](#jsfileengine) object or `null` (if engine is invalid). 
You can create your own documents engine for `jsFile` and include it to the library.
````js
JsFile.defineEngine(Engine);
````
`Engine {Function}` - it's an inherited `class` from [JsFile.Engine](#jsfileengine). 
It must have static property `mimeTypes` (array with supported mime types) and static method `test` 
to test which type of file is supported.

#### JsFile.removeEngine(Engine)
`Engine {Function}` - it's an inherited `class` from [JsFile.Engine](#jsfileengine).
It removes specified `Engine` from defined engines. If `Engine` argument isn't defined it removes all defined engines.

#### JsFile instance
In the next examples I will use `JsFile` instance:
````js
let jf = new JsFile(file[, options]);
````
`file {File|Blob} [required]` (Read about [File](https://developer.mozilla.org/en/docs/Web/API/File) or [Blob](https://developer.mozilla.org/en/docs/Web/API/Blob))

`options {Object} [optional]` - object with your custom settings:
 * `workerPath {String}` - path to [Web Worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) files.
 
#### jf.read()
Returns [Promise](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise) object
````js
jf.read().then(
    (document) => {...your success handler...},
    (error) => {...your error handler...}
);
````

`error` {[Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)} - object contains description of the error in `error.message` property

`document` - object contains result of file reading. For more details see [JsFile.Document](#jsfiledocument)

#### jf.findEngine()
Returns [JsFile.Engine](#jsfileengine) or `null`. This method finds an engine for `jf.file`.
````js
jf.findEngine()
````

#### JsFile.Engine
##### JsFile.Engine.getCharFromHex(hex)
Returns a character from `hex` value.

##### JsFile.Engine.replaceSpaces(str)
Returns `String`.
Replaces 2 and more spaces on `\u2000\u2000` value.

##### JsFile.Engine.test()
Returns `Boolean`.
If you develop a custom JsFile engine, you should override this method:
````js
static test (file) {
    return Boolean(file && Engine.validateFile(file, files));
}
````
`files` - Object with meta-information about supported formats:
````js
// Example for FB2 engine:
const files = {
    extension: ['fb2'],
    mime: ['application/x-fictionbook+xml']
};
````

##### JsFile.Engine.normalizeDataUri(dataUri, filename)
Normalizes a `dataUri` string according to specified `filename`.
````js
const dataUri = 'data:;base64,....';
const filename = 'test.png';
JsFile.Engine.normalizeDataUri(dataUri, filename); //data:image/png;base64,...
````

##### JsFile.Engine.formatPropertyName(name, options)
````js
JsFile.Engine.formatPropertyName('namespace:prop'); //property
JsFile.Engine.formatPropertyName('prop-name'); //propName
JsFile.Engine.formatPropertyName('prop-name', {capitalize: true}); //PropName
````

##### JsFile.Engine.cropUnit(value)
````js
JsFile.Engine.cropUnit('18px'); //18
````

##### JsFile.Engine.normalizeColorValue(value)
````js
JsFile.Engine.normalizeColorValue('black'); //#000000
JsFile.Engine.normalizeColorValue('darkgreen'); //#006400
````

##### JsFile.Engine.attributeToBoolean(value)
````js
JsFile.Engine.attributeToBoolean('yes'); //true
JsFile.Engine.attributeToBoolean('on'); //true
JsFile.Engine.attributeToBoolean('off'); //false
JsFile.Engine.normalizeColorValue({value: 1}); //true
````

##### JsFile.Engine.validateUrl()
Returns `Boolean` value. It's utility method for URL validation. Might be helpful in development of custom engines 
````js
let engine = new JsFile.defineEngine(...);
engine.validateUrl(url); // true or false
````
`url {String}`

##### JsFile.Engine.merge()
Deep merge of objects;

````js
const a = {
    data: {
        value: 1
    },
         
    name: 'test'
};

const b = {
    data: {
        value: 0
    }
};

JsFile.Engine.merge(a, b);
/*
It returns:
{
    data: {
        value: 0
    },
 
    name: 'test'   
}
*/
````

##### JsFile.Engine.clone()
Returns deep clone of object;

##### JsFile.Engine.errors
{Object}. List of constants with error messages

##### JsFile.Engine.prototype.isValid
Method of `JsFile.Engine` instance. Return true if file from engine is supported.

#### JsFile.Document
##### JsFile.Document.elementPrototype
Type: `Object`

It is a static property that contains the base structure for each element of parsed document

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

##### doc.html()
Returns [DocumentFragment](https://developer.mozilla.org/en/docs/Web/API/DocumentFragment) with document content presented as HTML
````js 
const doc = new JsFile.Document(...);
doc.html();
````

##### doc.json()
Returns simple JS `Object` with parsed document tree
````js 
const doc = new JsFile.Document(...);
doc.json(); // {name: '', language: '', content: [...]}
````

##### doc.page()
Returns parsed page by index
````js
const doc = new JsFile.Document(...);
doc.page(0);
````

##### doc.language
Returns main language of parsed document
````js
const doc = new JsFile.Document(...);
doc.language; // String
````

##### doc.name
Returns name of parsed document
````js
const doc = new JsFile.Document(...);
doc.name; // String
````

##### doc.wordsCount
Returns number of words in parsed document
````js
const doc = new JsFile.Document(...);
doc.wordsCount; // Number
````

##### doc.length
Returns number of pages in parsed document
````js
const doc = new JsFile.Document(...);
doc.length; // Number
````

##### doc.zoom
Returns zoom value of parsed document
````js
const doc = new JsFile.Document(...);
doc.zoom; // Number
````

##### doc.isEmpty
Type: `Boolean`

````js
const doc = new JsFile.Document(...);
doc.isEmpty; // Boolean
````




# Tests

* Clone JsFile sources [via Git](#with-git)
* Install dependencies. Just run the next command in JsFile directory: 
````
$ npm install
````
* Run tests task:
````
$ npm run tests
````




## JsFile engines
* [jsFile-ooxml](https://github.com/jsFile/jsFile-ooxml) for [Office Open XML](https://en.wikipedia.org/wiki/Office_Open_XML) format (.docx files, etc.)
* [jsFile-odf](https://github.com/jsFile/jsFile-odf) for [OpenDocument](https://en.wikipedia.org/wiki/OpenDocument) format (.odf files, etc.)
* [jsFile-rtf](https://github.com/jsFile/jsFile-rtf) for [Rich Text Format](https://en.wikipedia.org/wiki/Rich_Text_Format)  (.rtf files)
* [jsFile-wcbff](https://github.com/jsFile/jsFile-wcbff) for [Windows Compound File Binary](https://en.wikipedia.org/wiki/Compound_File_Binary_Format) format (.doc files, etc.)
* [jsFile-fb](https://github.com/jsFile/jsFile-fb) for [FictionBook](https://en.wikipedia.org/wiki/FictionBook) format (.fb2 files, etc.)
* [jsFile-dsv](https://github.com/jsFile/jsFile-dsv) for [Delimiter-separated values](https://en.wikipedia.org/wiki/FictionBook) format (.csv, .tsv files, etc.)
* [jsFile-image](https://github.com/jsFile/jsFile-image) works with many image formats
* [jsFile-txt](https://github.com/jsFile/jsFile-txt) process the file as a simple text
* [jsFile-epub](https://github.com/jsFile/jsFile-epub) for [EPUB](https://en.wikipedia.org/wiki/EPUB) format (.epub files, etc.)




## Browser Support
### Dependencies
* [Promise](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise)
* [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)
* [File](https://developer.mozilla.org/en/docs/Web/API/File)
* [Blob](https://developer.mozilla.org/en/docs/Web/API/Blob)
* [FileReader](https://developer.mozilla.org/en/docs/Web/API/FileReader)
* [ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)
* [Uint8Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)
* [DataView](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView)
* [zip.js](https://github.com/gildas-lormeau/zip.js) (see `src/zip/` folder)


| Chrome | Firefox | Opera | Safari |
| ------ | ------- | ----- | ------ |
| 43+ ✔ | 41+ ✔ | 32✔ | 8+ ✔ |

You can use polyfills for required API and try `JsFile` in older browsers.


## Roadmap
### Ongoing work
- [ ] Improve performance of document parsing
- [ ] Support .doc format
- [ ] Add e2e tests
- [ ] refactor zip engine

### New features
- [ ] Support .xslx format
- [ ] Support .pptx format
- [ ] Support .pdf
- [ ] Support document editing and creation




## Related projects

 * `EasyDocs` extension for browsers:
    * [Chrome](https://chrome.google.com/webstore/detail/easydocs/ickghndjocahgacnfaakbmbokmfneahd)




## Help
You may support us:
* [Bountysource](https://www.bountysource.com/teams/jsfile)
* [Gratipay](https://gratipay.com/jsfile/)




## Contribute
### Guidelines
#### Code of conduct
JsFile is an open source project. Please read our [code license](https://github.com/jsFile/jsFile/blob/master/LICENSE)
#### Found an Issue?
If you find a bug in the source code or a mistake in the documentation, you can help us by submitting an issue to our [GitHub Repository](https://github.com/jsFile/jsFile/issues). Even better you can submit a Pull Request with a fix.
#### Want a Feature?
You can request a new feature by submitting an issue to our [GitHub Repository](https://github.com/jsFile/jsFile/issues). 
#### Code rules
* All features or bug fixes must be tested by one or more specs.
* All public API methods must be documented with [jsdoc](http://usejsdoc.org/) 
* We use [ES6](https://github.com/lukehoban/es6features) (EcmaScript2015) in JsFile
* See our [jscs](jscs.info) [configuration](https://github.com/jsFile/jsFile/blob/master/grunt_tasks_config/jscs.js)

### Create custom engine
See the special [generator](https://github.com/jsFile/generator-jsfile-engine) for new jsFile engine . It will help you to start and provide required dependencies, structure and tools for jsFile engine.




### Installing Dependencies
* [Git](http://git-scm.com/): The [Github Guide to Installing Git](https://help.github.com/articles/set-up-git) is a good source of information
* [Node.js](http://nodejs.org/)
* [Grunt](http://gruntjs.com/)




### Forking JsFile on Github
To create a Github account, follow the instructions [here](https://github.com/signup/free). 
Afterwards, go ahead and [fork](http://help.github.com/forking) the [main JsFile repository](https://github.com/jsFile/jsFile).




### Building JsFile
* [Install JsFile with Git](#with-git)
* Follow the next steps:

````shell

#Go to the JsFile directory:
cd jsfile

#Add the main JsFile repository as an upstream remote to your repository:

git remote add upstream "https://github.com/jsFile/jsFile.git"

#Install node.js dependencies:

npm install

#Build JsFile:

grunt build
````

### Running unit tests

````js
npm run test
````




## Release History

 * 2015-08-12       v0.0.1      Release of the first version

---
Library submitted by [@webschik](https://github.com/webschik)
