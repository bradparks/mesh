// Imports
// http://stackoverflow.com/a/19600250

// Via https://gist.github.com/branneman/8048520
global.rootRequire = function(name) {
    return require(__dirname + '/' + name);
}

const Path = require('path');
function load_local(relative_path) {
    return require(Path.resolve('.', relative_path));
}

const Redux = require('redux');

const CodeEditor = load_local('js/code_editor.js')
const Sheet = load_local('js/sheet.js');
const StatusBar = load_local('js/status_bar.js');
const Events = load_local('js/events.js');
const LocalFileIO = load_local('js/local_file_io.js');
const Reducers = load_local('js/reducers.js');

// HTML elements

const HTML_elements = {
    grid: document.getElementById('grid'),
    formula_bar: document.getElementById('formula-bar'),
    status_bar: document.getElementById('status-bar')
}

// JS objects
// TODO hide behind a JS objects parent object to simplify exports / usage?

const store = Redux.createStore(Reducers.app);
const status_bar = new StatusBar(HTML_elements.status_bar, store) 
const sheet = new Sheet.Sheet(HTML_elements.grid, store);

// Event bindings

Events.bind_code_editor_events(store, CodeEditor.code_editor);
Events.bind_formula_bar_events(store, HTML_elements.formula_bar);
Events.bind_grid_events(store, HTML_elements.grid);
Events.bind_keydown_events(store, window);

window.onerror = function (msg, url, lineNo, colNo, error) {
    console.log(`${error.message} | url ${url}, line ${lineNo}, column ${colNo}`)
    // TODO move cursor?
}

// Error handling

const run_and_render_code = function () {
    // TODO consider
    // http://stackoverflow.com/questions/25601865/how-to-run-user-provided-javascript-without-security-issues-like-jsfiddle-jsbi
    // http://stackoverflow.com/questions/8004001/how-does-jsfiddle-allow-and-execute-user-defined-javascript-without-being-danger
    // const code = CodeEditor.code_editor.getValue();
    const code = store.getState().code_editor.value;
    eval(code);
    sheet.render();
    store.dispatch({ type: 'UPDATE_FORMULA_BAR' });
}

// Showtime

sheet.render();
status_bar.render(store.getState());

// Exports

module.exports = Mesh = {
    store: store,
	Sheet: sheet,
    HTML_elements: HTML_elements,
    status_bar: status_bar,
    code_editor: CodeEditor.code_editor,
    load_CSV: LocalFileIO.load_CSV,
    run_and_render_code: run_and_render_code
}