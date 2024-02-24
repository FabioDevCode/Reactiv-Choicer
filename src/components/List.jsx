import { useState, useEffect } from 'react'
import xmark from '../assets/xmark.svg'
import trash from '../assets/trash.svg'
import './List.css'


function List() {
    const [list, setList] = useState([]);
    const [text, setText] = useState('');
    const [nameList, setNameList] = useState('');
    const [shower, setShower] = useState(true);
    const [showOwn, setShowOwn] = useState(false);
    const [savedList, setSavedList] = useState([]);

    useEffect(() => {
        if(!localStorage.getItem('rc_list_saved')) {
            localStorage.setItem('rc_list_saved', JSON.stringify(savedList))
        }
    }, [])

    function saveList(e) {
        e.preventDefault();
        const actualList = JSON.parse(localStorage.getItem('rc_list_saved'));

        if(!actualList.includes(nameList)) {
            actualList.push(nameList);
            localStorage.setItem('rc_list_saved', JSON.stringify(actualList));
        }
        localStorage.setItem(nameList, JSON.stringify(list));
        setNameList('');
    }

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

        if(list.length == 2) {
            document.querySelector('.reset_list').classList.remove('none');
            document.querySelector('.reset_list').classList.remove('slide-fade-leave');
            document.querySelector('.reset_list').classList.add('slide-fade-enter');
        }

        const propositions = document.querySelectorAll('.proposition');
        propositions.forEach(el => {
            el.classList.remove('active');
        })
    }

    function delItem(item) {
        const indexToDel = list.indexOf(item);
        const propositions = document.querySelectorAll('.proposition');
        propositions.forEach(el => {
            el.classList.remove('active')
        })

        const deleted = propositions[indexToDel];
        deleted.classList.add('delete-item');

        setTimeout(() => {
            list.splice(indexToDel, 1);
            setList([...list]);

            if(list.length == 1) {
                document.querySelector('.reset_list').classList.add('slide-fade-leave');
                setTimeout(() => {
                    document.querySelector('.reset_list').classList.add('none');
                }, 250)
            }

            propositions.forEach(el => {
                el.classList.remove('delete-item');
            })
        }, 500);
    }

    function clearList() {
        const propositions = document.querySelectorAll('.proposition');
        propositions.forEach(el => {
            el.classList.add('delete-item');
        })

        setTimeout(() => {
            setList([]);
            document.querySelector('.reset_list').classList.add('slide-fade-leave');
        }, 450);
    }

    function randomChoice() {
        if(list.length <= 1) {
            return
        }

        const indexSelected = Math.floor(Math.random() * list.length);
        const propositions = document.querySelectorAll('.proposition');

        propositions.forEach(el => {
            el.classList.remove('active')
            el.classList.remove('bounce-enter-active');

        })

        for(let i = 0; i < propositions.length; i++) {
            if(i % 2 == 0) { propositions[i].classList.add('animate')}
            else { propositions[i].classList.add('animate2')}
        }

        setTimeout(() => {
            propositions.forEach(el => {
                el.classList.remove('animate');
                el.classList.remove('animate2');
            })

            const choice = document.querySelectorAll('.proposition')[indexSelected];
            choice.classList.add('active');
            choice.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "center"
            });
        }, "2550");
    }

    function loadOwnList() {
        setShower(!shower)

        if(shower) {
            setSavedList([...JSON.parse(localStorage.getItem('rc_list_saved'))])
            document.querySelector('.own_list').classList.remove('slide-fade-leave');
            document.querySelector('.own_list').classList.add('slide-fade-enter');
        } else {
            document.querySelector('.own_list').classList.add('slide-fade-leave');
            setTimeout(() => {
                setSavedList([])
            }, 300)
        }
    }

    function activeSaver() {
        if(!showOwn) {
            setShower(true);
            setSavedList([]);
            document.querySelector('.load_saver').classList.remove('none');
            document.querySelector('.own_list').classList.remove('none');
            document.querySelector('.load_save_btn').classList.remove('none');
            document.querySelector('.load_saver').classList.remove('slide-fade-leave');
            document.querySelector('.load_saver').classList.add('slide-fade-enter');
            document.querySelector('.own_list').classList.remove('slide-fade-leave');
            document.querySelector('.own_list').classList.add('slide-fade-enter');
            document.querySelector('.load_save_btn').classList.remove('slide-fade-leave');
            document.querySelector('.load_save_btn').classList.add('slide-fade-enter');
        } else {
            document.querySelector('.load_saver').classList.add('slide-fade-leave');
            document.querySelector('.own_list').classList.add('slide-fade-leave');
            document.querySelector('.load_save_btn').classList.add('slide-fade-leave');
            setTimeout(() => {
                document.querySelector('.load_saver').classList.add('none');
                document.querySelector('.own_list').classList.add('none');
                document.querySelector('.load_save_btn').classList.add('none');
            }, 250)
        }
        setShowOwn(!showOwn)
    }

    function showThisList(name_list) {
        let newlist;
        if(localStorage.getItem(name_list)) {
            newlist = JSON.parse(localStorage.getItem(name_list));
            setList(newlist);
        }

        if(newlist.length >= 2) {
            document.querySelector('.reset_list').classList.remove('none');
            document.querySelector('.reset_list').classList.remove('slide-fade-leave');
            document.querySelector('.reset_list').classList.add('slide-fade-enter');
        }

        if(newlist.length < 2) {
            document.querySelector('.reset_list').classList.add('slide-fade-leave');
            setTimeout(() => {
                document.querySelector('.reset_list').classList.add('none');
            }, 250)
        }

        activeSaver();
    }

    function deleteThisList(name_list) {
        const response = window.confirm(`Are you sure do you want to delete the list : ${name_list}`);

        if(!response) {
            return;
        }

        if(localStorage.getItem('rc_list_saved')) {
            const updatedList = JSON.parse(localStorage.getItem('rc_list_saved'));
            updatedList.splice(updatedList.indexOf(name_list), 1);
            localStorage.setItem('rc_list_saved', JSON.stringify(updatedList));
            localStorage.removeItem(name_list);
            setSavedList(JSON.parse(localStorage.getItem('rc_list_saved')))
        }
    }

    // PREPARE ELEMENT TO SHOW =====================================================//
    const show_list = list.map(item => {
        return (
            <li className='proposition bounce-enter-active' key={item}>
                {item}
                <button onClick={() => delItem(item)}>
                    <img className="xmark" src={xmark} alt="X" />
                </button>
            </li>
        )
    });

    const saved_list = savedList.map(item => {
        return (
            <li className='a_list' key={item}>
                <p className='name_list' onClick={() => showThisList(item)}>
                    {item}
                </p>
                <button onClick={() => deleteThisList(item)}>
                    <img src={trash} alt="trash" />
                </button>
            </li>
        )
    })

    const btn_list = shower ? <button className='load' onClick={loadOwnList}>Show your lists</button> : !shower ? <button className='hide' onClick={loadOwnList}>Hide your lists</button> : null;


    // RETURN ======================================================================//
    return (
        <div className='list'>
            <button onClick={randomChoice} className='letsgo'>
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

            <button onClick={clearList} className='reset_list none'>
                Clear list
            </button>


            <form className='load_saver none'>
                <input
                    className='input_saver'
                    onChange={e => setNameList(e.target.value)}
                    value={nameList} type="text" placeholder='Name of list...'
                />
                <button className='save' onClick={saveList}>
                    Save
                </button>
            </form>

            <ul className='own_list none'>
                {saved_list}
            </ul>

            <div className='load_save_btn none'>
                {btn_list}
            </div>



            <footer>
                <button className='coded' onClick={activeSaver}>
                    Coded
                </button>
                by Fabio R. LOPES
            </footer>
        </div>
    )
}

export default List