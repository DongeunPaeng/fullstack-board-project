import Greetings from "../components/Greetings";



const GamePage = () => {
    return (
        <div>
            <Greetings title="포커" subtitle="컴퓨터를 이겨보세요" />
            <div className="text-center text-xl font-bold mt-20">준비중!</div>
        </div>
    );
};

export default GamePage;
