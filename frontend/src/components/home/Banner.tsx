import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";

function Banner() {
    return (
        <div className="h-[30%] w-full flex justify-center items-center">
            <Card className="w-[90%]">
                <CardHeader>
                    <CardTitle className="mb-5">CodeCrafted</CardTitle>
                    <CardDescription className="text-black mb-4">
                        Welcome to CodeCraft, your gateway to mastering Data Structures and Algorithms (DSA) and
                        accelerating your journey to a successful career in the tech industry.
                    </CardDescription>
                    <CardDescription className="text-black">
                        Why CodeCraft? 🚀 DSA Mastery for Career Growth:
                    </CardDescription>
                </CardHeader>
                <ul className="text-black list-disc ml-6">
                    <li>
                        Sharpen your problem-solving skills with a vast collection of algorithmic challenges.
                    </li>
                    <li>Tackle real-world problems to enhance your understanding of DSA concepts.</li>
                </ul>
                <CardFooter className="flex justify-between"></CardFooter>
            </Card>
        </div>
    );
}

export default Banner;
