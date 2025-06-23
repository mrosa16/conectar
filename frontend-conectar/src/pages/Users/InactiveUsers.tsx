import { InactiveUserTable } from "../../components/Table/InactiveUserTable";
import UserTable from "../../components/Table/UserTable";

function InactiveUsers() {
  const usuarios = [
    {
      id: "asda",
      name: "Michael",
      email: "michael@example.com",
      role: "user",
      isActive: true,
      lastLogin: new Date(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "adsads",
      name: "Admin",
      email: "admin@example.com",
      role: "admin",
      isActive: false,
      lastLogin: new Date(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "asda",
      name: "Michael",
      email: "michael@example.com",
      role: "user",
      isActive: true,
      lastLogin: new Date(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "adsads",
      name: "Admin",
      email: "admin@example.com",
      role: "admin",
      isActive: false,
      lastLogin: new Date(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "asda",
      name: "Michael",
      email: "michael@example.com",
      role: "user",
      isActive: true,
      lastLogin: new Date(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "adsads",
      name: "Admin",
      email: "admin@example.com",
      role: "admin",
      isActive: false,
      lastLogin: new Date(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];
  return <InactiveUserTable users={usuarios} />;
}

export default InactiveUsers;
