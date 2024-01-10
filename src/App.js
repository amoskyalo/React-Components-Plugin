import React from "react";
import { Box, IconButton, Button } from "@mui/material";
import StepperFormModel from "./lib/components/Forms/StepperFormModel";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import SettingsIcon from '@mui/icons-material/Settings';
import SideBarModel from "./lib/components/SideBar";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import HelpIcon from '@mui/icons-material/Help';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LayersIcon from '@mui/icons-material/Layers';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import InsightsIcon from '@mui/icons-material/Insights';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import DoorBackIcon from '@mui/icons-material/DoorBack';
import BusinessIcon from '@mui/icons-material/Business';
import GroupIcon from '@mui/icons-material/Group';
import ListIcon from '@mui/icons-material/List';
import MapIcon from '@mui/icons-material/Map';
import GridModel from "./lib/components/Grids/GridModel";
import FormModel from "./lib/components/Forms/FormModel";
import './App.css'

function App() {
  const routes = {
    sections: [
      {
        title: "WORK",
        list: [
          {
            name: "Dashboard",
            path: "/",
            icon: DashboardIcon
          },
          {
            name: "Deployments",
            path: "/",
            icon: LayersIcon,
            subLinks: [
              {
                name: "List View",
                icon: ListIcon,
                path: "/"
              },
              {
                name: "Map View",
                icon: MapIcon,
                path: "/"
              }
            ]
          },
          {
            name: "New Rental",
            path: "/",
            icon: CreateNewFolderIcon
          },
          {
            name: "Service Schedule",
            path: "/",
            icon: TaskAltIcon
          },
          {
            name: "Tasks",
            path: "/",
            icon: AssignmentIndIcon
          },
          {
            name: "Reporting",
            path: "/",
            icon: InsightsIcon
          }
        ]
      },
      {
        title: "MANAGE",
        list: [
          {
            name: "Customers",
            path: "/",
            icon: ContactPageIcon
          },
          {
            name: "Equipment",
            path: "/",
            icon: DoorBackIcon
          }
        ]
      },
      {
        title: "ADMIN",
        list: [
          {
            name: "Company",
            path: "/",
            icon: BusinessIcon
          },
          {
            name: "Users",
            path: "/",
            icon: GroupIcon
          }
        ]
      }
    ]
  }

  const columns = [
    { field: "name" },
    { field: "Age" },
    { field: "Email" }
  ]

  const inputs = [
    {
      name: "name",
      label: "User Name",
      type: "text",
      isRequired: true,
      // disabled: true,
      value: null,
      // onChange: val => console.log(val),
    },
    {
      name: "email",
      label: "User Email",
      type: "email",
      value: null,
      isRequired: true
    },
    {
      name: "role",
      label: "Role",
      isRequired: true,
      // value: [],
      // disabled: true,
      lookups: [{ title: "Manager", value: 1 }, { title: "Admin", value: 2 }],
    },
    {
      name: "type",
      label: "Type",
      isRequired: true,
      multiple: true,
      size: "small",
      lookups: [{ title: "Admin", value: 0 }, { title: "Employee", value: 1 }],
      // value: []
    },
    {
      name: "notifications",
      label: "Notifications",
      isBoolean: true,
      isRequired: true,
      booleanOptions: [
        {
          label: "Yes",
          value: true,
          // disabled: true
        },
        {
          label: "No",
          value: false,
          // disabled: true
        }
      ]
    }
  ];

  // const NavFooter = () => (
  //   <Box borderBottom={"4px solid white"} paddingY={1.5} display={"flex"} justifyContent={"center"} columnGap={2}>
  //     {[SettingsIcon, HelpIcon, PowerSettingsNewIcon].map((El) => (
  //       <IconButton sx={{ height: 40, width: 40, backgroundColor: "rgba(255, 255, 255, 0.1)", borderRadius: 2 }}>
  //         <El sx={{ color: "rgba(255, 255, 255, 0.5)" }} />
  //       </IconButton>
  //     ))}
  //   </Box>
  // )

  // const NavHeader = () => (
  //   <Box marginY={1.5} display={"flex"} justifyContent={"center"} width={"100%"}>
  //     <img
  //       src="https://i.pinimg.com/564x/9f/93/ae/9f93ae8f39417cd575e735bf5f1b1505.jpg"
  //       styles={{ height: 40, width: 150 }}
  //       alt="Logo" />
  //   </Box>
  // );

  // console.log(React.isValidElement("p"));

  return (
    <Box sx={{ overflow: "hidden" }}>
      {/* <GridModel
        columns={columns}
        rows={[]}
        onApplyDateChanges={dates => console.log(dates)}
      /> */}
      <Box sx={{ mx: "auto", padding: 2 }}>
        <FormModel inputs={inputs} onSubmit={val => console.log(val)} options={{
          form: {
            // backgroundColor: "red",
            // padding: 10
          }
        }} />
      </Box>

      {/* <SideBarModel listConatinerClassName="bar" navigateItems={routes} /> */}
    </Box>
  );
}

export default App;
