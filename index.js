let numbers = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
let symbols = ["/", "*", "-", "+"];
let ids = {
  0: "zero",
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
  "+": "add",
  "-": "subtract",
  "*": "multiply",
  "/": "divide",
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastClick: undefined,
      computation: "0",
    };
  }

  handleClick = (e) => {
    var { computation, lastClick } = this.state;
    var { innerText } = e.target;

    switch (innerText) {
      case "C": {
        this.setState({
          computation: "0",
        });
        break;
      }
      case "=": {
        let check = eval(computation);
        this.setState({
          computation: check,
        });
        break;
      }

      case ".": {
        const data = computation.split(/[\+\-\*\/]/g);
        const test = data.slice(-1)[0];
        if (!test.includes(".")) {
          this.setState({
            computation: computation + ".",
          });
        }
        break;
      }

      default: {
        if (symbols.includes(innerText)) {
          if (symbols.includes(lastClick) && innerText !== "-") {
            const lastNumbers = computation
              .split("")
              .reverse()
              .findIndex((count) => count !== " " && numbers.includes(+count));

            e =
              computation.slice(0, computation.length - lastNumbers) +
              ` ${innerText} `;
          } else {
            e = `${computation} ${innerText} `;
          }
        } else {
          e = computation === "0" ? innerText : computation + innerText;
        }
        this.setState({
          computation: e,
        });
      }
    }
    this.setState({
      lastClick: innerText,
    });
  };
  render() {
    const { computation } = this.state;
    return (
      <div className="container">
        <div id="display">{computation}</div>
        <div className="numeral">
          <button
            className="horizontal clearing control"
            onClick={this.handleClick}
            id="clear"
          >
            C
          </button>
          {numbers.map((digit) => (
            <button
              className={`type ${digit === 0 && "horizontal"}`}
              key={digit}
              onClick={this.handleClick}
              id={ids[digit]}
            >
              {digit}
            </button>
          ))}

          <button onClick={this.handleClick} id="decimal">
            .
          </button>
        </div>
        <div className="symbol">
          {symbols.map((sign) => (
            <button
              className="turquoise"
              key={sign}
              onClick={this.handleClick}
              id={ids[sign]}
            >
              {sign}
            </button>
          ))}
          <button className="turquoise" onClick={this.handleClick} id="equals">
            =
          </button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
