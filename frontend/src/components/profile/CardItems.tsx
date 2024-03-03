import { Card, CardHeader, CardTitle } from "../ui/card";

function CardItems() {
    return (
        <div className="w-[80%] flex justify-between items-center pt-8 gap-3">
            <Card className="w-full">
                <CardHeader className="flex justify-between items-center">
                    <CardTitle className="text-black">10000</CardTitle>
                    <span className="text-[#565656]"> sk</span>
                </CardHeader>
            </Card>
            <Card className="w-full">
                <CardHeader className="flex justify-between items-center">
                    <CardTitle className="text-black">10000</CardTitle>
                    <span className="text-[#565656]"> sk</span>
                </CardHeader>
            </Card>
            <Card className="w-full">
                <CardHeader className="flex justify-between items-center">
                    <CardTitle className="text-black">10000</CardTitle>
                    <span className="text-[#565656]"> sk</span>
                </CardHeader>
            </Card>
            <Card className="w-full">
                <CardHeader className="flex justify-between items-center">
                    <CardTitle className="text-black">10000</CardTitle>
                    <span className="text-[#565656]"> sk</span>
                </CardHeader>
            </Card>
        </div>
    );
}

export default CardItems;
