import './App.css';
import React from 'react';
import {marked} from 'marked';


import $ from 'jquery';

function App() {
  
    marked.use({
    breaks: true
  });

  let initialEditor = "# Welcome to my React Markdown Previewer!\n\n## This is a sub-heading...\n### And here's some other cool stuff:\n\nHeres some code, `<div></div>`, between 2 backticks.\n\n```\n// this is multi-line code:\n\nfunction anotherExample(firstLine, lastLine) {\n  if (firstLine == '```' && lastLine == '```') {\n    return multiLineCode;\n  }\n}\n```\n\nYou can also make text **bold**... whoa!\nOr _italic_.\nOr... wait for it... **_both!_**\nAnd feel free to go crazy ~~crossing stuff out~~.\n\nThere's also [links](https://www.freecodecamp.org), and\n> Block Quotes!\n\nAnd if you want to get really crazy, even tables:\n\nWild Header | Crazy Header | Another Header?\n------------ | ------------- | -------------\nYour content can | be here, and it | can be here....\nAnd here. | Okay. | I think we get it.\n\n- And of course there are lists.\n  - Some are bulleted.\n     - With different indentation levels.\n        - That look like this.\n\n\n1. And there are numbered lists too.\n1. Use just 1s if you want!\n1. And last but not least, let's not forget embedded images:\n\n![freeCodeCamp Logo](https://cataas.com/cat)\n"

  let initialPreview = marked(initialEditor);
  
  class MarkdownPreviewer extends React.Component {
    constructor (props) {
      super(props);
      this.state = {editor: initialEditor, preview: initialPreview};
      this.handleChange = this.handleChange.bind(this);
      this.expandEditor = this.expandEditor.bind(this);
      this.expandPreviewer = this.expandPreviewer.bind(this);
      this.minimizeEditor = this.minimizeEditor.bind(this);
      this.minimizePreviewer = this.minimizePreviewer.bind(this);
    }
    
    handleChange(event){
      const markdown = event.target.value;
      this.setState({
        editor : markdown,
        preview : marked(markdown)
      });
    }

    expandEditor(){
      $('#editor-container').addClass("full-height");
      $('#previewer-container').addClass("hide");
      $('#icon-expand-editor').addClass("hide");
      $('#icon-minimize-editor').removeClass("hide");
    }
    
    minimizeEditor(){
      $('#editor-container').removeClass("full-height");
      $('#previewer-container').removeClass("hide");
      $('#icon-expand-editor').removeClass("hide");
      $('#icon-minimize-editor').addClass("hide");
    }

    expandPreviewer(){
      $('#previewer-container').addClass("full-height");
      $('#editor-container').addClass("hide");
      $('#icon-expand-previewer').addClass("hide");
      $('#icon-minimize-previewer').removeClass("hide");
    }

    minimizePreviewer(){
      $('#previewer-container').removeClass("full-height");
      $('#editor-container').removeClass("hide");
      $('#icon-expand-previewer').removeClass("hide");
      $('#icon-minimize-previewer').addClass("hide");
    }
  
    render() {
      return (
        <div id="container">
          <div id="editor-container">
            <div id="nav-editor">
              <span>Editor</span>
              <i id="icon-expand-editor" className="fas fa-expand-arrows-alt" onClick={this.expandEditor}></i>
              <i id="icon-minimize-editor" className="fas fa-compress-alt hide" onClick={this.minimizeEditor}></i>
            </div>
            <textarea 
              id="editor" 
              onChange={this.handleChange}
              value={this.state.editor}
              rows="18"
              >
            </textarea>
          </div>
          <div id="previewer-container">
            <div id="nav-previewer">
            <span>Previewer</span>
            <i id="icon-expand-previewer" className="fas fa-expand-arrows-alt" onClick={this.expandPreviewer}></i>
            <i id="icon-minimize-previewer" className="fas fa-compress-alt hide" onClick={this.minimizePreviewer}></i>
            </div>
            <div id="preview" dangerouslySetInnerHTML={{__html: this.state.preview}}></div>
          </div>
        </div>
      )
    }
  }
  
  return (
    <MarkdownPreviewer />
  );


}

export default App;
