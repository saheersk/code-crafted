import Banner from "./Banner";
import NavBar from "../common/NavBar";
import QuestionTable from "./QuestionTable";

function HomeView() {
    return (
        <>
            <NavBar />
            <div className="bg-background h-screen w-full">
                <Banner />
                <QuestionTable />
            </div>
        </>
    );
}

export default HomeView;
