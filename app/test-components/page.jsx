import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function TestComponentsPage() {
  return (
    <div className="container mx-auto py-10 px-4 space-y-12 bg-zinc-50 min-h-screen">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Component Showcase</h1>
        <p className="text-zinc-500">Visual QA for core shadcn/ui components adapted to PRD specifications.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Card & Badge */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Badges & Cards</CardTitle>
                <CardDescription>Testing card structure and various badge variants.</CardDescription>
              </div>
              <Badge variant="indigo">New</Badge>
            </div>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </CardContent>
          <CardFooter>
            <p className="text-xs text-zinc-400 font-mono">.rounded-2xl .border-zinc-200 .shadow-none</p>
          </CardFooter>
        </Card>

        {/* Form Elements */}
        <Card>
          <CardHeader>
            <CardTitle>Form Elements</CardTitle>
            <CardDescription>Testing inputs, labels, and selects.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" placeholder="Enter your email" />
            </div>
            <div className="space-y-2">
              <Label>Department</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cs">Computer Science</SelectItem>
                  <SelectItem value="me">Mechanical</SelectItem>
                  <SelectItem value="ce">Civil</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Tabs & Avatar */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Tabs & Identity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4 border p-4 rounded-xl">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-zinc-500">Administrator</p>
              </div>
            </div>
            
            <Tabs defaultValue="account" className="w-full">
              <TabsList className="grid w-full max-w-[400px] grid-cols-2">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
              </TabsList>
              <TabsContent value="account" className="p-4 border rounded-xl mt-2 bg-white">
                Account settings and personal information.
              </TabsContent>
              <TabsContent value="password" className="p-4 border rounded-xl mt-2 bg-white">
                Change your password and security settings.
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Table */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Data Table</CardTitle>
            <CardDescription>A responsive table with hover states.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Roll No</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Attendance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Arjun Patel</TableCell>
                  <TableCell>CE21B101</TableCell>
                  <TableCell><Badge variant="success">Active</Badge></TableCell>
                  <TableCell className="text-right">92%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Priya Sharma</TableCell>
                  <TableCell>CE21B102</TableCell>
                  <TableCell><Badge variant="warning">On Leave</Badge></TableCell>
                  <TableCell className="text-right">85%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Dialog */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Modals & Overlays</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="primary">Open Dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogTrigger asChild>
                    <Button variant="ghost">Cancel</Button>
                  </DialogTrigger>
                  <Button variant="primary">Confirm</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
