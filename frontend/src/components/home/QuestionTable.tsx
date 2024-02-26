import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

function QuestionTable() {
    return (
        <div className="w-full flex justify-center items-center pt-4">
            <div className="w-[90%]">
                <Table className="w-full">
                    <TableCaption>A list of Question</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">NO.</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead className="text-right">Difficulty</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium text-white">1</TableCell>
                            <TableCell className="text-green-700">Solved</TableCell>
                            <TableCell className="text-white">Two Sum</TableCell>
                            <TableCell className="text-right text-green-700">Easy</TableCell>
                        </TableRow>
                    </TableBody>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium text-white">2</TableCell>
                            <TableCell className="text-red-700">Not Solved</TableCell>
                            <TableCell className="text-white">Add Two Numbers</TableCell>
                            <TableCell className="text-right text-yellow-700">Medium</TableCell>
                        </TableRow>
                    </TableBody>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium text-white">3</TableCell>
                            <TableCell className="text-red-700">Not Solved</TableCell>
                            <TableCell className="text-white">Median of Two Sorted Arrays</TableCell>
                            <TableCell className="text-right text-red-700">Hard</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

export default QuestionTable;
