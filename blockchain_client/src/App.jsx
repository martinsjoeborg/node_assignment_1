import { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {

    const [blockchain, setBlockchain] = useState([]);
    const url = 'http://localhost:5001/1/blocks';

    const loadBlockchain = async () => {
        const { data } = await axios.get(url);
        const lol = await axios.get(url);
        console.log(lol);
        console.log(data);
        setBlockchain(data);
    };

    useEffect(() => {
        loadBlockchain();
      }, []);

    const html = blockchain.map((block) => {
        return (
            <div key={block.hash}>
                <ul>
                    <li>{block.timestamp}</li>
                    <li>{block.data}</li>
                    <li>{block.hash}</li>
                    <li>{block.lastHash}</li>
                </ul>
            </div>
        );
    });

    const handleAddBlock = async (e) => {
        e.preventDefault();
        const data = e.target.data.value;
        const newBlock = { data };
        const response = await axios.post(url, newBlock);
        console.log(response);
        loadBlockchain();

    }
    

    return (
        <div>
            <div>
                <h1>Blockchain Site</h1>
            </div>
            <div>
                <form onSubmit={handleAddBlock}>
                    <input type="text" name='data' />
                    <button>Add</button>
                </form>
            </div>
            <div>
                {html}
            </div>
        </div>
    );
}

export default App;