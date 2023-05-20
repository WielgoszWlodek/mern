import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import useFetch from "../../hooks/useFetch";
import Ileuzytkownikow from "./Ileuzytownikow";
import Ileksiazek from "./Ileksiazek";


export default function FeaturedInfo() {

    const { data, loading, error } = useFetch(
        "/books/find/countByCategory?categories=przygoda,romans,horror,komedia,dramat,inna"
      );

      console.log(data)
  return (
    <div className="featured">
         {loading ? (
        <div className="srodek">Proszę czekać</div>
      ) : (
        <>
      <div className="featuredItem">
        <h3>KATEGORIE:</h3><br/>
        <span className="featuredTitle">Przygoda: <span className="featuredMoney">{data[0]}</span> </span><br/>
        <span className="featuredTitle">Romans:<span className="featuredMoney"> {data[1]} </span></span><br/>
        <span className="featuredTitle">Horror:<span className="featuredMoney"> {data[2]} </span></span><br/>
        <span className="featuredTitle">Komedia:<span className="featuredMoney"> {data[3]}</span> </span><br/>
        <span className="featuredTitle">Dramat:<span className="featuredMoney"> {data[4]}</span> </span><br/>
        <span className="featuredTitle">Inne:<span className="featuredMoney">{data[5]}</span>  </span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney"></span>
          <span className="featuredMoneyRate">
            
          </span>
        </div>
       
      </div>
      
      <div className="featuredItem">
      <h3>ILOŚĆ:</h3><br/>
     <Ileuzytkownikow />
     <Ileksiazek />
     </div>
      
      </>
      )}
    </div>
  );
}