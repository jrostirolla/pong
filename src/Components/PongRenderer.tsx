import { CSSProperties } from "react";
import { IPongRenderGameState } from "../IPongRenderGameState";
import { 
    BALL_WIDTH, 
    BALL_HEIGHT, 
    PADDLE_HEIGHT,
    PADDLE_WIDTH,
    PADDLE_WALLSPACING,
    ASPECT_RATIO,
} from "../Constants";

export interface Props {
    width: number;
    gameState: IPongRenderGameState;
}

export const PongRenderer: React.FC<Props> = (props) => {
    const width = props.width;
    const height = width * ASPECT_RATIO;

    const ballXAxis = props.gameState.ballX;
    const ballYAxis = props.gameState.ballY;

    const styles: Record<string, CSSProperties> = {
        pongBackground: {
            background: "black",
            width,
            height,
            position: "relative"
        },
        textStyle: {
            color: "white",
            textAlign: "center",
        },    
        centerLine: {
            width: 0,
            height,
            border: "white 5px solid",
            borderStyle: "none dashed none none",
            position: "absolute",
            left: width / 2 - 2.5
        },
        paddleLeft: {
            width: PADDLE_WIDTH * width,
            height: PADDLE_HEIGHT * height,
            background: "white",
            marginLeft: PADDLE_WALLSPACING * width,
            position: "absolute",
            left: 0,
            top: ( props.gameState.paddleAPosition - PADDLE_HEIGHT / 2 ) * height
        },
        paddleRight: {
            width: PADDLE_WIDTH * width,
            height: PADDLE_HEIGHT * height,
            background: "white",
            marginRight: PADDLE_WALLSPACING * width,
            position: "absolute",
            right: 0,
            top: ( props.gameState.paddleBPosition - PADDLE_HEIGHT / 2 ) * height
        },
        ball: {
            background: "white",
            width: BALL_WIDTH * width,
            height: BALL_HEIGHT * height,
            position: "absolute",
            left: ( ballXAxis - BALL_WIDTH / 2 ) * width,
            top: ( ballYAxis - BALL_HEIGHT / 2 ) * height,
        }
    }

    return <div id="MainContainer" style={styles.pongBackground}>
        <h1 style={styles.textStyle}>PONG</h1>
            <div>
                <section id="Score">
                    <h1 style={styles.textStyle}> {props.gameState.scoreA} : {props.gameState.scoreB} </h1>
                </section>
                <section id="PaddleOne">
                    <div style={styles.paddleLeft}>
                    </div>
                </section>

                <section id="PaddleTwo">
                    <div style={styles.paddleRight}>
                    </div>                
                </section>                
                <section id="CentreLine">
                    <div style={styles.centerLine}>

                    </div>
                </section>
                <section id="Ball">
                    <div style={styles.ball}>
                        
                    </div>
                </section>
            </div>
    </div>
}