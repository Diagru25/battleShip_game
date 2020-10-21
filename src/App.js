import React, { useState } from 'react';
import Models from "./models";

function App() {

    const [text, setText] = useState("");

    const array = [0, 1, 2, 3, 4, 5, 6];

    const handleFire = () => {
        Models.run(text);
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            Models.run(text);

            setText("");
        }
    }
    const handleChange = (e) => {
        setText(e.target.value);
    }

    return (
        <div className="content">
            <div id="board">
                <div className="messageArea">Hello everyone!</div>
                <table>
                    <thead></thead>
                    <tbody>
                        {
                            array.map((element, index) => {
                                return (<tr key={index}>
                                    {
                                        array.map((data, index) => {
                                            let id = element + "" + data;
                                            return (<td id={id} key={index}></td>)
                                        })
                                    }
                                </tr>)
                            })
                        }
                    </tbody>
                    <tfoot></tfoot>
                </table>
                <div className="fire">
                    <input
                        type="text"
                        placeholder="A0"
                        value={text}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                    />
                    <button onClick={handleFire}>Fire!</button>
                </div>
            </div>
        </div>
    );
}

export default App;
