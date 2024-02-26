import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function Submission() {
    return (
        <div className="w-full pt-4">
            <Card className="bg-gray-600 border-none">
                <CardHeader className="flex justify-between items-center">
                    <CardTitle className="text-white">Recent Submission</CardTitle>
                </CardHeader>
                <CardContent className="text-black text-lg flex flex-col justify-center mx-auto">
                    <ul className="flex flex-col justify-center items-center">
                        <li className="w-[100%] flex justify-between bg-[#515050] p-3 rounded-xl mb-2">
                            <span className="text-white">Max Pairs Sum in an Array</span>
                            <small className="text-[#A2A2A2]">9 days ago</small>
                        </li>
                        <li className="w-[100%] flex justify-between bg-[#9A9A9A] p-3 rounded-xl mb-2">
                            <span className="text-white">Max Pairs Sum in an Array</span>
                            <small className="text-white">9 days ago</small>
                        </li>
                        <li className="w-[100%] flex justify-between bg-[#515050] p-3 rounded-xl mb-2">
                            <span className="text-white">Max Pairs Sum in an Array</span>
                            <small className="text-[#A2A2A2]">9 days ago</small>
                        </li>
                        <li className="w-[100%] flex justify-between bg-[#9A9A9A] p-3 rounded-xl mb-2">
                            <span className="text-white">Max Pairs Sum in an Array</span>
                            <small className="text-white">9 days ago</small>
                        </li>
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
}

export default Submission;
