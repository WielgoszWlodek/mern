import "./sidebar.css";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
} from "@material-ui/icons";
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import AddCardOutlinedIcon from '@mui/icons-material/AddCardOutlined';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import ContentPasteSearchOutlinedIcon from '@mui/icons-material/ContentPasteSearchOutlined';

import { Link } from "react-router-dom";

export default function Sidebar2({type}) {
  return (
  <div className={ type === "list" ? "sidebarTitle listMode" : "sidebarTitle" }>
    <div className="sidebar" >
      
      <div className="sidebarWrapper">
    
       
      
       
        
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Statystyka</h3>
          <ul className="sidebarList">
           
           
            <Link to="/raport" className="link">
              <li className="sidebarListItem">
                <BarChart className="sidebarIcon" />
                Statystyki
              </li>
            </Link>
          </ul>
        </div>
{/*
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Książki</h3>
          <ul className="sidebarList">
            <Link to="/about" className="link">
                 
            <li className="sidebarListItem active">
              <TableChartOutlinedIcon className="sidebarIcon" />
             Przeglądaj
            </li>
            </Link> 
              <Link to="/addBook" className="link">
            <li className="sidebarListItem">
              < AddCardOutlinedIcon className="sidebarIcon" />
              Dodaj książkę
            </li>
            </Link>
            <Link to="/books" className="link">
            <li className="sidebarListItem">
              <ImageOutlinedIcon className="sidebarIcon" />
              Okładki
            </li>
            </Link>
         
          </ul>
        
        </div> 


        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Czytelicy</h3>
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li className="sidebarListItem">
                <PeopleOutlineIcon className="sidebarIcon" />
                Czytelnicy
              </li>
            </Link>
            <Link to="/addReader" className="link">
              <li className="sidebarListItem">
                <PersonAddAltOutlinedIcon className="sidebarIcon" />
                Dodaj czytelnika
              </li>
            </Link>
            <Link to="/Gridingrid" className="link">
              <li className="sidebarListItem">
                <ContentPasteSearchOutlinedIcon className="sidebarIcon" />
                Wypożyczenia
              </li>
            </Link>
        
          </ul>
        </div>
  */}
      
      </div> 
    </div>
    </div>
  );
}