import React, {useState} from 'react';
import styles from './App.module.scss';
import {Plums} from "./components/plums/plums.component";
import {useWinningState} from "./services/winning-state/winning.state";
import {PlumCreator} from "./services/plum-creator/plum-creator.service";
import {PlumTarget} from "./components/plum-target/plum-target.component";

function App() {
    const [winningState, setWinningState] = useWinningState();
    const [isWin, setIsWin] = useState(false);


    return (
        <div className={styles.appContainer}>
            <header className={styles.header}>
                <h1>Plums</h1>
                <div className={styles.buttonContainer}>
                    <PlumTarget target={winningState}/>
                    <button type='button'
                            onClick={() => setWinningState(PlumCreator(4, 4, true))}
                            className={styles.button}>New Game
                    </button>
                </div>
            </header>
            <Plums
                onWin={() => setIsWin(true)}
                winningState={winningState}/>
        </div>

    );
}

export default App;
