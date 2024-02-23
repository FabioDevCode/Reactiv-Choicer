import { useState } from 'react'
import xmark from '../assets/xmark.svg'
import './List.css'


function List() {
    const [list, setList] = useState([]);
    const [text, setText] = useState('');

    function addToList(e) {
        e.preventDefault();
        if(!text?.trim()?.length) {
            setText('');
            return;
        }
        if(list.includes(text.trim())) {
            setText('');
            return;
        }

        list.push(text);
        setText('');
    }

    function delItem(item) {
        list.splice(list.indexOf(item), 1);
        setList([...list]);
    }

    function clearList() {
        setList([]);
    }


    // PREPARE ELEMENT TO SHOW =====================================================//
    const show_list = list.map(item => {
        return (
            <li className='proposition' key={item}>
                {item}
                <button onClick={() => delItem(item)}>
                    <img className="xmark" src={xmark} alt="X" />
                </button>
            </li>
        );
    });

    const clear_btn = list.length >= 2 ? <button onClick={clearList} className='reset_list'>Clear</button> : null;

    // RETURN ======================================================================//
    return (
        <div className='list'>
            <button className='letsgo'>
                Lets Go
            </button>

            <form className='form'>
                <input
                    className='form-input'
                    onChange={e => setText(e.target.value)}
                    value={text} type="text" placeholder="Write elements of list..."
                />
                <button className='form-btn' onClick={addToList}>
                    ADD
                </button>
            </form>

            <ul>
                {show_list}
            </ul>

            {clear_btn}
        </div>
    )
}

export default List