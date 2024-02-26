import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import UserRow from "./UserRow";

function UserTable() {
    return (
        <div className="bg-secondary w-full h-screen">
            <h5 className="text-3xl p-5 text-white">User Managment</h5>

            <Table className="w-full">
                <TableCaption>A list of User</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">NO.</TableHead>
                        <TableHead>Username</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <UserRow />
                </TableBody>
            </Table>
        </div>
    );
}

export default UserTable;
