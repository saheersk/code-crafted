function Activity() {
    return (
        <div className="bg-background flex justify-between items-center rounded-lg">
            <div className="bg-gray-600 w-1/2 h-48 rounded-lg flex items-center justify-center">
                <div className="bg-gray-800 w-32 h-32 rounded-full flex items-center justify-center">
                    <div className="text-white text-center">
                        <span className="text-4xl">5</span>
                        <hr className="bg-[#959595] border-2 w-[100px] my-2" />
                        <small className="text-[#959595] text-lg">100</small>
                    </div>
                </div>
            </div>
            <div className="bg-gray-600 w-1/2 ml-2 h-48 flex flex-col justify-around items-center rounded-lg">
                <h5 className="text-4xl text-white">Max Streak</h5>
                <small className="text-7xl text-white">7</small>
            </div>
        </div>
    );
}

export default Activity;
