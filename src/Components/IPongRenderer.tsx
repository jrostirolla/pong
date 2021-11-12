import { IPongRenderGameState } from "./IPongRenderGameState";

export interface Props {
    width: number;
    gameState: IPongRenderGameState;
}

export const PongRenderer: React.FC<Props> = (props) => {
    return <h1>Sup world</h1>
}