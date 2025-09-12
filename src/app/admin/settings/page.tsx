import {
  getAllCategoriesAction,
  getTotalUsersActions,
} from "@/actions/admin.actions";
import CategoryManager from "@/components/admin/category-manager";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

export default async function SettingsPage(){
    const [categories, userCount] = await Promise.all([
      getAllCategoriesAction(),
      getTotalUsersActions(),
    ]);

    return (
      <div className="container py-10">
        <h1 className="text-3xl font-bold mb-5">Admin Settings</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-7">
          <Card className="bg-white">
            <CardHeader className="p-2">
              <CardTitle className="flex items-center text-lg font-medium">
                <Users className="mr-2 h-5 w-5 text-teal-500" />
                Total Users
              </CardTitle>
              <CardDescription>
                All registered users on the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-teal-600">{userCount}</p>
            </CardContent>
          </Card>

          

          <Card className="bg-white">
            <CardHeader className="p-2">
              <CardTitle className="flex items-center text-lg font-medium">
                <Users className="mr-2 h-5 w-5 text-teal-500" />
                Total Assets
              </CardTitle>
              <CardDescription>All uploaded assets on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-teal-600">1000</p>
            </CardContent>
          </Card>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Category Management</CardTitle>
            </CardHeader>
            <CardContent>
                <CategoryManager categories={categories}/>
            </CardContent>
        </Card>
      </div>
    );
}


function getAllUsersAction(): any {
    throw new Error("Function not implemented.");
}
  