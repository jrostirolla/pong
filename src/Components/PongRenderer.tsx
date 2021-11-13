import { CSSProperties } from "react";
import { IPongRenderGameState } from "../IPongRenderGameState";

export interface Props {
    width: number;
    gameState: IPongRenderGameState;
}

const styles: Record<string, CSSProperties> = {
    pongBackground: {
        background: "black",
        width: "100%",
        height: "100vh"
    },
    textStyle: {
        color: "white",
        textAlign: "center",
    },
    paddleLeft: {
        width: "10px",
        height: "100px",
        background: "white",
        margin: "0 0 0 20px",
        position: "absolute",
        left: 0
    },
    centerLine: {
        width: 0,
        height: "100vh",
        border: "white 5px solid",
        borderStyle: "none dashed none none",
        position: "absolute",
        left: "49.8%"
    },
    paddleRight: {
        width: "10px",
        height: "100px",
        background: "white",
        margin: "0 20px 0 0",
        position: "absolute",
        right: 0
    }
}

export const PongRenderer: React.FC<Props> = (props) => {
    return <div id="MainContainer" style={styles.pongBackground}>
        <h1 style={styles.textStyle}>PONG</h1>
            <div>
                <section id="Score">
                    <h1 style={styles.textStyle}> {props.gameState.scoreA} : {props.gameState.scoreA} </h1>
                </section>
                <section id="PaddleOne">
                    <div style={styles.paddleLeft}>
                    </div>
                </section>

                <section id="PaddleTwo">
                    <div style={styles.paddleRight}>
                    </div>                
                <section>
                    <div id="CentreLine" style={styles.centerLine}>

                    </div>
                </section>
                </section>
            </div>
    </div>
}