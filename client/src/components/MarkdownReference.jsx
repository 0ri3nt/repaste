import ReactMarkdown from 'react-markdown';
import '../index.css';

const MarkdownReference = () => {
    return (
        <div className="container">
            <h1>Markdown Reference</h1>
            <p>Here are some common Markdown syntax examples:</p>
            <div className="markdown-examples">
                <div className="example">
                    <code># Heading</code>
                    <div className="preview">
                        <ReactMarkdown>{"# Heading"}</ReactMarkdown>
                    </div>
                </div>

                <div className="example">
                    <code>## Subheading</code>
                    <div className="preview">
                        <ReactMarkdown>{"## Subheading"}</ReactMarkdown>
                    </div>
                    <br />
                    And so on upto 6 levels of headings
                </div>

                <div className="example">
                    <code>**bold**</code>
                    <div className="preview">
                        <ReactMarkdown>{"**This is bold text**"}</ReactMarkdown>
                    </div>
                </div>

                <div className="example">
                    <code>*italic*</code>
                    <div className="preview">
                        <ReactMarkdown>{"*This is italic text*"}</ReactMarkdown>
                    </div>
                </div>

                <div className="example">
                    <code>[link](url)</code>
                    <div className="preview">
                        <ReactMarkdown>{"[Example Link](https://rentry.co)"}</ReactMarkdown>
                    </div>
                </div>

                <div className="example">
                    <code>![alt text](image url)</code>
                    <div className="preview">
                        <ReactMarkdown>{"![Repaste Logo](./favicon.ico)"}</ReactMarkdown>
                    </div>
                </div>

                <div className="example">
                    <code>`code`</code>
                    <div className="preview">
                        <ReactMarkdown>{"`const example = 'code';`"}</ReactMarkdown>
                    </div>
                </div>

                <div className="example">
                    <code>```code block```</code>
                    <div className="preview">
                        <ReactMarkdown>{`\`\`\`javascript
const greeting = "Hello World";
console.log(greeting);
\`\`\``}</ReactMarkdown>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarkdownReference;